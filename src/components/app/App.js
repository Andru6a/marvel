// import React from "react";
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import decoration from "../../resources/img/vision.png";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

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
                <Route path="/comics" element={<ComicsPage />} />
                <Route path="/comics/:comicId" element={<SingleComicPage />} />
                <Route path="/" element={<MainPage />} />
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
