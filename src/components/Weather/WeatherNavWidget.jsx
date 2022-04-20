import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import { getIcon } from './WeatherOverview';

import './weather-nav-widget.scss';

import {
  getWeather,
  getWeatherFetchedDate,
  isLoading,
} from './../../store/weather/selectors';
import { fetchWeather as fetchWeatherAction } from './../../store/weather/actions';
import Loading from '../loading';

const WeatherNavWidget = (props) => {
  const { fetchWeather } = props;

  const isLoadingWeather = useSelector(isLoading);
  const weatherData = useSelector(getWeather);
  const weatherLastFetched = useSelector(getWeatherFetchedDate);

  useEffect(() => {
    if (!weatherLastFetched && !isLoadingWeather) {
      fetchWeather();
    }
  }, []);

  return (
    <div className="weather-nav-widget">
      {isLoadingWeather ? (
        <Loading />
      ) : (
        <div className="info">
          {getIcon(weatherData?.current.weather[0].icon)}&nbsp;
          {Math.round(weatherData?.current.temp)}&deg;
        </div>
      )}
    </div>
  );
};

const mapDispatch = (dispatch) => ({
  fetchWeather: () => dispatch(fetchWeatherAction()),
});

export default connect(null, mapDispatch)(WeatherNavWidget);
