import {memo, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Item from '../../components/item';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Main() {

  const store = useStore();

  const activeUrl = useParams();
  const arNumberPage = activeUrl.pageNumber.split('_');
  const number = Number(arNumberPage[arNumberPage.length - 1]) - 1;

  useEffect(() => {
    store.actions.catalog.load(number);
  }, [number]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  console.log('main')

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
    </>

  );
}

export default memo(Main);
