```python
import os

class Config:
    UPLOAD_FOLDER = 'uploads'
    DEBUG = True
    PORT = 5001
    
    @staticmethod
    def init_app(app):
        # Create upload folder if it doesn't exist
        if not os.path.exists(Config.UPLOAD_FOLDER):
            os.makedirs(Config.UPLOAD_FOLDER)
```