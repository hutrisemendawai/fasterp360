import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function InventoryList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/inventory/products')
      .then(res => setItems(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p.id} className="border-t">
              <td className="py-2 px-4">{p.id}</td>
              <td className="py-2 px-4">{p.name}</td>
              <td className="py-2 px-4">{p.description}</td>
              <td className="py-2 px-4">{p.price}</td>
              <td className="py-2 px-4">{p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
