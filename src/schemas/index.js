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
  clientCategory: yup.object().required('Debes seleccionar un tipo de cliente'),
});

export const productCategoryValidationSchema = yup.object({
  name: yup
    .string()
    .required('El tipo de producto es requerido.')
    .min(3, 'El tipo de producto debe tener un mínimo de 3 caracteres.'),
});

export const productValidationSchema = yup.object({
  name: yup
    .string()
    .required('El nombre del producto es requerido.')
    .min(3, 'El nombre del producto debe tener un mínimo de 3 caracteres.'),
  description: yup
    .string()
    .required('La descripción del producto es requerida.')
    .min(
      3,
      'La descripción del producto debe tener un mínimo de 3 caracteres.'
    ),
  productCategory: yup
    .object()
    .required('Debes seleccionar un tipo de producto'),
  price: yup
    .number()
    .positive()
    .required('El precio del producto es requerido.'),
});

export const productDiscountValidationSchema = yup.object({
  product: yup.object().required('El nombre del producto es requerido.'),
  clientCategory: yup.object().required('El tipo de cliente es requerido.'),
  discountedPrice: yup
    .number()
    .positive()
    .required('El nuevo precio es requerido.'),
});

export const orderValidationSchema = yup.object({
  client: yup.object(),
  products: yup.array().of(yup.object()),
  status: yup.string(),
  createdDate: yup.string(),
  deliveredDate: yup.string(),
  observations: yup.string(),
});
