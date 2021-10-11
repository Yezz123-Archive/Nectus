import sys

from flask import request
from flask_jwt_extended import jwt_required

from app import app
from app.Controller import product_controller, user_controller


@app.route("/")
def home():
    """
    Home page

    Returns:
        str: Home page
    """
    return "Flask " + sys.version


@app.route("/login", methods=["POST"])
def login():
    """
    Login page

    Returns:
        str: Login page
    """
    return user_controller.login()


@app.route("/admin", methods=["POST"])
def superamin():
    """
    Admin page

    Returns:
        str: Admin page
    """
    return user_controller.saveSuperAdmin()


@app.route("/logout", methods=["POST"])
def logout():
    """
    Logout page

    Returns:
        str: Logout page
    """
    return user_controller.logout()


@app.route("/products", methods=["GET", "POST"])
@jwt_required()
def products():
    """
    Products page

    Returns:
        str: Products page
    """
    if request.method == "GET":
        return product_controller.index()
    else:
        return product_controller.save()


@app.route("/products/<id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def productsId(id):
    """
    Products page

    Args:
        id (int): Product id

    Returns:
        str: Products page
    """
    if request.method == "GET":
        return product_controller.detail(id)
    elif request.method == "PUT":
        return product_controller.update(id)
    else:
        return product_controller.delete(id)


@app.route("/user/<int:user_id>", methods=["GET"])
@jwt_required
def get_user(user_id):
    """
    Get user

    Args:
        user_id (int): User id

    Returns:
        str: User
    """
    user_id = user_controller.get_user(user_id)
    return user_controller.get_user(user_id), 200
