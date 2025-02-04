#!/bin/bash

# Variables
PROJECT_NAME="stock_api"
APP_DIR="${PROJECT_NAME}/app"
API_DIR="${APP_DIR}/api"
MODELS_DIR="${APP_DIR}/models"
TESTS_DIR="${PROJECT_NAME}/tests"
INSTANCE_DIR="${PROJECT_NAME}/instance"
REQUIREMENTS="Flask Flask-SQLAlchemy Flask-CORS python-dotenv"

# Create project structure
mkdir -p "${API_DIR}"
mkdir -p "${MODELS_DIR}"
mkdir -p "${TESTS_DIR}"
mkdir -p "${INSTANCE_DIR}"

# Create __init__.py files
touch "${APP_DIR}/__init__.py"
touch "${API_DIR}/__init__.py"
touch "${MODELS_DIR}/__init__.py"

# Create other necessary files
touch "${APP_DIR}/extensions.py"
touch "${APP_DIR}/errors.py"
touch "${API_DIR}/products.py"
touch "${API_DIR}/stock.py"
touch "${API_DIR}/errors.py"
touch "${MODELS_DIR}/product.py"
touch "${PROJECT_NAME}/config.py"
touch "${PROJECT_NAME}/wsgi.py"
touch "${PROJECT_NAME}/requirements.txt"
touch "${PROJECT_NAME}/.env"
touch "${PROJECT_NAME}/.flaskenv"
touch "${TESTS_DIR}/test_api.py"

# Write basic content to files
cat <<EOL > "${APP_DIR}/__init__.py"
from flask import Flask
from flask_cors import CORS
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Enable CORS
    CORS(app)

    # Initialize extensions
    from app.extensions import db
    db.init_app(app)

    # Register API blueprints
    from app.api import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app
EOL

cat <<EOL > "${APP_DIR}/extensions.py"
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
EOL

cat <<EOL > "${API_DIR}/__init__.py"
from flask import Blueprint

api_bp = Blueprint('api', __name__)

from app.api.products import *
from app.api.stock import *
from app.api.errors import *
EOL

cat <<EOL > "${API_DIR}/products.py"
from flask import jsonify, request
from app import db
from app.models.product import Product
from app.api import api_bp

@api_bp.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@api_bp.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict())

@api_bp.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    product = Product(**data)
    db.session.add(product)
    db.session.commit()
    return jsonify(product.to_dict()), 201
EOL

cat <<EOL > "${MODELS_DIR}/product.py"
from app.extensions import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    quantity = db.Column(db.Integer, default=0)
    price = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'quantity': self.quantity,
            'price': self.price
        }
EOL

cat <<EOL > "${PROJECT_NAME}/config.py"
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///stock.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_HEADERS = 'Content-Type'

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('PROD_DATABASE_URL')
EOL

cat <<EOL > "${PROJECT_NAME}/wsgi.py"
from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run()
EOL

cat <<EOL > "${PROJECT_NAME}/requirements.txt"
${REQUIREMENTS}
EOL

cat <<EOL > "${PROJECT_NAME}/.env"
FLASK_APP=wsgi.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///stock.db
EOL

cat <<EOL > "${PROJECT_NAME}/.flaskenv"
FLASK_APP=wsgi.py
FLASK_ENV=development
EOL

# Install dependencies
pip install -r "${PROJECT_NAME}/requirements.txt"

echo "Project ${PROJECT_NAME} created successfully!"
echo "Activate your virtual environment and start the Flask app:"
echo "flask run"
