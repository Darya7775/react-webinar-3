import {memo} from 'react';
import {Link, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from '../../utils';
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const activeUrl = useParams();

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to={`/${activeUrl.pageNumber}`} className={cn('link')}>Главная</Link>
      <div>
        <span className={cn('label')}>В корзине:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {one:'товар', few:'товара', many:'товаров'})} / ${numberFormat(sum)} ₽`
            : `пусто`
          }
        </span>
        <button className={cn('button')} type='button' onClick={onOpen}>Перейти</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
