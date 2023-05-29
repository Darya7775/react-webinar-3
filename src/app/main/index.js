import {memo, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Item from '../../components/item';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import Navigation from '../../components/navigation';
import Wrapper from '../../components/wrapper';
import Spinner from '../../components/spinner';

function Main() {

  const store = useStore();

  // получение номера текущей страницы
  const activeUrl = useParams();
  const urlPage = activeUrl.pageNumber.split('_');
  const currentPage = Number(urlPage[urlPage.length - 1]);

  useEffect(() => {
    store.actions.catalog.load(currentPage - 1, currentPage);
  }, [currentPage]);

  const status = useSelector(state => state.catalog.status);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const quentyPages = useSelector(state => state.catalog.quentyPages);
  const numberCurrentPage = useSelector(state => state.catalog.numberPage);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const urlItem = `/articles/`;

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} parentUrl={urlItem}/>
    }, [callbacks.addToBasket]),
  };

  let content;
  if(status === 'loading') {
    content = <Spinner text='Loading'/>;
  } else {
    content = <>
                <List list={select.list} renderItem={renders.item}/>
                <Pagination quentyPages={quentyPages} currentPage={numberCurrentPage} />
              </>
  }

  return (
    <>
      <Head title='Магазин'/>
      <Wrapper>
        <Navigation />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      </Wrapper>
      {content}
    </>
  );
}

export default memo(Main);
