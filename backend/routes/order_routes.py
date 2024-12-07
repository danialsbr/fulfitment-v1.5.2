```python
from flask import Blueprint, jsonify, request
from ..services.order_service import OrderService

bp = Blueprint('orders', __name__)
order_service = OrderService()

@bp.route('/orders', methods=['GET'])
def get_orders():
    """Retrieve all orders."""
    return jsonify({
        "success": True,
        "data": order_service.get_all_orders(),
        "message": "Orders retrieved successfully"
    }), 200

@bp.route('/orders/<order_id>', methods=['GET'])
def get_order(order_id):
    """Retrieve a specific order."""
    order = order_service.get_order(order_id)
    if not order:
        return jsonify({"success": False, "message": "Order not found"}), 404

    return jsonify({
        "success": True,
        "data": order.to_dict(),
        "message": "Order retrieved successfully"
    }), 200

@bp.route('/orders/<order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    """Update the status of an order."""
    data = request.json
    status = data.get("status")

    if not order_service.update_order_status(order_id, status):
        return jsonify({"success": False, "message": "Order not found"}), 404

    return jsonify({
        "success": True,
        "message": "Order status updated successfully"
    }), 200

@bp.route('/scan', methods=['POST'])
def scan_order_item():
    """Scan an item for an order."""
    data = request.json
    order_id = data.get("order_id")
    sku = data.get("sku")

    result = order_service.scan_order_item(order_id, sku)
    if not result:
        return jsonify({"success": False, "message": "Order or item not found"}), 404

    return jsonify({
        "success": True,
        "data": result,
        "message": "Item scanned successfully"
    }), 200

@bp.route('/orders/<order_id>/transfer', methods=['PUT'])
def update_transfer_status(order_id):
    """Update the transfer status of an order."""
    data = request.json
    transfer_type = data.get("transferType")

    result = order_service.update_transfer_status(order_id, transfer_type)
    if not result:
        return jsonify({"success": False, "message": "Order not found"}), 404

    return jsonify({
        "success": True,
        "data": result,
        "message": "Transfer status updated successfully"
    }), 200
```