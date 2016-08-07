package data

import "time"

//Database
type Database interface {
	Init()
	Query() []Record
	Close()
}

type Record struct {
	Title string    `json:title`
	Date  time.Time `json:date`
}
