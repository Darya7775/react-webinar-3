import React, {memo} from "react";
import {Outlet, Navigate} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';

function WrapperProfile() {

  const store = useStore();
  const token = JSON.parse(localStorage.getItem('token'));

useInit(() => {
    if(token) {
      store.actions.user.check(token);
    }
  }, [token]);

  const authorization = useSelector(state => state.user.authorization);

  // перенаправление на страницу авторизации
  if(!authorization) {
    return(<Navigate replace to='/login'/>);
  }

  return(
    <>
      <Outlet/>
    </>
  );
}

export default memo(WrapperProfile);
