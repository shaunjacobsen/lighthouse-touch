const defaultState = {
  loading: false,
  rooms: null,
  error: null,
}

export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_LIGHTING_ROOMS_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_LIGHTING_ROOMS_SUCCESS':
      return {
        rooms: action.data,
        loading: false,
        error: null,
      };
    case 'FETCH_LIGHTING_ROOMS_ERROR':
      return {
        data: null,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
