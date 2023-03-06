"""empty message

Revision ID: 1a3e83d24813
Revises: 320b7a437f2e
Create Date: 2023-03-06 18:21:44.770790

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1a3e83d24813'
down_revision = '320b7a437f2e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('profile_image_url', sa.String(length=255), nullable=True))
        batch_op.create_unique_constraint(None, ['profile_image_url'])
        batch_op.drop_column('images')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('images', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('profile_image_url')

    # ### end Alembic commands ###
