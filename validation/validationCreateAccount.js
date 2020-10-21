export default function validationCreateAccount(values) {
  const { name, email, password } = values;
  let errors = {};

  // validation user name
  if (!name) {
    errors.name = 'El nombre es obligatorio';
  };

  // validation user email

  if (!email) {
    errors.email = 'El email es obligatorio';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    error.email = 'Email no válido';
  };

  // validation password user

  if (!password) {
    errors.password = 'El password es obligatorio';
  }else if (password.length < 6) {
    errors.password = 'El password debe ser de al menos 6 caracteres';
  };
  
  return errors;
};