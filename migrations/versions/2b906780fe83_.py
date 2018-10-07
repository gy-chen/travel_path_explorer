"""empty message

Revision ID: 2b906780fe83
Revises: 
Create Date: 2018-10-01 09:39:49.707679

"""
import csv
import os
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2b906780fe83'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    geolocation_table = op.create_table('geolocation',
                                        sa.Column(
                                            'network', sa.String(), nullable=False),
                                        sa.Column('lat', sa.Float(),
                                                  nullable=False),
                                        sa.Column('lng', sa.Float(),
                                                  nullable=False),
                                        sa.PrimaryKeyConstraint('network')
                                        )
    # ### end Alembic commands ###
    op.bulk_insert(geolocation_table, list(geolocation_data()))


def geolocation_data():
    data_path = os.path.join(os.path.dirname(
        __file__), '2b906780fe83_geolocation_data.csv')
    with open(data_path, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                yield {
                    'network': row['network'],
                    'lat': float(row['latitude']),
                    'lng': float(row['longitude'])
                }
            except ValueError:
                continue


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('geolocation')
    # ### end Alembic commands ###