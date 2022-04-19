const defaultState = {
  loading: false,
  error: null,
  fetched: null
}

export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_WEATHER_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_WEATHER_SUCCESS':
      return {
        fetched: action.fetched,
        data: action.data,
        loading: false,
        error: null,
      };
    case 'FETCH_WEATHER_ERROR':
      return {
        fetched: null,
        data: null,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
