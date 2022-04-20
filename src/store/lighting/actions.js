import axios from 'axios';
import { bridgeRequester } from '../../http/requesters';

export const fetchLightingRooms = () => {
  return async (dispatch) => {
    dispatch(fetchLightingRoomsStart());
    try {
      const request = await bridgeRequester.get('/rooms');
      if (request.status === 200) {
        const { data } = request;
        dispatch(fetchLightingRoomsSuccess({ data }));
      }
    } catch (e) {
      if (e.response) {
        dispatch(fetchLightingRoomsError(e.response.status));
      } else {
        dispatch(fetchLightingRoomsError('NETWORK_ERROR'));
      }
    }
  };
};

export const fetchLightingRoomsStart = () => {
  return {
    type: 'FETCH_LIGHTING_ROOMS_START',
  };
};
export const fetchLightingRoomsSuccess = ({ data }) => {
  return {
    type: 'FETCH_LIGHTING_ROOMS_SUCCESS',
    data,
  };
};

export const fetchLightingRoomsError = (error) => {
  return {
    type: 'FETCH_WEATHER_ERROR',
    error,
  };
};
