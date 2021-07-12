from app import app
from app.Controller import product_controller
from app.Controller import user_controller
from flask import request
from flask_jwt_extended import jwt_required
import sys


@app.route('/')
def home():
    return "Flask " + sys.version


@app.route('/login', methods=['POST'])
def login():
    return user_controller.login()


@app.route('/admin', methods=['POST'])
def superamin():
    return user_controller.saveSuperAdmin()


@app.route('/logout', methods=['POST'])
def logout():
    return user_controller.logout()


@app.route('/products', methods=['GET', 'POST'])
@jwt_required()
def products():
    if request.method == 'GET':
        return product_controller.index()
    else:
        return product_controller.save()


@app.route('/products/<id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def productsId(id):
    if request.method == 'GET':
        return product_controller.detail(id)
    elif request.method == 'PUT':
        return product_controller.update(id)
    else:
        return product_controller.delete(id)


@app.route('/user/<int:user_id>', methods=['GET'])
@jwt_required
def get_user(user_id):
    user_id = user_controller.get_user(user_id)
    return user_controller.get_user(user_id), 200