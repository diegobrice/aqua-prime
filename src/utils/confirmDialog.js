import { confirmDialog } from '@/utils/primeComponents';

const accept = async (id, moduleName, callback) => {
  try {
    const res = await fetch(`/api/${moduleName}/${id}`, {
      method: 'DELETE',
    });
    callback();
  } catch (error) {
    console.log(error.message);
  }
};

const reject = () => {};

export const confirm = (id, moduleName, callback) => {
  confirmDialog({
    message: '¿Estas seguro de eliminar este item?',
    icon: 'pi pi-info-circle',
    defaultFocus: 'reject',
    acceptClassName: 'p-button-danger',
    accept: () => accept(id, moduleName, callback),
    reject,
  });
};
