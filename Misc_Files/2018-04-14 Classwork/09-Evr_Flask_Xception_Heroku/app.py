import os
import io
import numpy as np
from PIL import Image
import tensorflow as tf

import keras
from keras.preprocessing import image
from keras.preprocessing.image import img_to_array
from keras.applications.xception import (
    Xception, preprocess_input, decode_predictions)
from keras import backend as K

from flask import Flask, request, redirect, url_for, jsonify

app = Flask(__name__)
model = None
graph = None

def load_model():
    global model
    global graph
    model = Xception(weights="imagenet")
    graph = K.get_session().graph

load_model()

def prepare_image(image):
    if image.mode != "RGB":
        image = image.convert("RGB")
    image_size = (299, 299)
    image = image.resize(image_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = preprocess_input(image)
    # return the processed image
    return image


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    data = {"success": False}
    if request.method == 'POST':
        if request.files.get('file'):
            # read the image in PIL format
            file = request.files['file']
            image = file.read()
            image = Image.open(io.BytesIO(image))

            # preprocess the image and prepare it for classification
            image = prepare_image(image)
            global graph
            with graph.as_default():
                preds = model.predict(image)
                results = decode_predictions(preds)
                data["predictions"] = []

                # loop over the results and add them to the list of
                # returned predictions
                for (imagenetID, label, prob) in results[0]:
                    r = {"label": label, "probability": float(prob)}
                    data["predictions"].append(r)

                # indicate that the request was a success
                data["success"] = True
        return jsonify(data)
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <p><input type=file name=file>
         <input type=submit value=Upload>
    </form>
    '''

if __name__ == "__main__":
    load_model()
    app.run(debug=True)
