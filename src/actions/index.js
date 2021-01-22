// ActionCreator
const GETWEATHER = 'GETWEATHER';
export default function getWeather(data) {
  return {
    type: GETWEATHER,
    data
  };
}
