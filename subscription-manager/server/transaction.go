package server

import (
	"encoding/json"

	"github.com/sirupsen/logrus"
)

type transactionEvent struct {
	Type        string `json:"_alloyCardType"`
	CreatedAt   int    `json:"createdAt"`
	EventID     string `json:"eventId"`
	Transaction struct {
		Type string `json:"_alloyCardType"`
		ID   string `json:"entityID"`
	} `json:"transaction"`
}

func (app *App) postTransaction(body []byte) {
	payload := transactionEvent{}
	err := json.Unmarshal(body, &payload)
	if err != nil {
		logrus.WithError(err).Error("decode body fail")
		return
	}

	// TODO
	// - handler payload.Transaction.Type
	// - fetch data on graphql api (type, merchant, value, datetime)

	// const recipeKey = await buildAlloyJWT(recipeId, alloyKey)
	// AlloyJS.AuthService.setAuthToken(recipeKey)

	// const recipeInstallJWT = await AlloyJS.RecipesService.getRecipeInstallToken(recipeInstallId)
	// AlloyJS.AuthService.setAuthToken(recipeInstallJWT)

	// return await AlloyJS.TransactionService.getTransactionDetails(transactionId)

	// - check if it is an subscription charge

	app.Database.InsertTransaction(
		payload.Transaction.ID, payload.CreatedAt,
	)
}
