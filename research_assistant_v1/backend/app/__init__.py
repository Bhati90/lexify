import os
from flask import Flask
from app.config import config_by_name  # Fixed import path

from app.extensions import db, migrate, jwt, cors  # Fixed import path

# Add these imports for logging
import logging
from logging.handlers import RotatingFileHandler

def create_app(config_name='dev'):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    # Handle directory creation based on environment
    if config_name == 'prod':
        # Production: use /tmp for writable storage
        paper_save_dir = '/tmp/papers'
        log_dir = '/tmp/logs'
    else:
        # Development: use local directories
        # Ensure the instance folder exists for SQLite
        if app.config['SQLALCHEMY_DATABASE_URI'].startswith('sqlite:///'):
            instance_path = os.path.join(os.path.dirname(app.root_path), 'instance')
            if not os.path.exists(instance_path):
                try:
                    os.makedirs(instance_path)
                    print(f"Created instance folder at {instance_path}")
                except OSError as e:
                    print(f"Error creating instance folder at {instance_path}: {e}")

        # Use configured paper save directory for development
        paper_save_dir = app.config['PAPER_SAVE_DIR']
        log_dir = os.path.join(os.path.dirname(app.root_path), 'logs')

    # Ensure paper save directory exists
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

    # CORS Setup - Allow both development and production origins
    allowed_origins = ["http://localhost:5173"]  # Development frontend
    
    # Add production frontend URL when you have it
    # allowed_origins.append("https://your-frontend-domain.com")
    
    cors.init_app(
        app,
        supports_credentials=True,
        origins=allowed_origins,
        expose_headers=["Authorization"]
    )

    # --- Logging Configuration ---
    if not os.path.exists(log_dir):
        try:
            os.makedirs(log_dir)
            print(f"Log directory created at: {log_dir}")
        except OSError as e:
            print(f"Error creating log directory {log_dir}: {e}")

    log_file = os.path.join(log_dir, 'app.log')
    try:
        file_handler = RotatingFileHandler(log_file, maxBytes=10 * 1024 * 1024, backupCount=5, encoding='utf-8')
        log_formatter = logging.Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]')
        file_handler.setFormatter(log_formatter)
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)
        app.logger.setLevel(logging.INFO)
        app.logger.info('Application logging to file configured.')
    except Exception as e:
        print(f"Error setting up file logging: {e}")
        # Continue without file logging in production

    # Create database tables (important for production)
    with app.app_context():
        try:
            db.create_all()
            app.logger.info("Database tables created successfully")
            print("Database tables created successfully")
        except Exception as e:
            app.logger.error(f"Error creating database tables: {e}")
            print(f"Error creating database tables: {e}")

    # Register Blueprints
    from .api.auth import auth_bp
    from .api.papers import papers_bp
    from .api.rag import rag_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(papers_bp, url_prefix='/api/papers')
    app.register_blueprint(rag_bp, url_prefix='/api/rag')

    # Add a health check endpoint for deployment monitoring
    @app.route('/health')
    def health_check():
        return {'status': 'healthy', 'environment': config_name}, 200

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