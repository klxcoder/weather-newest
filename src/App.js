import Details from './components/weatherByDay/WeatherByDay';
import Home from './components/home/Home';

import {
  hour,
  minute,
  year,
  amPm,
  date,
  day,
  month,
  toDay,
} from './contansts/contansts';

function App() {
  return (
    <div className="App">
      <div className="wapperAppWeather">
        <Home hour={hour} minute={minute} year={year} amPm={amPm} date={date} day={day} month={month} toDay={toDay} />
        <Details />
      </div>
    </div>
  );
}

export default App;
