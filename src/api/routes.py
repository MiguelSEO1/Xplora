"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User, Cache, Comment, Image, Favorite 
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import cloudinary
import cloudinary.uploader

api = Blueprint('api', __name__)

@api.route('/login', methods=['POST'])
def user_login():
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    user = User.query.filter_by(email= body_email, password=body_password).first()
    print("@@@@@@@")
    print(user)
    if not user:
        return jsonify({"Error": "Invalid credentials"}), 401
    token = create_access_token(identity=user.id)
    return jsonify({"response": "Hola", "token": token}), 200
    
@api.route('/user', methods=['GET'])
@jwt_required()
def current_user_email():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"response": "Hola", "user": user.serialize()}), 200


@api.route('/updateUser-user', methods=['PUT'])
@jwt_required()
def Update_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    # obtener los nuevos datos del usuario del cuerpo de la solicitud
    new_data = request.get_json()

    # actualizar el objeto user con los nuevos valores
    user.email = new_data.get('email', user.email)
    user.name = new_data.get('name', user.name)
    user.country = new_data.get('country', user.country)
    user.city = new_data.get('city', user.city)

    # guardar los cambios en la base de datos
    
    db.session.commit()

    # devolver una respuesta JSON que confirme que se han actualizado los datos
    return jsonify({"response": "Los datos se han actualizado correctamente", "user": user.serialize()}), 200

@api.route('/updateUser-password', methods=['PUT'])
@jwt_required()
def Update_password():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    new_data = request.get_json()
    user.password = new_data.get('password', user.password)    
    db.session.commit()
    return jsonify({"response": "password actualizado correctamente", "user": user.serialize()}), 200

@api.route('/updateUser-pass', methods=['PUT'])
@jwt_required()
def Update_pass():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    new_data = request.get_json()

    # Obtener la contraseña actual del usuario de la base de datos
    current_password = user.password

    # Verificar si la contraseña actual proporcionada en la solicitud coincide con la contraseña almacenada en la base de datos
    if new_data.get('currentPassword') != current_password:
        return jsonify({"error": "La contraseña actual no coincide."}), 400

    # Verificar si la nueva contraseña y la confirmación de la contraseña son iguales
    new_password = new_data.get('newPassword')
    confirm_password = new_data.get('confirmPassword')
    if new_password != confirm_password:
        return jsonify({"error": "La nueva contraseña y la confirmación de la contraseña no coinciden."}), 400

    # Actualizar la contraseña del usuario en la base de datos
    user.password = new_password
    db.session.commit()

    # Devolver una respuesta exitosa
    return jsonify({"response": "Contraseña actualizada correctamente", "user": user.serialize()}), 200

@api.route('/upload', methods=['POST'])
@jwt_required()
def handle_upload():
    userid = get_jwt_identity()
    user= User.query.get(userid)
    result= cloudinary.uploader.upload(request.files['profile_image'])

    user.profile_image_url= result['secure_url']
    print(result['secure_url'])
    print("@@@@@@@@@@@")
    db.session.add(user)
    db.session.commit()

    return jsonify(user.profile_image_url), 200



@api.route('/upload-cache', methods=['POST'])
@jwt_required()
def handle_upload_cache():
    userid = get_jwt_identity()
    cache_id = request.json.get("id")
    result= cloudinary.uploader.upload(request.files['profile_image'])
    images.url= result['secure_url']
    db.session.add(images)
    db.session.commit()

    return jsonify(images.url), 200



     

@api.route('/cache', methods=['GET'])
def get_caches():
    # name = request.json.get("name")
    # description = request.json.get("description")
    # country = request.jeson.get("country")
    # city = request.jeson.get("city")
    # postal_code = request.jeson.get("postal_code")
    # coordinates_y = request.jeson.get("coordinates_y")
    # coordinates_x = request.jeson.get("coordinates_x")
    # difficulty = request.jeson.get("difficulty")
    # size = request.jeson.get("size")
    # qr_url = request.jeson.get("qr_url")
    # owner_id = request.jeson.get("owner_id")
    caches = Cache.query.all()
    return jsonify({"results": [cache.serialize() for cache in caches]}), 200

@api.route('/ToShowcache', methods=['GET'])
def get_ToShowCaches():
    # name = request.json.get("name")
    # description = request.json.get("description")
    # country = request.jeson.get("country")
    # city = request.jeson.get("city")
    # postal_code = request.jeson.get("postal_code")
    # coordinates_y = request.jeson.get("coordinates_y")
    # coordinates_x = request.jeson.get("coordinates_x")
    # difficulty = request.jeson.get("difficulty")
    # size = request.jeson.get("size")
    # qr_url = request.jeson.get("qr_url")
    # owner_id = request.jeson.get("owner_id")
    toShowcache = Cache.query.all()
    return jsonify({"results": [cache.serialize() for cache in toShowcache]}), 200

@api.route('/perfil-cache/<int:id>', methods=['GET'])
def get_details(id):
    cache = Cache.query.filter_by(id=id).first()
    if not cache:
        return jsonify({"error": "Cache no encontrada"}), 404
    return jsonify(cache.serialize()), 200


