import React from 'react';
import useSelector from '../../store/use-selector';
import {Link, useParams} from 'react-router-dom';
import './style.css';

function Pagination() {
  // получение массива страниц
  const count = useSelector(state => state.catalog.quentyPages);
  const numberPages = Array.from({length: count}, (_, index) => index + 1);

  // получение номера текущей страницы
  const activeUrl = useParams();
  const urlPage = activeUrl.pageNumber.split('_');
  const currentPage = Number(urlPage[urlPage.length - 1]);

  // массив страниц для рендера
  const activePages = numberPages.slice().splice(currentPage - 2, 3);

  const renderList = (number) => {
    switch(number) {
      case 1:
        return(
          <>
            <li key='2'>
              <Link to='page_2' className='Pagination-item'>2</Link>
            </li>
            <li key='3'>
              <Link to='page_3' className='Pagination-item'>3</Link>
            </li>
            <li>...</li>
          </>
        );
      case 2:
        return(
          <>
            <li key='2'>
              <Link to='page_2' className='Pagination-item Pagination-item--active'>2</Link>
            </li>
            <li key='3'>
              <Link to='page_3' className='Pagination-item'>3</Link>
            </li>
            <li>...</li>
          </>
        );
      case 3:
          return(
            <>
              <li key='2'>
                <Link to='page_2' className='Pagination-item'>2</Link>
              </li>
              <li key='3'>
                <Link to='page_3' className='Pagination-item Pagination-item--active'>3</Link>
              </li>
              <li key='4'>
                <Link to='page_4' className='Pagination-item'>4</Link>
              </li>
              <li>...</li>
            </>
          );
      case numberPages[numberPages.length - 1]:
        return(
          <>
            <li>...</li>
            <li key={numberPages[numberPages.length - 3]}>
              <Link to={`page_${numberPages[numberPages.length - 3]}`} className='Pagination-item'>{numberPages[numberPages.length - 3]}</Link>
            </li>
            <li key={numberPages[numberPages.length - 2]}>
              <Link to={`page_${numberPages[numberPages.length - 2]}`} className='Pagination-item'>{numberPages[numberPages.length - 2]}</Link>
            </li>
          </>
        );
      case numberPages[numberPages.length - 2]:
        return(
          <>
            <li>...</li>
            <li key={numberPages[numberPages.length - 3]}>
              <Link to={`page_${numberPages[numberPages.length - 3]}`} className='Pagination-item'>{numberPages[numberPages.length - 3]}</Link>
            </li>
            <li key={numberPages[numberPages.length - 2]}>
              <Link to={`page_${numberPages[numberPages.length - 2]}`} className='Pagination-item Pagination-item--active'>{numberPages[numberPages.length - 2]}</Link>
            </li>
          </>
        );
      case numberPages[numberPages.length - 3]:
        return(
          <>
            <li>...</li>
            <li key={numberPages[numberPages.length - 4]}>
              <Link to={`page_${numberPages[numberPages.length - 4]}`} className='Pagination-item'>{numberPages[numberPages.length - 4]}</Link>
            </li>
            <li key={numberPages[numberPages.length - 3]}>
              <Link to={`page_${numberPages[numberPages.length - 3]}`} className='Pagination-item Pagination-item--active'>{numberPages[numberPages.length - 3]}</Link>
            </li>
            <li key={numberPages[numberPages.length - 2]}>
              <Link to={`page_${numberPages[numberPages.length - 2]}`} className='Pagination-item'>{numberPages[numberPages.length - 2]}</Link>
            </li>
          </>
        );

      default:
        return(
          <>
          <li>...</li>
          {activePages.map(number => (
            <li key={number}>
              <Link to={`page_${number}`} className={currentPage === number ? 'Pagination-item Pagination-item--active' : 'Pagination-item'}>{number}</Link>
            </li>
          ))}
          <li>...</li>
          </>
        );
    }
  };

  return(
    <ul className='Pagination'>
      <li key='1'>
        <Link to='page_1' className={currentPage === 1 ? 'Pagination-item Pagination-item--active' : 'Pagination-item'}>1</Link>
      </li>
      {renderList(currentPage)}
      <li key={numberPages[numberPages.length - 1]}>
        <Link to={`page_${numberPages[numberPages.length - 1]}`} className={currentPage === numberPages[numberPages.length - 1] ? 'Pagination-item Pagination-item--active' : 'Pagination-item'}>{numberPages[numberPages.length - 1]}</Link>
      </li>
    </ul>
  );
}

export default Pagination;
