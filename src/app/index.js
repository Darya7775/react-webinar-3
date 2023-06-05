import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import WrapperProfile from '../containers/wrapper-profile';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>

        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>

        <Route element={<WrapperProfile/>}>
          <Route path={'/profile'} element={<Profile/>}/>
        </Route>

      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
