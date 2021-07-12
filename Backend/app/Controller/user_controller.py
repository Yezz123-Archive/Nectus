from app.Models.user import SecUsers
from app import db
from flask import request, jsonify, make_response
from flask_jwt_extended import *


def create_access_token(data, fresh=False):
    if not fresh:
        token = create_access_token(identity=data, fresh=fresh)
    else:
        token = create_refresh_token(identity=data)
    return token


def login():
    res = {}
    try:
        email = request.form.get('email')
        password = request.form.get('password')

        user = SecUsers.query.filter_by(email=email).first()

        if not user:
            res['data'] = None
            res['msg'] = "User not registered !"
            return make_response(jsonify(res)), 400

        if not user.checkPassword(password):
            res['data'] = None
            res['msg'] = "Email/Password"
            return make_response(jsonify(res)), 400

        data = {'id': user.id, 'username': user.username, 'email': user.email}

        access_token = create_access_token(data, fresh=True)
        refresh_token = create_refresh_token(data)

        res['data'] = data
        res['access_token'] = access_token
        res['refresh_token'] = refresh_token
        res['msg'] = "Login successful"
        return make_response(jsonify(res)), 200
    except Exception as e:
        res['data'] = None
        res['msg'] = str(e)
        return make_response(jsonify(res)), 400


def logout():
    res = {}
    try:
        response = jsonify({"msg": "logout successful"})
        unset_jwt_cookies(response)
        return make_response(response), 200
    except Exception as e:
        res['data'] = None
        res['msg'] = str(e)
        return make_response(jsonify(res)), 400


def saveSuperAdmin():
    res = {}
    try:
        full_name = request.form.get('full_name')
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        data = [{
            'username': username,
            'email': email,
        }]

        user = SecUsers(full_name=full_name, username=username, email=email)
        user.setPassword(password)
        db.session.add(user)
        db.session.commit()

        res['data'] = data
        res['msg'] = "Data added successfully !"
        return make_response(jsonify(res)), 200

    except Exception as e:
        res['data'] = None
        res['msg'] = str(e)
        return make_response(jsonify(res)), 400
