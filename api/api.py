from flask import Flask
import pandas as pd
import json
import flask
from flask_pymongo import PyMongo

app = Flask(__name__)
mongodb_client = PyMongo(app, uri="mongodb://172.18.128.1:27017/explorica")
db = mongodb_client.db
def mongoimport(csv_path, db_name, coll_name, db_url='localhost', db_port=27000):
    coll = db[coll_name]
    data = pd.read_csv(csv_path)
    data_json = json.loads(data.to_json(orient='records'))
    # clear collection
    coll.delete_many({})
    coll.insert_many(data_json)
    return coll.count_documents({})

print("flags loaded: ", mongoimport('countries.csv', 'explorica', 'Country'))
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/flags")
def flags():
    # fetch only name and image
    countries = db.Country.find({})
    return flask.jsonify([{'name':country['name'],'image':country['image'] if 'image' in country else ''} for country in countries])