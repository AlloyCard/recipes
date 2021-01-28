package server

import (
	"fmt"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"subscription-manager/database"
)

type Engine struct {
	Database database.Database
	Server http.Server
}

func Run(port string) {
	// db, err := database.New(ctx, driver, dsn)
	// if err != nil {
	// 	// LOG
	// }
	// defer db.Connection.Close()

	// engine := Engine{Database: db}
	engine := Engine{}

	r := mux.NewRouter()
	r.HandleFunc("/user", engine.InsertUser).Methods(http.MethodPost)
	// r.HandleFunc("/user/{userId}/transaction", insertSingleEquipment).Methods(http.MethodPost)

	engine.Server = http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: r,
	}

	panic(engine.Server.ListenAndServe())
}

func (eng *Engine) InsertUser(rw http.ResponseWriter, req *http.Request) {
	payload := struct {
		ID int `json:"id"`
	}{}
	type response struct {
		Message string `json:"message"`
	}

	rw.Header().Set("Content-Type", "application/json")
	err := json.NewDecoder(req.Body).Decode(&payload)
	if err != nil {
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(response{
			Message: err.Error(),
		})
		return
	}

	fmt.Println(2, payload)
}
