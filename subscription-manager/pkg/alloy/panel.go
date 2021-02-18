package alloy

import (
	"errors"
	"fmt"
	"time"

	"github.com/sirupsen/logrus"
)

type addPanelResponse struct {
	Data struct {
		RecipeInstall struct {
			AddPanel struct {
				ID string `json:"id"`
			} `json:"addPanel"`
		} `json:"recipeInstall"`
	} `json:"data"`
}

// AddSubscriptionPanel add subscription panel
func AddSubscriptionPanel(recipeInstallID, transactionID string, startDate time.Time, total float32) error {
	recipeToken, err := getRecipeInstalToken(recipeInstallID)
	if err != nil {
		return err
	}
	response := addPanelResponse{}

	err = reqAlloyAPI(fmt.Sprintf(
		"{\"query\":\"mutation{recipeInstall(id:\\\"%s\\\"){addPanel(templateFileName:\\\"/transaction.subscription.json\\\" data:\\\"{\\\\\\\"startDate\\\\\\\":\\\\\\\"%s\\\\\\\",\\\\\\\"total\\\\\\\":\\\\\\\"%.2f\\\\\\\"}\\\" entity:{entityID:\\\"%s\\\" type:\\\"com.alloycard.core.entities.transaction.Transaction\\\"}){id}}}\",\"variables\":{}}",
		recipeInstallID, startDate.Format("January 2, 2006"), total, transactionID), recipeToken, &response)
	if err != nil {
		return err
	}
	if response.Data.RecipeInstall.AddPanel.ID == "" {
		return errors.New("empty response from graphql")
	}

	logrus.WithField("panelId", response.Data.RecipeInstall.AddPanel.ID).Info("Subscription panel added")

	return nil
}

// AddNonSubscriptionPanel add non subscription panel
func AddNonSubscriptionPanel(recipeInstallID, transactionID string) error {
	recipeToken, err := getRecipeInstalToken(recipeInstallID)
	if err != nil {
		return err
	}
	response := addPanelResponse{}

	err = reqAlloyAPI(fmt.Sprintf(
		"{\"query\":\"mutation{recipeInstall(id:\\\"%s\\\"){addPanel(templateFileName:\\\"/transaction.nonsubscription.json\\\" data:\\\"{}\\\" entity:{entityID:\\\"%s\\\" type:\\\"com.alloycard.core.entities.transaction.Transaction\\\"}){id}}}\",\"variables\":{}}",
		recipeInstallID, transactionID), recipeToken, &response)
	if err != nil {
		return err
	}
	if response.Data.RecipeInstall.AddPanel.ID == "" {
		return errors.New("Fail to add panel")
	}

	logrus.WithField("panelId", response.Data.RecipeInstall.AddPanel.ID).Info("Non subscription panel added")

	return nil
}
