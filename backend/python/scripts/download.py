import requests
import os


def download(name, n_files):
    os.makedirs(f"dataset/{name}/", exist_ok=True)
    access_key = "fINjnlkofnigv2zlB6-SdvVNyxPNFnupSFCPm-TgSj8"
    url = "https://api.unsplash.com/search/photos"

    # Parámetros de búsqueda
    params = {
        "query": name,
        "per_page": 30,  # Número de imágenes por solicitud (máx. 30)
        "page": 1,
        "client_id": access_key,
    }

    downloaded = 0  # Contador de imágenes descargadas

    while downloaded < n_files:  # Limitar a 200 imágenes
        response = requests.get(url, params=params)

        if response.status_code == 200:
            data = response.json()

            for photo in data["results"]:
                if downloaded >= n_files:
                    break
                img_url = photo["urls"]["small"]  # URL de la imagen

                try:
                    img_data = requests.get(img_url).content
                    img_name = f"dataset/{name}/item_{downloaded +1}.jpg"
                    with open(img_name, "wb") as img_file:
                        img_file.write(img_data)
                    print(f"Descargada imagen {downloaded + 1}: {img_url}")
                    downloaded += 1
                except Exception as e:
                    print(f"Error al descargar la imagen: {e}")

            params["page"] += 1  # Cambia a la siguiente página
        else:
            print(f"Error al acceder a la API: {response.status_code}")
            break


import argparse


def main():
    parser = argparse.ArgumentParser(description="Download images from Unsplash")
    parser.add_argument(
        "--name", type=str, required=True, help="Name of the object to download"
    )
    parser.add_argument(
        "--n_files", type=int, required=True, help="Number of files to download"
    )
    args = parser.parse_args()
    name = args.name
    n_files = args.n_files
    download(name, n_files)


if __name__ == "__main__":
    main()
