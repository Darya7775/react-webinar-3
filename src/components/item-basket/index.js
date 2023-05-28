import {memo} from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import {numberFormat} from '../../utils';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    closeModal: () => props.closeModal(),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link to={`${props.parentUrl}${props.item._id}`} className={cn('link')} onClick={callbacks.closeModal}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>Удалить</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  parentUrl: PropTypes.string,
  onRemove: propTypes.func,
  closeModal: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  closeModal: () => {},
}

export default memo(ItemBasket);
