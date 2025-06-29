import os
from flask import Flask
from config import config_by_name
from extensions import db, migrate, jwt, cors

# Add these imports for logging
import logging
from logging.handlers import RotatingFileHandler

def create_app(config_name='dev'):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    # Ensure the instance folder exists for SQLite
    if app.config['SQLALCHEMY_DATABASE_URI'].startswith('sqlite:///'):
        instance_path = os.path.join(os.path.dirname(app.root_path), 'instance')
        if not os.path.exists(instance_path):
            try:
                os.makedirs(instance_path)
                print(f"Created instance folder at {instance_path}")
            except OSError as e:
                print(f"Error creating instance folder at {instance_path}: {e}")

    # Ensure paper save directory exists
    paper_save_dir = app.config['PAPER_SAVE_DIR']
    if not os.path.exists(paper_save_dir):
        try:
            os.makedirs(paper_save_dir, exist_ok=True)
            print(f"Paper save directory created/ensured at: {paper_save_dir}")
        except OSError as e:
            print(f"Error creating paper save directory at {paper_save_dir}: {e}")

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # ✅ Fixed CORS Setup: allows frontend (React) at localhost:5173
    cors.init_app(
        app,
        supports_credentials=True,
        origins=["http://localhost:5173"],
        expose_headers=["Authorization"]
    )

    # --- Logging Configuration ---
    log_dir = os.path.join(os.path.dirname(app.root_path), 'logs')
    if not os.path.exists(log_dir):
        try:
            os.makedirs(log_dir)
        except OSError as e:
            print(f"Error creating log directory {log_dir}: {e}")

    log_file = os.path.join(log_dir, 'app.log')
    file_handler = RotatingFileHandler(log_file, maxBytes=10 * 1024 * 1024, backupCount=5, encoding='utf-8')
    log_formatter = logging.Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]')
    file_handler.setFormatter(log_formatter)
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info('Application logging to file configured.')

    # Register Blueprints
    from .api.auth import auth_bp
    from .api.papers import papers_bp
    from .api.rag import rag_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(papers_bp, url_prefix='/api/papers')
    app.register_blueprint(rag_bp, url_prefix='/api/rag')

    # Shell context for flask shell
    @app.shell_context_processor
    def ctx():
        from app.models.user import User
        from app.models.paper import PaperMetadata
        from app.models.chat import ChatMessage, ChatSession
        return {
            'app': app,
            'db': db,
            'User': User,
            'PaperMetadata': PaperMetadata,
            'ChatMessage': ChatMessage,
            'ChatSession': ChatSession
        }

    return app
