package alloy

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"subscription-manager/internal/config"
	"subscription-manager/pkg/jwt"

	"github.com/sirupsen/logrus"
)

var (
	cfg    = config.Load()
	client = &http.Client{}
)

// Transaction data
type Transaction struct {
	MerchantName    string  `json:"merchantName"`
	Amount          float32 `json:"amount"`
	TransactionDate int     `json:"transactionDate"`
}

// GetTransaction fetch transaction's merchant name
func GetTransaction(transactionID, recipeInstallID string) (*Transaction, error) {
	token, err := getRecipeInstalToken(recipeInstallID)
	if err != nil {
		return nil, err
	}

	return getTransaction(transactionID, token)
}

func getTransaction(id, token string) (*Transaction, error) {
	response := struct {
		Data struct {
			Transaction Transaction `json:"transaction"`
		} `json:"data"`
	}{}

	err := reqAlloyAPI(fmt.Sprintf(
		"{\"query\":\"query{transaction(id:\\\"%s\\\"){merchantName,amount,transactionDate}}\",\"variables\":{}}",
		id), token, &response)
	if err != nil {
		logrus.WithError(err).Error("Fail in get transaction on Alloy API")
		return nil, err
	}

	return &response.Data.Transaction, nil
}

func getRecipeInstalToken(recipeInstallID string) (string, error) {
	recipeToken, err := jwt.BuildJWT(cfg.RecipeID)
	if err != nil {
		logrus.WithError(err).Error("Fail in create recipe token")
		return "", err
	}

	response := struct {
		Data struct {
			RecipeInstall struct {
				Token string `json:"createToken"`
			} `json:"recipeInstall"`
		} `json:"data"`
	}{}

	err = reqAlloyAPI(fmt.Sprintf(
		"{\"query\":\"mutation{recipeInstall(id:\\\"%s\\\"){createToken}}\",\"variables\":{}}",
		recipeInstallID), recipeToken, &response)
	if err != nil {
		logrus.WithError(err).Error("Fail in get recipe install token on Alloy API")
		return "", err
	}

	return response.Data.RecipeInstall.Token, nil
}

func reqAlloyAPI(query, token string, response interface{}) error {
	req, err := http.NewRequest("POST",
		fmt.Sprintf("%sgraphql", cfg.AlloyURL),
		strings.NewReader(query))
	if err != nil {
		return err
	}

	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", token))
	req.Header.Add("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return err
	}

	err = json.Unmarshal(body, &response)
	if err != nil {
		return err
	}

	return nil
}
