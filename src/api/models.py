from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

cache_found = db.Table('cache_found',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('cache_id', db.Integer, db.ForeignKey('cache.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)
    name = db.Column(db.String(255), nullable=True)
    date_of_birth = db.Column(db.Date, nullable=True)
    country = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_image_url = db.Column(db.String(255), nullable=True, unique=True)
    ig = db.Column(db.String(255),nullable=True)
    fb = db.Column(db.String(255),nullable=True)
    twitter = db.Column(db.String(255),nullable=True)
    password = db.Column(db.String(255), nullable=False)
    blogs = db.relationship('Blog', backref='blog_creator')
    caches_found = db.relationship('Cache', secondary=cache_found, backref=db.backref('users_found'))
    caches = db.relationship('Cache', backref='user_creator')
    comments = db.relationship('Comment', backref='user')
    images = db.relationship('ImageGalery', backref='user')
    favorites = db.relationship('Favorite', backref='user')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "country": self.country,
            "city": self.city,
            "email": self.email,
            "profile_image_url": self.profile_image_url,
            "caches_found": [x.serialize()for x in self.caches_found],
            "is_admin": self.is_admin,
            "favorites" : [x.serialize() for x in self.favorites],
            "password": self.password,

        }

    def basicInfo(self): 
        return{
            "id": self.id,
            "name": self.name,
            "profile_image_url": self.profile_image_url,
 
        }   

    def rank(self):
        return {
            "id": self.id,
            "name": self.name,
            "caches": len(self.caches_found)
        }

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    date_of_creation = db.Column(db.Date, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # favorites = db.relationship('Favorite')

class Cache(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    is_approved = db.Column(db.Boolean, nullable=False, default=False)
    is_declined = db.Column(db.Boolean, nullable=False, default=False)
    is_pending = db.Column(db.Boolean, nullable=False, default=True)
    description = db.Column(db.Text, nullable=False)
    country = db.Column(db.String(255), nullable=False)
    comunidad_autonoma = db.Column(db.String(255), nullable=False)
    provincia = db.Column(db.String(255), nullable=False)
    postal_code = db.Column(db.String(255), nullable=False)
    coordinates_y = db.Column(db.Float)
    coordinates_x = db.Column(db.Float)
    difficulty = db.Column(db.String(255), nullable=False)
    size = db.Column(db.String(255), nullable=False)
    qr_code = db.Column(db.String(5000), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    comments = db.relationship('Comment', backref='cache')
    images = db.relationship('ImageGalery', backref='cache')
    favorites = db.relationship('Favorite', backref='cache')
    is_favorite = db.Column(db.Boolean, nullable=False, default=False)
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "country": self.country,
            "comunidad_autonoma": self.comunidad_autonoma,
            "provincia": self.provincia,
            "postal_code": self.postal_code,
            "coordinates_y": self.coordinates_y,
            "coordinates_x": self.coordinates_x,
            "size": self.size,
            "is_favorite": self.is_favorite,
            "difficulty": self.difficulty,
            "qr_code": self.qr_code,
            "owner_id": self.owner_id,
            "comments": [x.serialize() for x in self.comments],
            "images" : [x.serialize() for x in self.images],
            #"favorites" : [x.serialize() for x in self.favorites]

    #La clave "comments" contiene una lista con los comentarios asociados al objeto.

        }

    def basicInfo(self): 
        return{
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "country": self.country,
            "state": self.comunidad_autonoma,
            "city": self.provincia,
            "size": self.size,
            "difficulty": self.difficulty,
        }  
    

class ImageGalery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    date_of_Publication = db.Column(db.Date, nullable=True)
    imageprimary = db.Column(db.Boolean, default=False)
    cache_id = db.Column(db.Integer, db.ForeignKey('cache.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        user= User.query.get(self.user_id)
        return {
            "id": self.id,
            "user": user.basicInfo(),
            "title": self.title,
            "date_of_Publication": self.date_of_Publication,
            "url": self.url,
        }

class Comment(db.Model):
     id = db.Column(db.Integer, primary_key=True)
     title = db.Column(db.String(100), nullable=False)
     text = db.Column(db.Text, nullable=False)
     url_image = db.Column(db.String(255))
     cache_id = db.Column(db.Integer, db.ForeignKey('cache.id'), nullable=False)
     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
     complaint = db.relationship('Complaint', backref='comment')
     is_spam = db.Column(db.Boolean, nullable=False, default=False)
     is_sexual_content = db.Column(db.Boolean, nullable=False, default=False)
     is_violence = db.Column(db.Boolean, nullable=False, default=False)
     is_child_abuse = db.Column(db.Boolean, nullable=False, default=False)

     def serialize(self):
        user= User.query.get(self.user_id)
        return {
            "id": self.id,
            "title": self.title,
            "is_spam": self.is_spam,
            "is_sexual_content": self.is_sexual_content,
            "is_violence": self.is_violence,
            "is_child_abuse": self.is_child_abuse,
            "text": self.text,
            "user": user.serialize(),
            "complaint": [x.serialize() for x in self.complaint],

        }

class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cache_id = db.Column(db.Integer, db.ForeignKey('cache.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    blog_id = db.Column(db.Integer, db.ForeignKey('blog.id'))
    blog = db.relationship('Blog')
   
    def serialize(self):
         user= User.query.get(self.user_id)
         cache= Cache.query.get(self.cache_id)
         return {
             "id": self.id,
             "user": user.basicInfo(),
             "cache":cache.basicInfo(),

        }

class Complaint(db.Model):
     id = db.Column(db.Integer, primary_key=True)
     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
     title = db.Column(db.String(100), nullable=False)
     text = db.Column(db.Text, nullable=False)
     comment_id = db.Column(db.Integer, db.ForeignKey('comment.id'), nullable=False)

     def serialize(self):
         user= User.query.get(self.user_id)
         comment= Comment.query.get(self.comment_id)
         return {
             "id": self.id,
             "title": self.id,
             "text": self.id,
             "user": user.basicInfo(),

        }