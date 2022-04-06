import React, { memo, useEffect, useLayoutEffect, useState } from 'react';
import styles from './Home.module.scss';
import clsx from 'clsx';
import { BiSearchAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { API_FETCH_REQUEST } from '../../contansts/contansts';
import TemperatureSwitch from '../temperatureSwitch/TemperatureSwitch';
import { useStore } from '../../store';
import {
  hour,
  minute,
  year,
  amPm,
  date,
  day,
  month,
  toDay,
} from '../../contansts/contansts';

const Home = () => {
  const [valueInput, setValueInput] = useState();
  const [weatherDay, setWeatherDay] = useState(0);
  const [rainNotification, setRainNotification] = useState(false);

  const [temperatureSwitch, setTemperatureSwitch] = useStore();

  // request api
  useEffect(() => {
    dispatch(API_FETCH_REQUEST({ id: toDay, nameCity: 'ha noi' }));
  }, []);

  // redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state.api);

  // handle weather if it rains
  useEffect(() => {
    if (data.detalsWeather.icon == '10n' || data.detalsWeather.icon == '10d') {
      setRainNotification(true);
    } else {
      setRainNotification(false);
    }
  }, [data]);

  // click icon search ---> submit city name and id-(day of the week)
  const handleCitySearch = () => {
    dispatch(API_FETCH_REQUEST({ id: weatherDay, nameCity: valueInput }));
  };

  // input value when searching
  const handleSearchValue = (e) => {
    setValueInput(e.target.value);
    // user import input --> remote error
    data.messageError = false;
  };

  // click enter ---> search ( hide )
  // const handleEnterSearch = (e) => {
  //   if (e.key === 'Enter') {
  //     dispatch(API_FETCH_REQUEST({ id: weatherDay, nameCity: valueInput }));
  //   }
  // };

  return (
    <div className={styles.homeWeather}>
      <TemperatureSwitch />
      <div className={styles.boxSearch}>
        <div
          className={clsx(
            styles.inputSearch,
            data.messageError ? styles.colorError : ''
          )}
        >
          <BiSearchAlt onClick={handleCitySearch} aria-label="searchBtn" />
          <input
            value={valueInput || ''}
            onChange={(e) => handleSearchValue(e)}
            placeholder="Search for places ..."
            aria-label="cost-input"
          // onKeyDown={(e) => handleEnterSearch(e)}
          />
        </div>

        {/* Notification */}
        {data.messageError && (
          <div className={styles.notFoundCity} data-testid="a" aria-label="a">
            {valueInput} city not found
          </div>
        )}
      </div>

      <div className={styles.presentTime}>
        <span className={styles.hour}>
          {hour}:{minute} {amPm},
        </span>
        <span className={styles.week}>{day}, </span>
        <span className={styles.month}>
          {month} {date},
        </span>
        <span className={styles.year}>{year}</span>
        {/* Notification */}
        {rainNotification && (
          <div className={styles.rainNotification}>
            Trời có mưa, hãy mang theo dù!
          </div>
        )}
      </div>

      <div className={styles.weatherInfo}>
        <div className={styles.mainInfo}>
          <div className={styles.currentWeatherPhoto}>
            <img
              src={`http://openweathermap.org/img/wn/${data.detalsWeather.icon}@2x.png`}
            ></img>
          </div>

          {/* handle °C <--> °F */}
          {temperatureSwitch ? (
            <div data-testid="temp" className={styles.temperatureF}>
              {data.detalsWeather.tempF}
            </div>
          ) : (
            <div className={styles.temperatureC}>
              {data.detalsWeather.tempC}
            </div>
          )}
        </div>

        <h1 className={styles.nameCity} aria-label="nameCity">
          {data.detalsWeather.name}
        </h1>

        <div className={styles.infoSupplement}>
          <div className={styles.humidity}>
            <h3 data-testid="test">Humidity</h3>
            <div className={styles.parameter}>
              {data.detalsWeather.humidity}
            </div>
          </div>

          <div className={styles.windSpeed}>
            <h3>Wind speed</h3>
            <div className={styles.parameter}>
              {data.detalsWeather.windSpeed} km/h
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
