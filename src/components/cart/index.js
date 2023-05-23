import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import './style.css';

function Cart({ cart, onDeleteItemInCart }) {
  return(
    <div className='Cart'>
      <List list={Object.values(cart.entities)} onDeleteItemInCart={onDeleteItemInCart} />
      <div className='Cart-price'>
        <span>Итого:</span>
        <span>{cart.totalPrice.toLocaleString('ru-RU')} ₽</span>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.shape({
    totalPrice: PropTypes.number,
    entities: PropTypes.object,
  }).isRequired,
  onDeleteItemInCart: PropTypes.func,
};

Cart.defaultProps = {
  onDeleteItemInCart: () => {},
};

export default Cart;
