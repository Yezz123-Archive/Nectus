from flask import jsonify, make_response, request

from app import db
from app.Models.product import Products


def index():
    """
    Get all data

    Returns:
        make_response -- jsonify
    """
    res = {}
    try:
        datas = Products.query.all()
        data = generate(datas)
        res["data"] = data
        res["msg"] = "Data found!"
        return make_response(jsonify(res)), 200
    except Exception as e:
        res["data"] = None
        res["msg"] = str(e)
        return make_response(jsonify(res)), 400


def generate(values):
    """
    Generate data

    Args:
        values: list

    Returns:
        list -- list of data
    """
    return [
        {"id": i.id, "product_name": i.product_name, "product_price": i.product_price}
        for i in values
    ]


def detail(id):
    """
    Get data by id
    Args:
        id (int): id

    Returns:
        make_response -- jsonify
    """
    res = {}
    try:
        datas = Products.query.filter_by(id=id).first()
        if not datas:
            res["data"] = None
            res["msg"] = "Data not found !"
            return make_response(jsonify(res)), 400
        data = {
            "id": datas.id,
            "product_name": datas.product_name,
            "product_price": datas.product_price,
        }
        res["data"] = data
        res["msg"] = "Data not found !"
        return make_response(jsonify(res)), 200
    except Exception as e:
        res["data"] = None
        res["msg"] = str(e)
        return make_response(jsonify(res)), 400


def save():
    """
    Save data

    Returns:
        make_response -- jsonify
    """
    res = {}
    try:
        product_name = request.form.get("product_name")
        product_price = request.form.get("product_price")

        data = [{"product_name": product_name, "product_price": product_price}]

        save = Products(product_name=product_name, product_price=product_price)
        db.session.add(save)
        db.session.commit()

        res["data"] = data
        res["msg"] = "Data added successfully !"
        return make_response(jsonify(res)), 200

    except Exception as e:
        res["data"] = None
        res["msg"] = str(e)
        return make_response(jsonify(res)), 400


def update(id):
    """
    Update data

    Args:
        id (int): id

    Returns:
        make_response -- jsonify
    """
    res = {}
    try:
        product_name = request.form.get("product_name")
        product_price = request.form.get("product_price")

        save = Products.query.filter_by(id=id).first()
        save.product_name = product_name
        save.product_price = product_price
        db.session.commit()

        res["data"] = save.product_name
        res["msg"] = "Data changed successfully !"
        return make_response(jsonify(res)), 200
    except Exception as e:
        res["data"] = None
        res["msg"] = str(e)
        return make_response(jsonify(res)), 400


def delete(id):
    """
    Delete data

    Args:
        id (int): id

    Returns:
        make_response -- jsonify
    """
    res = {}
    try:
        datas = Products.query.filter_by(id=id).first()
        if not datas:
            res["data"] = None
            res["msg"] = "Data not found !"
            return make_response(jsonify(res)), 400

        data = datas.product_name

        db.session.delete(datas)
        db.session.commit()

        res["data"] = data
        res["msg"] = "Data deleted successfully !"
        return make_response(jsonify(res)), 200

    except Exception as e:
        res["data"] = None
        res["msg"] = str(e)
        return make_response(jsonify(res)), 400
