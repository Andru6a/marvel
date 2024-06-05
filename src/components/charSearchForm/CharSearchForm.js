import { useState } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from 'formik';
import * as Yup from 'yup';

import useMarvelService from '../../services/MarvelService';
import { ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

import './charSearchForm.scss';

const CharForm = () => {
  const [oneChar, setNameChar] = useState(null);
  const { getCharacterByName, clearError, process, setProcess } =
    useMarvelService();

  const errorMessage = process === 'error' ? <ErrorMessage /> : null;
  const results = !oneChar ? null : oneChar.length > 0 ? (
    <div className="char__form-info">
      <p style={{ color: '#03710E' }}>There is! Visit {oneChar[0].name} page?</p>
      <Link to={`/marvel/character/${oneChar[0].id}`}>
        <div className="button button__secondary" type="submit">
          <div className="inner">TO PAGE</div>
        </div>
      </Link>
    </div>
  ) : (
    <div className="char__form-info">
      The character was not found. Check the name and try again
    </div>
  );

  return (
    <Formik
      initialValues={{ text: '' }}
      validationSchema={Yup.object({
        text: Yup.string().required('This field is required'),
      })}
      onSubmit={async (value, { setSubmitting }) => {
        clearError();
        await getCharacterByName(value.text)
          .then((char) => setNameChar(char))
          .then(() => setProcess('confirmed'));
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
          {results}
          {errorMessage}
        </Form>
      )}
    </Formik>
  );
};

// const View = ({ data }) => {
//   const { name, id } = data;

//   return (
//     <div className="char__form-info">
//       <p style={{ color: '#03710E' }}>There is! Visit {name} page?</p>
//       <Link to={`/marvel/character/${id}`}>
//         <div className="button button__secondary" type="submit">
//           <div className="inner">TO PAGE</div>
//         </div>
//       </Link>
//     </div>
//   );
// };

export default CharForm;
