import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import ErrorMesage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import "./comicsList.scss";

const ComicsList = (props) => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset)
      .then(onComicsLoaded);
  };

  const onComicsLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setOffset((offset) => offset + 8);
    setNewItemLoading(false);
    setCharEnded(ended);
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }
      return (
        <li className="comics__item" key={i}>
          <a href="#">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
              style={imgStyle}
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </a>
        </li>
      );
    });
    return <ul className="comics__grid">{items}</ul>;
  }

  const errorMessage = error ? <ErrorMesage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  const items = renderItems(comicsList);

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}

      <button
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
