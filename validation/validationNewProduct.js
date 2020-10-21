export default function validationNewProduct(values) {

  let errors = {};

  // Validar el nombre del usuario
  if(!values.name) {
      errors.name = "El Nombre es obligatorio";
  }

  // validar empresa
  if(!values.company) {
      errors.company = "Nombre de Empresa es obligatorio"
  }
  
  // validar la url
  if(!values.url) {
      errors.url = 'La URL del producto es obligatoria';
  } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(values.url) ) {
      errors.url = "URL mal formateada o no válida"
  }

  // validar descripción.
  if(!values.description) {
      errors.description = "Agrega una descripción de tu producto"
  }


  return errors;
}