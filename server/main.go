package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"../server/data"
)

func main() {
	state := os.Getenv("DEBUG")
	port := os.Getenv("WEBPORT")
	var db data.Database
	if state != "" {
		db = new(data.Mock)
	} else {
		db = new(data.Postgres)
	}
	db.Init()
	defer db.Close()
	http.HandleFunc("/data", req(db))
	http.HandleFunc("/", other)
	log.Printf("Listing on port %s", port)
	http.ListenAndServe(":"+port, nil)
}

func req(db data.Database) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "GET" {
			w.Header().Set("Content-Type", "application/json")
			w.Header().Set("Cache-Control", "no-transform,public,max-age=300,s-maxage=900")
			results := db.Query()
			json.NewEncoder(w).Encode(results)
		}
	}

}

func other(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("HI"))
}
