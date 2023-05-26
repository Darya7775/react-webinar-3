import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import BasketTool from '../../components/basket-tool';
import Head from '../../components/head';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import './style.css';

function OneProduct() {
  const [product, setProduct] = useState({});
  const store = useStore();
  const activeUrl = useParams();

  useEffect(() => {
    async function loadingOneProduct() {
      const response = await fetch(`/api/v1/articles/${activeUrl.id}?fields=*,madeIn(title,code),category(title)`);
      const result = await response.json();
      setProduct(result.result);
    }
    loadingOneProduct()
  }, []);

  const made = {...product.madeIn};
  const category = {...product.category};

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const cn = bem('OneProduct');

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return(
    <>
      <Head title={product.title}/>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <section className={cn()}>
        <p className={cn('text')}>{product.description}</p>
        <span>Страна производитель: <span className={cn('fat')}>{made.title} ({made.code})</span></span>
        <span>Категория: <span className={cn('fat')}>{category.title}</span></span>
        <span>Год выпуска: <span className={cn('fat')}>{product.edition}</span></span>
        <span className={cn('price')}>Цена: {product.price} ₽</span>
        <button className={cn('button')}  type='button' onClick={() => callbacks.addToBasket(product._id)}>Добавить</button>
      </section>
    </>
  );
}

export default OneProduct;
