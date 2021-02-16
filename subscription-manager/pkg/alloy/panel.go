package alloy

import (
	"fmt"
	"subscription-manager/pkg/jwt"
	"time"

	"github.com/sirupsen/logrus"
)

type addPanelResponse struct {
	Data struct {
		RecipeInstall struct {
			AddPanel struct {
				ID   string `json:"id"`
				Data string `json:"data"`
			} `json:"addPanel"`
		} `json:"recipeInstall"`
	} `json:"data"`
}

// AddSubscriptionPanel add subscription panel
func AddSubscriptionPanel(recipeInstallID, transactionID string, startDate time.Time, total float32) error {
	recipeToken, err := jwt.BuildJWT(cfg.RecipeID)
	if err != nil {
		logrus.WithError(err).Error("Fail in create recipe token")
		return err
	}
	response := addPanelResponse{}

	err = reqAlloyAPI(fmt.Sprintf(
		"{\"query\":\"mutation{recipeInstall(id:\\\"%s\\\"){addPanel(templateFileName:\"/transaction.subscription.json\" data:\"{\"startDate\":\\\"%s\\\",\"total\":\\\"%.2f\\\"}\" entity:{entityID:\\\"%s\\\"type:\"com.alloycard.core.entities.transaction.Transaction\"}){id data}}}\",\"variables\":{}}",
		recipeInstallID, startDate.Format("January 2, 2006"), total, transactionID), recipeToken, &response)
	if err != nil {
		logrus.WithError(err).Error("Fail in get recipe install token on Alloy API")
		return err
	}

	return nil
}

// AddNonSubscriptionPanel add non subscription panel
func AddNonSubscriptionPanel(recipeInstallID, transactionID string) error {
	recipeToken, err := jwt.BuildJWT(cfg.RecipeID)
	if err != nil {
		logrus.WithError(err).Error("Fail in create recipe token")
		return err
	}
	response := addPanelResponse{}

	err = reqAlloyAPI(fmt.Sprintf(
		"{\"query\":\"mutation{recipeInstall(id:\\\"%s\\\"){addPanel(templateFileName:\"/transaction.subscription.json\" data:\"{}\" entity:{entityID:\\\"%s\\\"type:\"com.alloycard.core.entities.transaction.Transaction\"}){id data}}}\",\"variables\":{}}",
		recipeInstallID, transactionID), recipeToken, &response)
	if err != nil {
		logrus.WithError(err).Error("Fail in get recipe install token on Alloy API")
		return err
	}

	return nil
}
