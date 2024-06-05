import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';

import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const SingleComicPage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { getComic, getCharacter, clearError, process, setProcess } =
    useMarvelService();

  useEffect(() => {
    updateData();
    
    // eslint-disable-next-line
  }, [id]);

  const onComicLoaded = (data) => {
    setData(data);
  };

  const updateData = () => {
    clearError();

    switch (dataType) {
      case 'comic':
        getComic(id)
          .then(onComicLoaded)
          .then(() => setProcess('confirmed'));
        break;
      case 'character':
        getCharacter(id)
          .then(onComicLoaded)
          .then(() => setProcess('confirmed'));
        break;
      default:
        console.log('not found');
    }
  };

  return (
    <>
      <AppBanner />
      {setContent(process, Component, data)}
    </>
  );
};

export default SingleComicPage;
