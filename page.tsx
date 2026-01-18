'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [items, setItems] = useState([
    { id: 1, text: 'Get washed', done: false },
    { id: 2, text: 'Brush teeth', done: false },
    { id: 3, text: "Today's clothes", done: false },
    { id: 4, text: 'Bag', done: false }
  ]);

  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const toggleItem = (id: number) => {
    setItems(items.map(i => i.id === id ? { ...i, done: !i.done } : i));
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    setItems([...items, { id: Date.now(), text: newItem, done: false }]);
    setNewItem('');
  };

  const allDone = items.every(i => i.done);

  const remind = () => {
    if (Notification.permission === 'granted') {
      new Notification('Morning Checklist', {
        body: 'Have you finished your morning routine?'
      });
    }
  };

  return (
    <main style={{ maxWidth: 420, margin: '40px auto', background: '#fff', padding: 20, borderRadius: 12 }}>
      <h1>Morning Checklist</h1>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item.id} style={{ marginBottom: 8 }}>
            <label>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleItem(item.id)}
              />{' '}
              {item.done ? <s>{item.text}</s> : item.text}
            </label>
          </li>
        ))}
      </ul>

      <input
        placeholder="Add new task"
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
      />
      <button onClick={addItem} style={{ marginLeft: 8 }}>Add</button>

      {allDone && (
        <p style={{ marginTop: 16 }}>✅ All done!</p>
      )}

      <div style={{ marginTop: 16 }}>
        <button onClick={remind}>Send reminder</button>
      </div>
    </main>
  );
}
