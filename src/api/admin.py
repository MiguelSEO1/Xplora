  
import os
from flask_admin import Admin
from .models import db, User, Cache, Blog, Image, Favorite, Comment
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    class MyModel(ModelView):
       column_display_pk = True
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(MyModel(User, db.session))
    admin.add_view(MyModel(Favorite, db.session))
    admin.add_view(MyModel(Blog, db.session))
    admin.add_view(MyModel(Image, db.session))
    admin.add_view(MyModel(Cache, db.session))

    
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))