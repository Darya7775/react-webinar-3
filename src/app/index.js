import {useCallback, useContext, useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import PageLayout from '../components/page-layout';
import Main from "./main";
import Basket from "./basket";
import OneProduct from './one-product';
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  let {pageNumber} = useParams();
  console.log(pageNumber)

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PageLayout />}>

          <Route path=":pageNumber" element={
            <>
              <Main />
              {activeModal === 'basket' && <Basket />}
            </>}
          />

          <Route path="/articles/:id" element={
            <>
              <OneProduct />
              {activeModal === 'basket' && <Basket />}
            </>}
          />

        </Route>

       { /* перенаправление со страницы "/" на "/page_1" */}
        <Route path="/" element={<Navigate replace to="/page_1" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
