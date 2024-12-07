```python
from flask import Flask
from flask_cors import CORS
from .config import Config
from .routes import order_routes, upload_routes

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Load configuration
    app.config.from_object(Config)
    Config.init_app(app)
    
    # Register blueprints
    app.register_blueprint(order_routes.bp, url_prefix='/api')
    app.register_blueprint(upload_routes.bp, url_prefix='/api')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(port=Config.PORT, debug=Config.DEBUG)
```