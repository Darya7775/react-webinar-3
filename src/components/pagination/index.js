import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

function Pagination(props) {
  // получение массива страниц
  const numberPages = Array.from({length: props.quentyPages}, (_, index) => index + 1);

  // массив страниц для рендера
  const activePages = numberPages.slice().splice(props.currentPage - 2, 3);

  const callbacks = {
    onSavePage: () => props.saveCurrentPageNumbers()
  }

  const renderList = (number) => {
    switch(number) {
      case 1:
        return(
          <>
            <li key='2'>
              <Link to='/page_2' className='Pagination-item'>2</Link>
            </li>
            <li key='3'>
              <Link to='/page_3' className='Pagination-item'>3</Link>
            </li>
            <li>...</li>
          </>
        );
      case 2:
        return(
          <>
            <li key='2'>
              <Link to='/page_2' className='Pagination-item Pagination-item--active'>2</Link>
            </li>
            <li key='3'>
              <Link to='/page_3' className='Pagination-item'>3</Link>
            </li>
            <li>...</li>
          </>
        );
      case 3:
          return(
            <>
              <li key='2'>
                <Link to='/page_2' className='Pagination-item'>2</Link>
              </li>
              <li key='3'>
                <Link to='/page_3' className='Pagination-item Pagination-item--active'>3</Link>
              </li>
              <li key='4'>
                <Link to='/page_4' className='Pagination-item'>4</Link>
              </li>
              <li>...</li>
            </>
          );
      case numberPages[numberPages.length - 1]:
        return(
          <>
            <li>...</li>
            <li key={numberPages[numberPages.length - 3]}>
              <Link to={`/page_${numberPages[numberPages.length - 3]}`} className='Pagination-item'>{numberPages[numberPages.length - 3]}</Link>
            </li>
            <li key={numberPages[numberPages.length - 2]}>
              <Link to={`/page_${numberPages[numberPages.length - 2]}`} className='Pagination-item'>{numberPages[numberPages.length - 2]}</Link>
            </li>
          </>
        );
      case numberPages[numberPages.length - 2]:
        return(
          <>
            <li>...</li>
            <li key={numberPages[numberPages.length - 3]}>
              <Link to={`/page_${numberPages[numberPages.length - 3]}`} className='Pagination-item'>{numberPages[numberPages.length - 3]}</Link>
            </li>
            <li key={numberPages[numberPages.length - 2]}>
              <Link to={`/page_${numberPages[numberPages.length - 2]}`} className='Pagination-item Pagination-item--active'>{numberPages[numberPages.length - 2]}</Link>
            </li>
          </>
        );
      case numberPages[numberPages.length - 3]:
        return(
          <>
            <li>...</li>
            <li key={numberPages[numberPages.length - 4]}>
              <Link to={`/page_${numberPages[numberPages.length - 4]}`} className='Pagination-item'>{numberPages[numberPages.length - 4]}</Link>
            </li>
            <li key={numberPages[numberPages.length - 3]}>
              <Link to={`/page_${numberPages[numberPages.length - 3]}`} className='Pagination-item Pagination-item--active'>{numberPages[numberPages.length - 3]}</Link>
            </li>
            <li key={numberPages[numberPages.length - 2]}>
              <Link to={`/page_${numberPages[numberPages.length - 2]}`} className='Pagination-item'>{numberPages[numberPages.length - 2]}</Link>
            </li>
          </>
        );

      default:
        return(
          <>
          <li>...</li>
          {activePages.map(number => (
            <li key={number}>
              <Link
                to={`/page_${number}`}
                onClick={callbacks.onSavePage}
                className={props.currentPage === number ? 'Pagination-item Pagination-item--active' : 'Pagination-item'}>{number}</Link>
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
        <Link onClick={callbacks.onSavePage} to='/page_1' className={props.currentPage === 1 ? 'Pagination-item Pagination-item--active' : 'Pagination-item'}>1</Link>
      </li>
      {renderList(props.currentPage)}
      <li key={numberPages[numberPages.length - 1]}>
        <Link onClick={callbacks.onSavePage} to={`/page_${numberPages[numberPages.length - 1]}`} className={props.currentPage === numberPages[numberPages.length - 1] ? 'Pagination-item Pagination-item--active' : 'Pagination-item'}>{numberPages[numberPages.length - 1]}</Link>
      </li>
    </ul>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  quentyPages: PropTypes.number,
  onSavePage: PropTypes.func,
};

Pagination.defaultProps = {
  onSavePage: () => {},
}

export default Pagination;
