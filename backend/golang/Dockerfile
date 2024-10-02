# Etapa de construcción
FROM golang:1.22 AS builder

WORKDIR /app

# Copia solo los archivos de dependencia primero
COPY go.mod go.sum ./

# Descarga las dependencias
RUN go mod tidy

# Copia el código fuente restante
COPY . . 

# Compila la aplicación Go, deshabilitando CGO
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o back ./cmd/api/main.go

# Verifica que el binario fue generado correctamente
RUN ls -la /app

# Otorga permisos de ejecución al binario
RUN chmod +x /app/back

# Etapa de producción
FROM alpine:latest

WORKDIR /app

# Copia el binario desde la etapa de compilación
COPY --from=builder /app/back .

# Expone el puerto donde corre la aplicación
EXPOSE 8080

# Ejecuta la aplicación
CMD ["./back"]
