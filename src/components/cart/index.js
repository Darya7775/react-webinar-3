import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Cart({ cart, openCart, onDeleteItemInCart }) {

  const cn = bem('Cart');

  return(
    <>
      <div className='Overlay' onClick={openCart}/>
      <div className={cn()}>
        <div className={cn('wrapper')}>
          <h2 className={cn('title')}>Корзина</h2>
          <button className={cn('button')} type='button' onClick={openCart}>Закрыть</button>
        </div>
        <List list={Object.values(cart.entities)} onDeleteItemInCart={onDeleteItemInCart} />
        <div className={cn('price')}>
          <span>Итого:</span>
          <span>{cart.totalPrice} ₽</span>
        </div>
      </div>
    </>
  );
}

Cart.propTypes = {
  cart: PropTypes.shape({
    totalPrice: PropTypes.number,
    entities: PropTypes.object,
  }).isRequired,
  onDeleteItemInCart: PropTypes.func,
  openCart: PropTypes.func,
};

Cart.defaultProps = {
  onDeleteItemInCart: () => {},
  openCart: () => {},
};

export default Cart;
