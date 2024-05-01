export const getModuleItem = async (module, id) => {
  const res = await fetch(`/api/${module}/${id}`);
  const data = await res.json();
  return data;
};

export const getModuleItems = async (module) => {
  const res = await fetch(`/api/${module}`);
  const data = await res.json();
  return data;
};

export const createModuleItem = async (module, item) => {
  const res = await fetch(`/api/${module}`, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
};

export const updateModuleItem = async (module, id, item) => {
  const res = await fetch(`/api/${module}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
