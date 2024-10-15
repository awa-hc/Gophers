import tensorflow as tf

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, Flatten, MaxPooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator

train_dir = "fruits-360/Training"
validation_dir = "fruits-360/Test"

train_datagen = ImageDataGenerator(rescale=1.0 / 255)
validation_datagen = ImageDataGenerator(rescale=1.0 / 255)

train_generator = train_datagen.flow_from_directory(
    train_dir, target_size=(100, 100), batch_size=32, class_mode="categorical"
)

test_generator = validation_datagen.flow_from_directory(
    validation_dir, target_size=(100, 100), batch_size=32, class_mode="categorical"
)


model = Sequential(
    [
        Conv2D(32, (3, 3), activation="relu", input_shape=(100, 100, 3)),
        MaxPooling2D((2, 2)),
        Conv2D(64, (3, 3), activation="relu"),
        MaxPooling2D((2, 2)),
        Conv2D(128, (3, 3), activation="relu"),
        MaxPooling2D((2, 2)),
        Flatten(),
        Dense(512, activation="relu"),
        Dense(len(train_generator.class_indices), activation="softmax"),
    ]
)

model.compile(loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"])

model.fit(train_generator, epochs=10, validation_data=test_generator)
model.save("fruits_model.h5")