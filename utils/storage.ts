export const saveToLocalStorage = (key: string, value: any) => {
  try {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
};

export const getFromLocalStorage = (key: string) => {
  try {
    const stringValue = localStorage.getItem(key);
    if (stringValue) {
      const parsedValue = JSON.parse(stringValue);
      return parsedValue;
    }
    return null;
  } catch (error) {
    console.error("Failed to retrieve from localStorage:", error);
    return null;
  }
};

export const removeFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to remove from localStorage:", error);
  }
};
