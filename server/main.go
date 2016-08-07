package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"pg_go/server/data"
)

func main() {
	static := os.Getenv("STATIC")
	state := os.Getenv("DEBUG")
	port := os.Getenv("WEBPORT")
	var db data.Database
	db = new(data.Postgres)
	db.Init(state == "DEBUG")
	defer db.Close()
	http.HandleFunc("/data", req(db))
	http.Handle("/", http.FileServer(http.Dir(static)))
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
