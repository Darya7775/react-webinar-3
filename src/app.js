import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;
  console.log(store.getState())

  const callbacks = {
    onAddItemInCart: useCallback((item) => {
      store.addItemInCart(item);
    }, [store]),

    onIncreaseCountAndPrice: useCallback((item) => {
      store.increaseCountAndPrice(item);
    }, [store]),

    onDeleteItemInCart: useCallback((item) => {
      store.deleteItemInCart(item);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cart={cart} onDeleteItemInCart={callbacks.onDeleteItemInCart}/>
      <List list={list}
            onAddItemInCart={callbacks.onAddItemInCart}
            onIncreaseCountAndPrice={callbacks.onIncreaseCountAndPrice}
            />
    </PageLayout>
  );
}

export default App;
