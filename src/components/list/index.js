import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import ItemCart from '../item-cart';
import './style.css';

function List(props) {
  return (
    <ul className='List'>{
      props.list.map(item =>
        <li key={item.code} className='List-item'>
          {item.count ? (
            <ItemCart
              item={item}
              onDeleteItemInCart={props.onDeleteItemInCart} />
          ) : (
            <Item
              item={item}
              onAddInCart={props.onAddItemInCart}
              onIncreaseCountAndPrice={props.onIncreaseCountAndPrice} />
          )}
        </li>
      )}
    </ul>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItemInCart: PropTypes.func,
  onIncreaseCountAndPrice: PropTypes.func,
  onDeleteItemInCart: PropTypes.func
};

List.defaultProps = {
  onAddItemInCart: () => {},
  onIncreaseCountAndPrice: () => {},
  onDeleteItemInCart: () => {},
}

export default React.memo(List);
