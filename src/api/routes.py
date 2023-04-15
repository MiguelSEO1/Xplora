"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User, Cache, Comment, ImageGalery, Favorite 
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from io import BytesIO
from PIL import Image
import cloudinary
import cloudinary.uploader
import re
import hashlib
import qrcode
import base64

api = Blueprint('api', __name__)

@api.route('/login', methods=['POST'])
def user_login():
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    user = User.query.filter_by(email=body_email).first()
    
    # Find the user with the matching username
    if user is None:
        return jsonify({"response": "Invalid username or password."}), 401
    
    # Hash the entered password and compare to the stored hash
    hashed_password = hashlib.sha256(body_password.encode('utf-8')).hexdigest()
    if hashed_password != user.password:
        return jsonify({"response": "Invalid username or password."}), 401

    token = create_access_token(identity=user.id)
    return jsonify({"response": "Hola", "token": token}), 200
    
@api.route('/user', methods=['GET'])
@jwt_required()
def current_user_email():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"response": user.serialize()}), 200

@api.route('/change-password', methods=['PUT'])
@jwt_required()
def change_password():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    current_password = request.json.get("current_password")
    new_password = request.json.get("new_password")
    repeat_new_password = request.json.get("repeat_new_password")

    # Validates if the new password matches
    if new_password != repeat_new_password:
        return {"error": "New passwords do not match"}, 400
    
    # Checks if the input is empty
    if not current_password:
        return {"error": "Current password cannot be empty"}, 400
    
    # Checks if the password is the same as the database
    if user.password != hashlib.sha256(current_password.encode('utf-8')).hexdigest():
        return {"error": "Incorrect current password"}, 400
    
    if len(new_password) < 8:
        return jsonify({"response": "Password must be at least 8 characters."}), 300
    if not re.search(r'[A-Z]', new_password):
        return jsonify({"response": "Password must include at least one capital letter."}), 300
    if not re.search(r'[a-z]', new_password):
        return jsonify({"response": "Password must include at least one lowercase letter."}), 300
    if not re.search(r'\d', new_password):
        return jsonify({"response": "Password must include at least one number."}), 300
    if not re.search(r'[^\w\s]', new_password):
        return jsonify({"response": "Password must include at least one special character."}), 300

    # Update the user's password in the database
    new_hashed_password = hashlib.sha256(new_password.encode('utf-8')).hexdigest()
    user.password = new_hashed_password
    db.session.commit()
    
    return jsonify({"message": "Password updated successfully"})

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
    user.caches_found  = new_data.get('cache_found', user.caches_found)

    # guardar los cambios en la base de datos
    
    db.session.commit()

    # devolver una respuesta JSON que confirme que se han actualizado los datos
    return jsonify({"response": "Los datos se han actualizado correctamente", "user": user.serialize()}), 200

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
    caches = Cache.query.all()
    return jsonify({"results": [cache.basicInfo() for cache in caches]}), 200

@api.route('/ToShowcache', methods=['GET'])
def get_ToShowCaches():
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

@api.route('/perfil-cache-comment', methods=['GET'])
def get_comments_news():
    caches = Cache.query.all()
    serialized_comments = []
    for cache in caches:
        comments = Comment.query.filter_by(cache=cache).all()
        serialized_comments += [x.serialize() for x in comments]
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

@api.route('/reported-comments', methods=['PUT'])
@jwt_required()
def reported_comments_Spam():
    user_id = get_jwt_identity()
    comment_id= request.json.get("id")
    comment = Comment.query.get(comment_id)
    if comment:
        if comment.is_spam:
            comment.is_spam = False
        else:
            comment.is_spam = True
    db.session.commit()
    return jsonify(comment.serialize()), 200
    return jsonify({"error": "Comment not found"}), 404
 
@api.route('/reported-comments-violence', methods=['PUT'])
@jwt_required()
def reported_comments_violence():
    user_id = get_jwt_identity()
    comment_id= request.json.get("id")
    comment = Comment.query.get(comment_id)
    if comment:
        if comment.is_violence:
            comment.is_violence = False
        else:
            comment.is_violence = True
    db.session.commit()
    return jsonify(comment.serialize()), 200
    return jsonify({"error": "Comment not found"}), 404









@api.route('/update-comments/', methods=['PUT'])
@jwt_required()
def update_comments():
    user_id = get_jwt_identity()
    comment_id = request.json.get("id")
    updated_comment = request.json['updatedComment']
    comment = Comment.query.get(comment_id)

    if comment:
        comment.title = updated_comment["title"]
        comment.text = updated_comment["text"]
        db.session.commit() 
        return jsonify({"response": "Comentario editado correctamente"}), 200
    else:
        return jsonify({"error": "Comentario no encontrado"}), 404




