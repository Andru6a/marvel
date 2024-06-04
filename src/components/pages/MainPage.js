import { useState } from 'react';
import { Helmet } from 'react-helmet';

import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import CharFind from '../charFind/CharFind';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const MainPage = () => {
  const [selecedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div className="sticky">
          <ErrorBoundary>
            <CharInfo charId={selecedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharFind />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default MainPage;
