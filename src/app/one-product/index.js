import React, {useCallback, useEffect, useState, memo} from 'react';
import {useParams} from 'react-router-dom';
import BasketTool from '../../components/basket-tool';
import Head from '../../components/head';
import CardProduct from '../../components/card-product';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

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
  }, [activeUrl.id]);

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
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
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
