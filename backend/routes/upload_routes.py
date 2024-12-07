```python
import os
from flask import Blueprint, jsonify, request, current_app
from werkzeug.utils import secure_filename
from ..services.excel_service import ExcelService
from ..services.order_service import OrderService

bp = Blueprint('upload', __name__)
order_service = OrderService()

@bp.route('/upload', methods=['POST'])
def upload_file():
    """Handle file uploads."""
    if 'file' not in request.files:
        return jsonify({"success": False, "message": "No file provided"}), 400

    file = request.files['file']
    if not file.filename.endswith('.xlsx'):
        return jsonify({"success": False, "message": "Invalid file format"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    try:
        # Process Excel file and update orders
        orders = ExcelService.process_excel(file_path)
        for order_id, order in orders.items():
            order_service.orders[order_id] = order

        return jsonify({
            "success": True,
            "message": "File uploaded and processed successfully",
            "file_path": file_path
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error processing file: {str(e)}"
        }), 500
```