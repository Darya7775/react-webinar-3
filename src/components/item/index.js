import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Item(props){

  const cn = bem('Item');

  const callbacks = {
    onAddInCart: () => {
      props.onAddInCart(props.item);
    },

    onIncreaseCountAndPrice: () => {
      props.onIncreaseCountAndPrice(props.item);
    },

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
        {props.item.price} ₽
      </div>
      {props.item.count ? (<div className={cn('count')}>{props.item.count} шт</div>) : ('')}
      <div className={cn('actions')}>
        <button className={cn('button')} type='button' onClick={() => {props.item.count ? (callbacks.onDeleteItemInCart()) : (props.item.isCart ? callbacks.onIncreaseCountAndPrice() : callbacks.onAddInCart())} }>
          {props.item.count ? ('Удалить') : ('Добавить')}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
    isCart: PropTypes.bool
  }).isRequired,
  onAddInCart: PropTypes.func,
  onIncreaseCountAndPrice: PropTypes.func,
  onDeleteItemInCart: PropTypes.func
};

Item.defaultProps = {
  onAddInCart: () => {},
  onIncreaseCountAndPrice: () => {},
  onDeleteItemInCart: () => {},
}

export default React.memo(Item);
