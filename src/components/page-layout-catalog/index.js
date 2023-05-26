import {memo} from 'react';
import {Outlet} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import Pagination from '../../components/pagination';
import './style.css';

function PageLayoutCatalog({head, footer}) {

  const cn = bem('PageLayoutCatalog');

  return (
    <div className={cn()}>
      <header className={cn('head')}>
        {head}
      </header>
      <main className={cn('center')}>
        <Outlet />
        <Pagination/>
      </main>
      <footer className={cn('footer')}>
        {footer}
      </footer>
    </div>
  );
}

export default memo(PageLayoutCatalog);
