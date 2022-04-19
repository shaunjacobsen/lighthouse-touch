import React, { useEffect } from 'react';
import { BarChart, XAxis, Bar } from 'recharts';
import moment from 'moment';
import { connect, useSelector } from 'react-redux';
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiRain,
  WiNightAltRain,
  WiStormShowers,
  WiNightAltLightning,
  WiSnow,
  WiNightSnow,
  WiFog,
  WiNightFog,
  WiThermometerExterior,
  WiThermometer,
  WiSunrise,
  WiSunset,
} from 'react-icons/wi';
import { GiPartyPopper } from 'react-icons/gi';

import './weather-overview.scss';
import {
  getWeather,
  getWeatherFetchedDate,
  isLoading,
} from '../../store/weather/selectors';
import { fetchWeather as fetchWeatherAction } from './../../store/weather/actions';

function convertTimePrecipitationArrayToChartFormat(data) {
  if (!data) return;
  return data.map((d) => {
    return {
      time: moment(d.dt),
      precipitation: d.precipitation,
    };
  });
}

export function getIcon(weatherCode) {
  switch (weatherCode) {
    case '01d':
      return <WiDaySunny style={{ color: 'gold' }} />;
    case '01n':
      return <WiNightClear />;
    case '02d':
      return <WiDayCloudy />;
    case '02n':
      return <WiNightAltCloudy />;
    case ('03d', '04d', '03n', '04n'):
      return <WiCloud />;
    case ('09d', '10d'):
      return <WiRain />;
    case ('09n', '10n'):
      return <WiNightAltRain />;
    case '11d':
      return <WiStormShowers />;
    case '11n':
      return <WiNightAltLightning />;
    case '13d':
      return <WiSnow />;
    case '13n':
      return <WiNightSnow />;
    case '50d':
      return <WiFog />;
    case '50n':
      return <WiNightFog />;
    default:
      break;
  }
}

const WeatherOverview = ({ fetchWeather }) => {
  const weather = useSelector(getWeather);
  const isWeatherLoading = useSelector(isLoading);
  const weatherFetched = useSelector(getWeatherFetchedDate);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchWeather();
    }, 300000);

    return () => {
      clearInterval(interval);
    };
  }, [isWeatherLoading]);

  return (
    <div className="buienradar-widget-container">
      <iframe
        src={`https://gadgets.buienradar.nl/gadget/zoommap/?lat=${process.env.REACT_APP_HOME_COORDS_LAT}&lng=${process.env.REACT_APP_HOME_COORDS_LON}&overname=2&zoom=11&naam=${process.env.REACT_APP_POSTCODE}&size=2&voor=1`}
        scrolling="no"
        width="256"
        height="256"
        frameBorder="no"
      ></iframe>
      <div className="conditions">
        <div className="current">
          {getIcon(weather?.current.weather[0].icon)}
          <div className="text-conditions">
            <div className="temperatures">
              <div className="real">
                {Math.round(weather?.current.temp * 10) / 10}&deg;
              </div>
              <div className="high-low">
                <div className="high">
                  <WiThermometer />
                  {Math.round(weather?.daily[0].temp.max)}&deg;
                </div>
                <div className="low">
                  <WiThermometerExterior />
                  {Math.round(weather?.daily[0].temp.min)}&deg;
                </div>
              </div>
              <div className="rain-today">
                <WiRain style={{ fontSize: '1.5rem' }} />
                &nbsp;
                {weather?.daily[0].pop * 100}%
              </div>
            </div>
            <div className="description">
              {weather?.current.weather[0].description}
            </div>
          </div>
        </div>
        <div className="rain-forecast">
          {weather?.minutely.every((d) => d.precipitation === 0) ? (
            <div className="no-rain">
              <GiPartyPopper />
              Geen regen verwacht!
            </div>
          ) : (
            <div>
              <BarChart
                width={220}
                height={50}
                barCategoryGap={0}
                data={convertTimePrecipitationArrayToChartFormat(
                  weather?.minutely,
                )}
              >
                <XAxis dataKey="time" height={0} />
                <Bar dataKey="precipitation" fill="#40DFEF" />
              </BarChart>
              <div className="x-axis">
                <div>Nu</div>
                <div>{moment().add(30, 'minutes').format('HH:mm')}</div>
                <div>{moment().add(60, 'minutes').format('HH:mm')}</div>
              </div>
            </div>
          )}
        </div>
        <div className="misc">
          <div className="sun">
            <WiSunrise />
            &nbsp;
            <div>{moment(weather?.current.sunrise, 'X').format('HH:mm')}</div>
          </div>
          <div className="sun">
            <WiSunset />
            &nbsp;
            <div>{moment(weather?.current.sunset, 'X').format('HH:mm')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatch = (dispatch) => ({
  fetchWeather: () => dispatch(fetchWeatherAction()),
});

export default connect(null, mapDispatch)(WeatherOverview);
