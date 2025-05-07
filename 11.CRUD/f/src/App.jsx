import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import "";
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [editItem, setEditItem] = useState({ id: '', name: '', description: '' });

  // Fetch items from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Add a new item
  const handleAddItem = () => {
    axios.post('http://localhost:5000/items', newItem)
      .then((response) => {
        setItems([...items, response.data]);
        setNewItem({ name: '', description: '' });
      })
      .catch((err) => console.error(err));
  };

  // Edit an existing item
  const handleEditItem = () => {
    console.log('Editing Item:', editItem); // Debug log
    axios.put(`http://localhost:5000/items/${editItem.id}`, {
      name: editItem.name,
      description: editItem.description,
    })
      .then((response) => {
        const updatedItems = items.map((item) =>
          item._id === editItem.id ? response.data : item
        );
        setItems(updatedItems);
        setEditItem({ id: '', name: '', description: '' }); // Reset edit form
      })
      .catch((err) => console.error(err));
  };

  // Delete an item
  const handleDeleteItem = (id) => {
    axios.delete(`http://localhost:5000/items/${id}`)
      .then(() => {
        const filteredItems = items.filter((item) => item._id !== id);
        setItems(filteredItems);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <h1>React CRUD App</h1>

      {/* Add Item */}
      <div>
        <h2>Add Item</h2>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <button onClick={handleAddItem}>Add</button>
      </div>

      {/* Edit Item */}
      {editItem.id && (
        <div>
          <h2>Edit Item</h2>
          <input
            type="text"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
          <input
            type="text"
            value={editItem.description}
            onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
          />
          <button onClick={handleEditItem}>Save</button>
        </div>
      )}

      {/* Items List */}
      <div>
        <h2>Items</h2>

        {items.map((item) => (
          <div key={item._id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            {/* Edit Button */}
            <button 
              onClick={() => {
                console.log('Item clicked for editing:', item); // Debug log
                // setEditItem(item); // Set the selected item for editing
                setEditItem({ id: item._id, name: item.name, description: item.description });

              }}
            >
              Edit
            </button>
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
