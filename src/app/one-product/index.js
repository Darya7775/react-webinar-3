import React, {useCallback, useEffect, useState, memo} from 'react';
import {useParams} from 'react-router-dom';
import BasketTool from '../../components/basket-tool';
import Head from '../../components/head';
import CardProduct from '../../components/card-product';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Navigation from '../../components/navigation';
import Wrapper from '../../components/wrapper';

function OneProduct() {

  const store = useStore();

  const activeUrl = useParams();

  useEffect(() => {
    store.actions.oneProduct.load(activeUrl.id);
  }, [activeUrl.id]);

  const product = useSelector(state => ({
    ...state.oneProduct.product
  }));

  const made = {...product.madeIn};
  const category = {...product.category};

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(product => store.actions.basket.addToBasketOneProduct(product), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return(
    <>
      <Head title={product.title}/>
      <Wrapper>
        <Navigation />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Wrapper>
      <CardProduct
        product={product}
        made={made}
        category={category}
        addToBasket={callbacks.addToBasket}
      />
    </>
  );
}

export default memo(OneProduct);
