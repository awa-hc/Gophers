FROM golang:1.22 AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod tidy

COPY . . 

RUN GOOS=linux GOARCH=amd64 go build -o back ./cmd/api/main.go
RUN ls -la /app

RUN chmod +x /app/back


FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/back .

EXPOSE 8080

CMD ["./back"]