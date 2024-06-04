import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';

import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';

import ErrorMesage from '../errorMessage/ErrorMessage';

import './charFind.scss';

const CharForm = () => {
  const [oneChar, setNameChar] = useState(null);
  const { error, getCharacterByName, clearError } = useMarvelService();

  const charNotFind =
    typeof oneChar === 'string' ? (
      <div className="char__form-info">{oneChar}</div>
    ) : null;
  const errorMessage = error && !charNotFind ? <ErrorMesage /> : null;
  const content = oneChar && !charNotFind ? <View oneChar={oneChar} /> : null;

  return (
    <Formik
      initialValues={{ text: '' }}
      validationSchema={Yup.object({
        text: Yup.string().required('This field is required'),
      })}
      onSubmit={async (value, { setSubmitting }) => {
        clearError();
        await getCharacterByName(value.text).then((char) => setNameChar(char));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="char__form">
          <label className="char__form-text" htmlFor="text">
            Or find a character by name:
          </label>
          <Field
            className="char__form-field"
            type="text"
            name="text"
            placeholder="Enter name"
          />
          <button
            className="char__form-button button button__main"
            type="submit"
            disabled={isSubmitting}
          >
            <div className="inner">Find</div>
          </button>
          <FormikErrorMessage
            className="char__form-info"
            name="text"
            component="div"
          />
          {errorMessage ? (
            <div style={{ 'margin-top': '10px' }}>{errorMessage}</div>
          ) : null}
          {charNotFind}
          {content}
        </Form>
      )}
    </Formik>
  );
};

const View = ({ oneChar }) => {
  const { name, id } = oneChar;

  return (
    <div className="char__form-info">
      <p style={{ color: '#03710E' }}>There is! Visit {name} page?</p>
      <Link to={`/marvel/character/${id}`}>
        <div className="button button__secondary" type="submit">
          <div className="inner">TO PAGE</div>
        </div>
      </Link>
    </div>
  );
};

export default CharForm;
