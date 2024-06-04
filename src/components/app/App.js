// import React from "react";
import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import decoration from "../../resources/img/vision.png";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));

const App = () => {
  const location =useLocation();
  return (
    <div className="app">
      <AppHeader />
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="fade" timeout={600}>
          <main>
            <Suspense fallback={<Spinner />}>
              <Routes location={location}>
                <Route path="/marvel/comics" element={<ComicsPage />} />
                <Route path="/marvel/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic'/>} />
                <Route path="/marvel/character/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>} />
                <Route path="/marvel" element={<MainPage />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Suspense>
          </main>
        </CSSTransition>
      </TransitionGroup>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </div>
  );
};

export default App;
