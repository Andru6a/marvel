import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner />;
    case 'loading':
      return newItemLoading ? <Component /> : <Spinner />;
    case 'confirmed':
      return <Component />;
    case 'error':
      return <ErrorMessage />;
    default:
      throw new Error('Unexpected process state');
  }
};

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, getAllCharacters, process, setProcess } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
    // window.addEventListener('scroll', onScroll);
    // return () => {
    // window.removeEventListener('scroll', onScroll);
    // };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (newItemLoading && !loading) {
      onRequest(offset);
    }
    // eslint-disable-next-line
  }, [newItemLoading]);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset)
      .then(onCharsLoaded)
      .then(() => setProcess('confirmed'));
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
        setNewItemLoading(false);
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

  const elements = useMemo(() => {
    return setContent(process, () => renderItems(charList), newItemLoading);
    // eslint-disable-next-line
  }, [process, charList]);

  return (
    <div className="char__list">
      {elements}
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
