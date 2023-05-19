import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({list, onAddItemInCart, onIncreaseCountAndPrice, onDeleteItemInCart}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item
            item={item}
            onAddInCart={onAddItemInCart}
            onIncreaseCountAndPrice={onIncreaseCountAndPrice}
            onDeleteItemInCart={onDeleteItemInCart} />
        </div>
      )}
    </div>
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