@api.route('/perfil-galery', methods=['POST'])
@jwt_required()
def create_galery():
    user_id = get_jwt_identity()
    body= json.loads(request.form["galery"])
    cache = Cache.query.filter_by(id=body["id"]).first()
    result= cloudinary.uploader.upload(request.files['profile_image'])
    new_galery = ImageGalery(title=body["title"], url=result['secure_url'], date_of_Publication=body["date_of_Publication"], user_id=user_id, cache=cache)
    db.session.add(new_galery)
    db.session.commit() 
    return jsonify({"response": "Galery ok"}), 200  

@api.route('/perfil-cache-images/<int:id>', methods=['GET'])
def get_images(id):
    cache = Cache.query.filter_by(id=id).first()
    images = ImageGalery.query.filter_by(cache=cache).all()
    serialized_images = [x.serialize() for x in images]
    return jsonify(serialized_images), 200


@api.route('/delete-image/', methods=['DELETE'])
@jwt_required()
def delete_image():
    user_id = get_jwt_identity()
    image_id= request.json.get("id") 
    image= ImageGalery.query.get(image_id)
    if image:
        db.session.delete(image)
        db.session.commit() 
        return jsonify({"response": "Imagen eliminada correctamente"}), 200



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
    body_username = request.json.get("name")
    body_country = request.json.get("country")
    body_city = request.json.get("city")
    body_date_of_birth = request.json.get("date_of_birth")
    user_already_exist = User.query.filter_by(email= body_email).first()
    
    # Check if user already exists
    if user_already_exist:
        return jsonify({"response": "Email already used"}), 300

    # Check that all fields are present in the request
    if not body_username or not body_email or not body_password:
        return jsonify({"response": "Username, email, and password are required."}), 300
    
    # Check that the email is in the correct format
    if not re.match(r'^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$', body_email):
        return jsonify({'response': "Invalid email address."}), 300

    # Check password requirements
    if len(body_password) < 8:
        return jsonify({"response": "Password must be at least 8 characters."}), 300
    if not re.search(r'[A-Z]', body_password):
        return jsonify({"response": "Password must include at least one capital letter."}), 300
    if not re.search(r'[a-z]', body_password):
        return jsonify({"response": "Password must include at least one lowercase letter."}), 300
    if not re.search(r'\d', body_password):
        return jsonify({"response": "Password must include at least one number."}), 300
    if not re.search(r'[^\w\s]', body_password):
        return jsonify({"response": "Password must include at least one special character."}), 300

    # Hash the password using SHA-256
    hashed_password = hashlib.sha256(body_password.encode('utf-8')).hexdigest()

    new_user = User(email=body_email, password=hashed_password, name=body_username, country=body_country, city=body_city, date_of_birth=body_date_of_birth)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"response": "User registered successfully"}), 200   

@api.route('/reg_cache', methods=['POST'])
@jwt_required()
def cache_register():
    user_id = get_jwt_identity()

    body_name = request.json.get("name")
    if not body_name or not isinstance(body_name, str):
        return jsonify({"response": "Invalid or missing 'name' parameter"}), 400

    body_description = request.json.get("description")

    body_comunidad_autonoma = request.json.get("comunidad_autonoma")
    if not body_comunidad_autonoma or not isinstance(body_comunidad_autonoma, str):
        return jsonify({"response": "Invalid or missing 'comunidad autonoma' parameter"}), 400

    body_provincia = request.json.get("provincia")
    if not body_provincia or not isinstance(body_provincia, str):
        return jsonify({"response": "Invalid or missing 'provincia' parameter"}), 400

    body_municipio = request.json.get("municipio")
    if not body_municipio or not isinstance(body_municipio, str):
        return jsonify({"response": "Invalid or missing 'municipio' parameter"}), 400

    body_postal_code = request.json.get("postal_code")
    if not body_postal_code or not isinstance(body_postal_code, str):
        return jsonify({"response": "Invalid or missing 'postal_code' parameter"}), 400

    body_coordinates_y = request.json.get("coordinates_y")
    if not body_coordinates_y or not isinstance(body_coordinates_y, str):
        return jsonify({"response": "Invalid or missing 'Latitud' parameter"}), 400

    body_coordinates_x = request.json.get("coordinates_x")
    if not body_coordinates_x or not isinstance(body_coordinates_x, str):
        return jsonify({"response": "Invalid or missing 'Longitud' parameter"}), 400

    body_difficulty = request.json.get("difficulty")
    if not body_difficulty or not isinstance(body_difficulty, str):
        return jsonify({"response": "Invalid or missing 'difficulty' parameter"}), 400

    body_size = request.json.get("size")
    if not body_size or not isinstance(body_size, str):
        return jsonify({"response": "Invalid or missing 'size' parameter"}), 400
    
    # Checks if cache exists
    cache_already_exist = Cache.query.filter_by(name= body_name).first()
    if cache_already_exist:
        return jsonify({"response": "Cache already created, choose another name"}), 300

    # Generating the QR code image
    qr_data = f"{body_name}, {body_description}, {body_comunidad_autonoma}, {body_provincia}, {body_municipio}, {body_postal_code}, {body_difficulty}, {body_size} ({'Lat ' + body_coordinates_y}, {'Lng' + body_coordinates_x})"
    qr_img = qrcode.make(qr_data)

    # Store the Qr code as binary data in the database
    qr_buf = BytesIO()
    qr_img.save(qr_buf, format='PNG')
    qr_binary = qr_buf.getvalue()

    # Encode binary data to base64 string
    qr_code_data = base64.b64encode(qr_binary).decode('utf-8')

    # Submit all data of new to the database
    new_cache = Cache(
        name=body_name,
        description=body_description,
        comunidad_autonoma=body_comunidad_autonoma,
        provincia=body_provincia,
        municipio=body_municipio,
        postal_code=body_postal_code,
        coordinates_y=body_coordinates_y,
        coordinates_x=body_coordinates_x,
        difficulty=body_difficulty,
        size=body_size,
        qr_code=qr_code_data,
        owner_id=user_id,
        )
    db.session.add(new_cache)
    db.session.commit()
    return jsonify({"response": "Cache registered successfully"}), 200   
 
