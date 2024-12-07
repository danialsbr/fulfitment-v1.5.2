```python
from typing import Dict, Optional
from ..models.order import Order

class OrderService:
    def __init__(self):
        self.orders: Dict[str, Order] = {}

    def create_order(self, order_id: str) -> Order:
        order = Order(order_id)
        self.orders[order_id] = order
        return order

    def get_order(self, order_id: str) -> Optional[Order]:
        return self.orders.get(order_id)

    def get_all_orders(self) -> Dict[str, dict]:
        return {order_id: order.to_dict() for order_id, order in self.orders.items()}

    def update_order_status(self, order_id: str, status: str) -> bool:
        order = self.get_order(order_id)
        if not order:
            return False
        order.status = status
        return True

    def scan_order_item(self, order_id: str, sku: str) -> Optional[dict]:
        order = self.get_order(order_id)
        if not order:
            return None
        return order.scan_item(sku)

    def update_transfer_status(self, order_id: str, transfer_type: str) -> Optional[dict]:
        order = self.get_order(order_id)
        if not order:
            return None
        return order.update_transfer(transfer_type)
```