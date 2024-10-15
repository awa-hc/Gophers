import os
from fastapi import FastAPI, File, UploadFile
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from fastapi.middleware.cors import CORSMiddleware

# Cargar el modelo
model = tf.keras.models.load_model("../model/fruits_model.h5")
data_dir = "../fruits-360/Training"
class_names = os.listdir(data_dir)
class_names.sort()
class_labels = {i: class_name for i, class_name in enumerate(class_names)}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear el directorio 'temp' si no existe
if not os.path.exists("temp"):
    os.makedirs("temp")


@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    file_location = f"temp/{file.filename}"

    with open(file_location, "wb") as f:
        f.write(await file.read())

    img = image.load_img(file_location, target_size=(100, 100))
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_index = np.argmax(predictions)
    secont_predicted_index = np.argsort(predictions)[0][-2]
    thrird_predicted_index = np.argsort(predictions)[0][-3]

    response = {
        "predicted_class": class_labels[predicted_index],
        "second_class": class_labels[secont_predicted_index],
        "third_class": class_labels[thrird_predicted_index],
    }

    os.remove(file_location)  # Eliminar el archivo después de la predicción
    return response


@app.get("/")
def read_root():
    return {"message": "API de Predicción de Frutas"}
