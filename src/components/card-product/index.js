import React, {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function CardProduct(props) {

  const callbacks = {
    addToBasket: (e) => props.addToBasket(props.product)
  }

  const cn = bem('CardProduct');

  return(
    <section className={cn()}>
      <p className={cn('text')}>{props.product.description}</p>
      <span>Страна производитель: <span className={cn('fat')}>{props.made.title} ({props.made.code})</span></span>
      <span>Категория: <span className={cn('fat')}>{props.category.title}</span></span>
      <span>Год выпуска: <span className={cn('fat')}>{props.product.edition}</span></span>
      <span className={cn('price')}>Цена: {props.product.price} ₽</span>
      <button className={cn('button')} type='button' onClick={callbacks.addToBasket}>Добавить</button>
    </section>
  );
}

CardProduct.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    price: PropTypes.number,
    edition: PropTypes.number,
  }).isRequired,
  made: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
  }),
  category: PropTypes.shape({
    title: PropTypes.string,
  }),
  addToBasket: PropTypes.func,
};

CardProduct.defaultProps = {
  addToBasket: () => {},
}

export default memo(CardProduct);
