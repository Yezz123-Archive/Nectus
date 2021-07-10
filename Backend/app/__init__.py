from flask import Flask
from config.database import Config
from config.security import JWT
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)
app.config.from_object(JWT)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

jwt = JWTManager(app)
cors = CORS(app)

from app.Models import User, Product
from routes import api