@api.route('/ranking_users', methods=['GET'])
@jwt_required()
def ranking_users():
    # Aquí deberías obtener los datos de los usuarios y ordenarlos por puntuación
    # En este ejemplo, simplemente devolvemos una lista de diccionarios como si fuera la respuesta a la petición
    print("@@@@@@@")
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    users = User.query.all()
    users_rank = [x.rank() for x in users]
    print(users_rank)
    sorted_rank = sorted(users_rank,reverse=True, key=lambda x : x["caches"])
    return jsonify({"my_rank": user.rank(),"all_rank": sorted_rank }),200

@api.route('/admin_cache_moderation', methods=['POST'])
@jwt_required()
def status_cache():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.id_admin:
        body_is_accepted = request.json.get("is_accepted")
        body_is_declined = request.json.get("is_declined")
        body_is_pending = request.json.get("is_pending")
        cache_status = Cache(
            is_accepted=body_is_accepted,
            is_declined=body_is_declined,
            is_pending=body_is_pending,
            )
        db.session.add(cache_status)
        db.session.commit()
        return jsonify({"response": "Cache status changed successfully"}), 200
    return jsonify({"error": "Not authorised"}), 400

@api.route('/admin_cache_moderation', methods=['GET'])
@jwt_required()
def get_status_cache():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.is_admin:
        caches = Cache.query.filter_by(is_pending=True)
        return jsonify({"results": [cache.serialize() for cache in caches]}), 200
    return jsonify({"error": "Not authorised"}), 400

@api.route('/admin_accept_cache', methods=['PUT'])
@jwt_required()
def change_status_accepted():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.is_admin:
        body_cache_id = request.json.get("id")
        cache = Cache.query.get(body_cache_id)
        cache.is_approved = True
        cache.is_declined = False
        cache.is_pending = False
        db.session.commit()
        return jsonify({"response": "Cache accepted successfully"}), 200
    return jsonify({"error": "Not authorised"}), 400

@api.route('/admin_decline_cache', methods=['PUT'])
@jwt_required()
def change_status_declined():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.is_admin:
        body_cache_id = request.json.get("id")
        cache = Cache.query.get(body_cache_id)
        cache.is_approved = False
        cache.is_declined = True
        cache.is_pending = False
        db.session.commit()
        return jsonify({"response": "Cache rejected successfully"}), 200
    return jsonify({"error": "Not authorised"}), 400

@api.route('/user_cache_approved', methods=['GET'])
@jwt_required()
def get_status_cache_approved():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    caches = Cache.query.filter_by(owner_id=user_id, is_approved=True)
    return jsonify({"results": [cache.serialize() for cache in caches]}), 200

@api.route('/user_cache_declined', methods=['GET'])
@jwt_required()
def get_status_cache_declined():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    caches = Cache.query.filter_by(owner_id=user_id, is_declined=True)
    return jsonify({"results": [cache.serialize() for cache in caches]}), 200

@api.route('/user_cache_pending', methods=['GET'])
@jwt_required()
def get_status_cache_pending():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    caches = Cache.query.filter_by(owner_id=user_id, is_pending=True)
    return jsonify({"results": [cache.serialize() for cache in caches]}), 200