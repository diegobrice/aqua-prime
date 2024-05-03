import * as yup from 'yup';

export const clientCategoryValidationSchema = yup.object({
  name: yup
    .string()
    .required('El tipo de cliente es requerido.')
    .min(3, 'El tipo de cliente debe tener un mínimo de 3 caracteres.'),
});

export const clientValidationSchema = yup.object({
  name: yup
    .string()
    .required('El nombre del cliente es requerido.')
    .min(3, 'El nombre del cliente debe tener un mínimo de 3 caracteres.'),
  address: yup
    .string()
    .required('La dirección del cliente es requerida.')
    .min(3, 'La dirección del cliente debe tener un mínimo de 3 caracteres.'),
  clientCategory: yup
    .object()
    .required('Debes seleccionar un tipo de cliente'),
});
