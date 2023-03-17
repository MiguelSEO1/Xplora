"""empty message

Revision ID: 535b12163213
Revises: 
Create Date: 2023-03-15 18:16:55.436022

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '535b12163213'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('is_admin', sa.Boolean(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('date_of_birth', sa.Date(), nullable=True),
    sa.Column('country', sa.String(length=255), nullable=True),
    sa.Column('city', sa.String(length=255), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('profile_image_url', sa.String(length=255), nullable=True),
    sa.Column('ig', sa.String(length=255), nullable=True),
    sa.Column('fb', sa.String(length=255), nullable=True),
    sa.Column('twitter', sa.String(length=255), nullable=True),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('profile_image_url')
    )
    op.create_table('blog',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('date_of_creation', sa.Date(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('cache',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('is_approved', sa.Boolean(), nullable=False),
    sa.Column('is_declined', sa.Boolean(), nullable=False),
    sa.Column('is_pending', sa.Boolean(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('country', sa.String(length=255), nullable=False),
    sa.Column('state', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=255), nullable=False),
    sa.Column('postal_code', sa.String(length=255), nullable=False),
    sa.Column('coordinates_y', sa.Float(), nullable=True),
    sa.Column('coordinates_x', sa.Float(), nullable=True),
    sa.Column('difficulty', sa.String(length=255), nullable=False),
    sa.Column('size', sa.String(length=255), nullable=False),
    sa.Column('qr_code', sa.String(length=1500), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('cache_found',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('cache_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['cache_id'], ['cache.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'cache_id')
    )
    op.create_table('favorite',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('cache_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('blog_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['blog_id'], ['blog.id'], ),
    sa.ForeignKeyConstraint(['cache_id'], ['cache.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('image',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=255), nullable=False),
    sa.Column('cache_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['cache_id'], ['cache.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('image')
    op.drop_table('favorite')
    op.drop_table('cache_found')
    op.drop_table('cache')
    op.drop_table('blog')
    op.drop_table('user')
    # ### end Alembic commands ###
