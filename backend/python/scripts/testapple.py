import numpy as np
import tensorflow as tf  # Asegúrate de importar TensorFlow
from tensorflow import keras
from tensorflow.keras import layers

def load_image(image_path):
    img = tf.keras.preprocessing.image.load_img(
        image_path, target_size=(150, 150)
    )
    img_array = tf.keras.preprocessing.image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)  # Añadir una dimensión para el batch
    return img_array

def predict_image(image_path, model):
    img_array = load_image(image_path)
    prediction = model.predict(img_array)
    print(prediction)
    return "Hay una manzana" if prediction[0][0] > 0.5 else "No hay manzana"

# Cargar el modelo
model = keras.models.load_model('model/apple_model.h5')

# Ejemplo de uso
image_path = "dataset/apple/test/test1.jpg"  # Cambia esta ruta a tu imagen
print(predict_image(image_path, model))
