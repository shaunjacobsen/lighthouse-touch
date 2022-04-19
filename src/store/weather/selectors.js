export function isLoading(state) {
  return state.weather?.loading;
}

export function getWeather(state) {
  return state.weather?.data;
}

export function getWeatherFetchedDate(state) {
  return state.weather?.fetched;
}
