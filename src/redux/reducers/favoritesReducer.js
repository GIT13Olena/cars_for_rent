
const initialState = {
  favoriteCars: JSON.parse(localStorage.getItem('favoriteCars')) || [],
};

const favoritesReducer = (state = initialState, action) => {
  console.log('favoritesReducer called with state:', state, 'and action:', action);
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
  const newCar = action.payload;
  if (!state.favoriteCars.some((car) => car.id === newCar.id)) {
    const updatedFavoriteCars = [...state.favoriteCars, newCar];
    localStorage.setItem('favoriteCars', JSON.stringify(updatedFavoriteCars));
    return {
      ...state,
      favoriteCars: updatedFavoriteCars,
    };
  }
  return state;
    case 'REMOVE_FROM_FAVORITES':
      const removedCar = action.payload;
      const updatedFavoriteCars = state.favoriteCars.filter((car) => car.id !== removedCar.id);
      localStorage.setItem('favoriteCars', JSON.stringify(updatedFavoriteCars));
      return {
        ...state,
        favoriteCars: updatedFavoriteCars,
      };

      case 'SET_FAVORITES':
      return {
        ...state,
        favoriteCars: action.payload,
      };

    default:
      return state;
  }
};

export default favoritesReducer;

