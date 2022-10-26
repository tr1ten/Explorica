from flask import Flask
import flask
from flask_pymongo import PyMongo

app = Flask(__name__)

mongodb_client = PyMongo(app, uri="mongodb://172.18.128.1:27017/explorica")
db = mongodb_client.db

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/flags")
def flags():
    # fetch only name and image
    countries = db.Country.find({})
    return flask.jsonify([{'name':country['name'],'image':country['image'] if 'image' in country else ''} for country in countries])