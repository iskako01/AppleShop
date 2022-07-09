export const addDataToLocalStorage = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

export const getDataFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return [];
};
