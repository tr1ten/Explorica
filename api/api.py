from flask import Flask
import pandas as pd
import json
import flask
from flask_pymongo import PyMongo
from os.path import join, dirname
from dotenv import load_dotenv
import os
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

app = Flask(__name__)
mongodb_client = PyMongo(app, uri=os.environ.get("MONGO_URI"))
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