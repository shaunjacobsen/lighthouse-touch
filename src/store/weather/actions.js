import axios from 'axios';
import { serverRequester } from '../../http/requesters';

export const fetchWeather = (t) => {
  return async (dispatch) => {
    dispatch(fetchWeatherStart());
    try {
      const request = await serverRequester.get('/weather');
      if (request.status === 200) {
        const { data } = request;
        dispatch(fetchWeatherSuccess({ data, fetched: Date.now() }));
      }
    } catch (e) {
      if (e.response) {
        dispatch(fetchWeatherError(e.response.status));
      } else {
        dispatch(fetchWeatherError('NETWORK_ERROR'));
      }
    }
  };
};

export const fetchWeatherStart = () => {
  return {
    type: 'FETCH_WEATHER_START',
  };
};
export const fetchWeatherSuccess = ({ data, fetched }) => {
  return {
    type: 'FETCH_WEATHER_SUCCESS',
    data,
    fetched,
  };
};

export const fetchWeatherError = (error) => {
  return {
    type: 'FETCH_WEATHER_ERROR',
    error,
  };
};
