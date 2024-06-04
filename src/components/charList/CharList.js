import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './charList.scss';

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
    // window.addEventListener('scroll', onScroll);
    return () => {
      // window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (newItemLoading && !loading) {
      onRequest(offset);
    }
  }, [newItemLoading]);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset)
      .then(onCharsLoaded)
      .finally(() => setNewItemLoading(false));
  };

  const onCharsLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    const addChar = (index) => {
      if (index < newCharList.length) {
        setCharList((charList) => [...charList, newCharList[index]]);
        setTimeout(() => addChar(index + 1), 100);
      } else {
        setOffset((offset) => offset + newCharList.length);
        setCharEnded(ended);
      }
    };
    addChar(0);
  };

  // const onScroll = () => {
  //   if (newItemLoading) return;
  //   if (charEnded) {
  //     window.removeEventListener('scoll', onScroll);
  //   }
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //     // onCharListLoading();
  //     setNewItemLoading(true);
  //   }
  // };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) => {
      item.classList.remove('char__item_selected');
    });
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: 'cover' };
      if (
        item.thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        imgStyle = { objectFit: 'unset' };
      }

      return (
        <CSSTransition timeout={500} classNames="char__item" key={item.id}>
          <li
            className="char__item"
            key={item.id}
            ref={(el) => (itemRefs.current[i] = el)}
            onClick={() => {
              props.onCharSelected(item.id);
              focusOnItem(i);
            }}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                props.onCharSelected(item.id);
                focusOnItem(i);
              }
            }}
            tabIndex={0}
          >
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
            <div className="char__name">{item.name}</div>
          </li>
        </CSSTransition>
      );
    });
    return (
      <TransitionGroup component={'ul'} className="char__grid">
        {items}
      </TransitionGroup>
    );
  }

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        onClick={() => setNewItemLoading(true)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
