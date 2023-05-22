import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [ openCart, setOpenCart ] = useState(false);

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
    <>
      {openCart ? (
        <>
          <PageLayout>
            <Head title='Магазин'/>
            <Controls cart={cart} openCart={() => setOpenCart(!openCart)}/>
            <List list={list}
                  onAddItemInCart={callbacks.onAddItemInCart}
                  onIncreaseCountAndPrice={callbacks.onIncreaseCountAndPrice}
                  />
          </PageLayout>
          <Modal title='Корзина' close={() => setOpenCart(!openCart)}>
            <Cart cart={cart}
                  onDeleteItemInCart={callbacks.onDeleteItemInCart}
                  />
          </Modal>
        </>
      ):(
        <PageLayout>
          <Head title='Магазин'/>
          <Controls cart={cart} openCart={() => setOpenCart(!openCart)} />
          <List list={list}
                onAddItemInCart={callbacks.onAddItemInCart}
                onIncreaseCountAndPrice={callbacks.onIncreaseCountAndPrice}
                />
        </PageLayout>
      )}
    </>
  );
}

export default App;
