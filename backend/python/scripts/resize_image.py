import os
from PIL import Image

dataset_dir = "test/"
output_dir = "test/"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for root, dirs, files in os.walk(dataset_dir):
    for file in files:
        # Comprobar si el archivo es una imagen
        if file.lower().endswith((".png", ".jpg", ".jpeg", ".bmp", ".gif")):
            img_path = os.path.join(root, file)
            with Image.open(img_path) as img:
                # Redimensionar la imagen
                img_resized = img.resize((100, 100))

                # Guardar la imagen redimensionada en el directorio de salida
                # Mantener la misma estructura de carpetas
                relative_path = os.path.relpath(root, dataset_dir)
                output_folder = os.path.join(output_dir, relative_path)

                print("Guardando imagen redimensionada en:", output_folder)

                # Crear la carpeta si no existe
                if not os.path.exists(output_folder):
                    os.makedirs(output_folder)

                # Guardar la imagen redimensionada
                img_resized.save(os.path.join(output_folder, file))

print("Redimensionamiento completado.")
