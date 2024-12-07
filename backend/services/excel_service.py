```python
import pandas as pd
from typing import Dict
from ..models.order import Order

class ExcelService:
    @staticmethod
    def process_excel(file_path: str) -> Dict[str, Order]:
        orders = {}
        df = pd.read_excel(file_path)
        
        # Map Persian column names to English
        column_mapping = {
            'سریال': 'order_id',
            'کد محصول': 'sku',
            'شرح محصول': 'title',
            'رنگ': 'color',
            'تعداد': 'quantity',
            'قیمت': 'price'
        }
        
        # Rename columns if they exist
        df = df.rename(columns={k: v for k, v in column_mapping.items() if k in df.columns})
        
        for _, row in df.iterrows():
            order_id = str(row['order_id'])
            if order_id not in orders:
                orders[order_id] = Order(order_id)
                
            orders[order_id].add_item(
                sku=str(row['sku']),
                quantity=int(row['quantity']),
                title=str(row['title']),
                color=str(row['color']),
                price=str(row['price'])
            )
            
        return orders
```