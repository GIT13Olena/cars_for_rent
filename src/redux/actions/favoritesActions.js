export const addToFavorites = (car) => {
  return {
    type: 'ADD_TO_FAVORITES',
    payload: car,
  };
};

export const removeFromFavorites = (car) => {
  return {
    type: 'REMOVE_FROM_FAVORITES',
    payload: car,
  };
};

export const setFavorites = (favorites) => {
  return {
    type: 'SET_FAVORITES',
    payload: favorites,
  };
};