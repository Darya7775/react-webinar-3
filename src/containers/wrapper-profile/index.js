import React, {memo} from "react";
import {Outlet, Navigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function WrapperProfile() {

  const authorization = useSelector(state => state.authorization.authorization);

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
