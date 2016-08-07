package data

import "time"

type Mock struct {
	a string
}

func (m *Mock) Init(debug bool) {}

func (m *Mock) Close() {}

func (m *Mock) Query() []Record {
	records := make([]Record, 0, 0)
	records = append(records, Record{"TestX", time.Now()})
	records = append(records, Record{"TestX1", time.Now()})
	return records
}
