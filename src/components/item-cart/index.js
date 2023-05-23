import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ItemCart(props) {

  const cn = bem('ItemCart');

  const callbacks = {
    onDeleteItemInCart: () => {
      props.onDeleteItemInCart(props.item);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {props.item.price.toLocaleString('ru-RU')} ₽
      </div>
      <div className={cn('count')}>{props.item.count} шт</div>
      <div className={cn('actions')}>
        <button className={cn('button')} type='button' onClick={callbacks.onDeleteItemInCart}>
          Удалить
        </button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onDeleteItemInCart: PropTypes.func
};

ItemCart.defaultProps = {
  onDeleteItemInCart: () => {},
}

export default React.memo(ItemCart);
