import os
from app import create_app

config_name = os.getenv('FLASK_CONFIG') or 'dev'
app = create_app(config_name)

# Initialize app-specific configurations for production
if config_name == 'prod' and hasattr(app.config, 'init_app'):
    app.config.init_app(app)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = app.config.get('DEBUG', False)
    app.run(debug=debug, host='0.0.0.0', port=port)