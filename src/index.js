import React from 'react';
import {createRoot} from 'react-dom/client';
import {generateCode} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: generateCode(), title: 'Название товара', price: 100.0, isCart: false},
    {code: generateCode(), title: 'Книга про React', price: 770, isCart: false},
    {code: generateCode(), title: 'Конфета', price: 33, isCart: false},
    {code: generateCode(), title: 'Трактор', price: 7955320, isCart: false},
    {code: generateCode(), title: 'Телефон iPhone XIXV', price: 120000, isCart: false},
    {code: generateCode(), title: 'Карандаши цветные', price: 111, isCart: false},
    {code: generateCode(), title: 'Товар сюрприз', price: 0, isCart: false},
  ],
  cart: {
    totalPrice: 0,
    total: 0,
    ids: [],
    entities: {}
  }
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