@api.route('/perfil-comments/<int:id>', methods=['POST'])
@jwt_required()
def create_comments(id):
    cache = Cache.query.filter_by(id=id).first()
    user_id = get_jwt_identity()
    body_title = request.json.get("title")
    body_text = request.json.get("text")
    new_comment = Comment(title=body_title, text=body_text, user_id=user_id, cache=cache)
    db.session.add(new_comment)
    db.session.commit() 
    return jsonify({"response": "Comment ok"}), 200

@api.route('/perfil-cache-comments/<int:id>', methods=['GET'])
def get_comments(id):
    cache = Cache.query.filter_by(id=id).first()
    comments = Comment.query.filter_by(cache=cache).all()
    serialized_comments = [x.serialize() for x in comments]
    return jsonify(serialized_comments), 200
   

@api.route('/delete-comments/', methods=['DELETE'])
@jwt_required()
def delete_comments():
    user_id = get_jwt_identity()
    comment_id= request.json.get("id")
    comment= Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit() 
    return jsonify({"response": "Comment delete ok"}), 200
  

@api.route('/perfil-galery', methods=['POST'])
@jwt_required()
def create_galery():
    user_id = get_jwt_identity()
    body= json.loads(request.form["galery"])
    cache = Cache.query.filter_by(id=body["id"]).first()
    result= cloudinary.uploader.upload(request.files['profile_image'])
    new_galery = Image(title=body["title"], url=result['secure_url'], date_of_Publication=body["date_of_Publication"], user_id=user_id, cache=cache)
    db.session.add(new_galery)
    db.session.commit() 
    return jsonify({"response": "Galery ok"}), 200  

@api.route('/perfil-cache-images/<int:id>', methods=['GET'])
def get_images(id):
    cache = Cache.query.filter_by(id=id).first()
    images = Image.query.filter_by(cache=cache).all()
    serialized_images = [x.serialize() for x in images]
    return jsonify(serialized_images), 200


@api.route('/delete-image/', methods=['DELETE'])
@jwt_required()
def delete_image():
    user_id = get_jwt_identity()
    image_id= request.json.get("id") 
    image= Image.query.get(image_id)
    if image:
        db.session.delete(image)
        db.session.commit() 
        return jsonify({"response": "Imagen eliminada correctamente"}), 200


@api.route('/favorites-caches', methods=['PUT'])
@jwt_required()
def favorites():
    user_id = get_jwt_identity()
    cache_id = request.json.get("id")
    cache = Cache.query.get(cache_id)
    if cache:
        if cache.is_favorite:
            cache.is_favorite = False
        else:
            cache.is_favorite = True
    db.session.commit()
    return jsonify(cache.serialize()), 200
    return jsonify({"error": "Cache not found"}), 404

@api.route('/create-user-favorites', methods=['POST'])
@jwt_required()
def new():
    user_id = get_jwt_identity()
    cache_id = request.json.get("id")
    favorite= Favorite.query.filter_by(cache_id=cache_id, user_id=user_id).first()
    if favorite:
        db.session.delete(favorite)
    else:
        new_favorite=Favorite(cache_id=cache_id, user_id=user_id)
        db.session.add(new_favorite)   
    print(favorite)
    print("@@@@@@@@@")
    db.session.commit()
    return jsonify({"response": "Cache is favorite"}), 200    
   

@api.route('/register', methods=['POST'])
def user_register():
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    user_already_exist = User.query.filter_by(email= body_email).first()
    if user_already_exist:
        return jsonify({"response": "Email already used"}), 300
    new_user = User(email=body_email, password=body_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"response": "User registered successfully"}), 200   

@api.route('/reg_cache', methods=['POST'])
@jwt_required()
def cache_register():
    user_id = get_jwt_identity()
    body_name = request.json.get("name")
    body_description = request.json.get("description")
    body_country = request.json.get("country")
    body_state = request.json.get("state")
    body_city = request.json.get("city")
    body_postal_code = request.json.get("postal_code")
    body_coordinates_y = request.json.get("coordinates_y")
    body_coordinates_x = request.json.get("coordinates_x")
    body_difficulty = request.json.get("difficulty")
    body_size = request.json.get("size")
    body_qr_url = request.json.get("qr_url")
    cache_already_exist = Cache.query.filter_by(name= body_name).first()
    if cache_already_exist:
        return jsonify({"response": "Cache already created, choose another name"}), 300
    new_cache = Cache(
        name=body_name,
        description=body_description,
        country="España",
        state=body_state,
        city=body_city,
        postal_code=body_postal_code,
        coordinates_y=body_coordinates_y,
        coordinates_x=body_coordinates_x,
        difficulty=body_difficulty,
        size=body_size,
        qr_url=body_qr_url,
        owner_id=user_id,
        )
    db.session.add(new_cache)
    db.session.commit()
    return jsonify({"response": "Cache registered successfully"}), 200   
 
