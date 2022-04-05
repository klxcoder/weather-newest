import {convertCtoF} from '../services/utils';

const initState = {
  weekWeather: [],
  detalsWeather: {},
  messageError: false,
};

const apiReducer = (state = initState, action) => {
  switch (action.type) {
    case 'API_FETCH_SUCCEEDED':
      const { list, id, city } = action.payload;
      return {
        weekWeather: action.payload.list,
        detalsWeather: {
          name: city.name,
          tempC: list[id].main.temp.toFixed(0),
          tempF: convertCtoF(list[id].main.temp).toFixed(0),
          icon: list[id].weather[0].icon,
          humidity: list[id].main.humidity,
          windSpeed: list[id].wind.speed.toFixed(1),
        },
        messageError: false,
      };
    case 'API_FETCH_FAILED':
      return {
        ...state,
        messageError: true,
      };
    default:
      return state;
  }
};

export default apiReducer;
