import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';

import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


const SingleComicPage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { loading, error, getComic, getCharacter, clearError } =
    useMarvelService();

  useEffect(() => {
    updateData();
  }, [id]);

  const onComicLoaded = (data) => {
    setData(data);
  };

  const updateData = () => {
    clearError();

    switch (dataType) {
      case 'comic':
        getComic(id).then(onComicLoaded);
        break;
      case 'character':
        getCharacter(id).then(onComicLoaded);
        break;
      default:
        console.log('not found');
    }
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !data) ? (
    <Component data={data} />
  ) : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

// const View = ({ comic }) => {
//   const { title, description, pageCount, thumbnail, price, language } = comic;
//   return (
//     <div className="single-comic">
//       <img src={thumbnail} alt={title} className="single-comic__img" />
//       <div className="single-comic__info">
//         <h2 className="single-comic__name">{title}</h2>
//         <p className="single-comic__descr">{description}</p>
//         <p className="single-comic__descr">{pageCount}</p>
//         <p className="single-comic__descr">language:{language}</p>
//         <div className="single-comic__price">{price}</div>
//       </div>
//       <Link to="marvel/comics" className="single-comic__back">
//         Back to all
//       </Link>
//     </div>
//   );
// };

export default SingleComicPage;
