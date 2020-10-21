import React, { useState, useEffect } from 'react';

// initialState= estado inicial para el form
// validation = Es una función que va a tener todas las reglas de validación dependiendo del form
// fn = función que queremos que se ejecute dependiendo del compnente donde usemos el hookcuando hagamos submit
const useValidationForm = (initialState, validation, fn) => {
  const [values, setValues] = useState(initialState);
  const [errors, setError] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const validationError = Object.keys(errors).length === 0;

      if (validationError) {
        // fn = función que se ejecuta en cada componente del form
        fn();
      }
      // reiniciar el valor de submitForm para que no se siga ejecutando en otro uso
        setSubmitForm(false);

    }
  }, [errors]);

  //  Function change de los input type text.
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  // Function submit of form
  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validation(values); 
    setError(errors);
    setSubmitForm(true);
  }

  // Function onBlur
  const handleBlur = () => {
    const errors = validation(values); 
    setError(errors);
  }

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}
 
export default useValidationForm;