```python
from datetime import datetime
from typing import Dict, Optional

class Order:
    def __init__(self, order_id: str):
        self.order_id = order_id
        self.items: Dict[str, dict] = {}
        self.status = "Pending"
        self.transfer_type: Optional[str] = None
        self.transfer_timestamp: Optional[str] = None

    def add_item(self, sku: str, quantity: int, title: str, color: str, price: str):
        self.items[sku] = {
            'quantity': quantity,
            'scanned': 0,
            'status': 'Pending',
            'title': title,
            'color': color,
            'price': price
        }

    def scan_item(self, sku: str) -> dict:
        if sku not in self.items:
            raise ValueError("Item not found")
            
        self.items[sku]['scanned'] += 1
        self.items[sku]['status'] = "Fulfilled" if self.items[sku]['scanned'] >= self.items[sku]['quantity'] else "Pending"
        
        return {
            'order_id': self.order_id,
            'sku': sku,
            'scanned': self.items[sku]['scanned'],
            'status': self.items[sku]['status']
        }

    def update_transfer(self, transfer_type: str) -> dict:
        self.transfer_type = transfer_type
        self.transfer_timestamp = datetime.now().isoformat()
        
        return {
            'order_id': self.order_id,
            'transfer_type': self.transfer_type,
            'transfer_timestamp': self.transfer_timestamp
        }

    def to_dict(self) -> dict:
        return {
            'order_id': self.order_id,
            'items': self.items,
            'status': self.status,
            'transfer_type': self.transfer_type,
            'transfer_timestamp': self.transfer_timestamp
        }
```