import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import matplotlib.pyplot as plt
import os

# Cargar el modelo entrenado
model = tf.keras.models.load_model("model/fruits_model.h5")

# Directorio con las imágenes de prueba
test_image_dir = "test/"

# Cargar nombres de clases desde el directorio de entrenamiento
data_dir = "fruits-360/Training"
class_names = os.listdir(data_dir)
class_names.sort()  # Opcional: ordenar las clases
class_labels = {i: class_name for i, class_name in enumerate(class_names)}


def predict_images(image_path):
    img = image.load_img(image_path, target_size=(100, 100))
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)

    # Obtener el índice de la clase predicha
    predicted_index = np.argmax(predictions)

    # Obtener las segundas y terceras clases más probables
    secont_predicted_index = np.argsort(predictions)[0][-2]
    thrird_predicted_index = np.argsort(predictions)[0][-3]

    # Mostrar la imagen y las predicciones
    img = image.load_img(image_path)
    plt.imshow(img)
    plt.axis("off")
    plt.title(
        f"Predicción: {class_labels[predicted_index]} \nPuede ser: {class_labels[secont_predicted_index]} o {class_labels[thrird_predicted_index]}"
    )
    plt.show()

    return class_labels[predicted_index]


# Extensiones de archivo de imagen válidas
valid_image_extensions = [".jpg", ".jpeg", ".png", ".bmp", ".gif"]

# Probar con todas las imágenes en la carpeta test_image_dir
for img_file in os.listdir(test_image_dir):
    img_path = os.path.join(test_image_dir, img_file)

    # Filtrar archivos no válidos
    if (
        os.path.isfile(img_path)
        and os.path.splitext(img_file)[1].lower() in valid_image_extensions
    ):
        print(f"Probando con la imagen: {img_path}")
        predict_images(img_path)
    else:
        print(f"Archivo ignorado: {img_path} (no es una imagen válida)")
