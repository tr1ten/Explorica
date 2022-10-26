## Country Select API
This is api for country select assignment

## Installation
Install dependencies with pip
```bash
pip install -r requirements.txt
```
This api uses mongodb as database. So make sure you have mongodb installed and running on your system.



## Configure
Create .env file in root directory and add following variables
```bash
MONGO_URI=<mongo_uri> # eg. mongodb://localhost:27017/explorica
```
## Getting Started

First, run the server:

```bash
gunicorn -b 127.0.0.1:5000 api:ap
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.


