import * as yup from 'yup';

export const clientCategoryValidationSchema = yup.object({
  name: yup
    .string()
    .required('El tipo de cliente es requerido.')
    .min(3, 'El tipo de cliente debe tener un mínimo de 3 caracteres.')
    .max(30, 'El tipo de cliente debe tener un máximo de 30 caracteres.'),
});
