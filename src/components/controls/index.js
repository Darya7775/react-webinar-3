import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import Cart from '../cart';
import {plural} from '../../utils';
import './style.css';

function Controls({ cart, onDeleteItemInCart }) {
  const [ openCart, setOpenCart ] = useState(false);

  const cn = bem('Controls');

  return (
    <>
      {openCart ?
        <Cart cart={cart} openCart={() => setOpenCart(!openCart)} onDeleteItemInCart={onDeleteItemInCart} />
        :
        <div className={cn()}>
          <div className={cn('wrapper')}> В корзине:
            {cart.ids.length ?
              <span className={cn('text')}>{cart.ids.length ? `${cart.ids.length} ${plural(cart.ids.length, {one: 'товар', few: 'товара', many: 'товаров'})}` : ''}/{cart.totalPrice} ₽</span>
            :
              <span className={cn('text')}>пусто</span>
            }
          </div>
          <button className={cn('button')} type='button' onClick={() => setOpenCart(!openCart)}>Перейти</button>
        </div>
      }
    </>

  )
}

Controls.propTypes = {
  cart: PropTypes.shape({
    totalPrice: PropTypes.number,
    ids: PropTypes.array,
  }).isRequired,
  onDeleteItemInCart: PropTypes.func
};

Controls.defaultProps = {
  onDeleteItemInCart: () => {}
};

export default React.memo(Controls);
