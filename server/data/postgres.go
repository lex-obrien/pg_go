package data

import (
	"database/sql"
	"log"
	"time"

	_ "github.com/lib/pq" //abstracting the postgres from main for test
)

type Postgres struct {
	db *sql.DB
}

func (p *Postgres) Init() {
	var err error
	p.db, err = sql.Open("postgres", "host=postgres user=postgres dbname=postgres password=postgres sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
}

func (p *Postgres) Close() {
	p.db.Close()
}

func (p *Postgres) Query() []Record {
	records := make([]Record, 0, 0)
	rows, err := p.db.Query("SELECT * from testtable")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	for rows.Next() {
		var title string
		var date time.Time
		if err := rows.Scan(&title, &date); err != nil {
			log.Fatal(err)
		}
		records = append(records, Record{title, date})
	}
	return records
}
