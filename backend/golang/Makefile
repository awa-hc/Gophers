.PHONY: build run

build: 
	go build -o back ./cmd/api

run: build
	./back

dev: 
	go run ./cmd/api/main.go
	