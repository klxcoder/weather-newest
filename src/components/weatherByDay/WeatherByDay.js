import React, { useState } from 'react';
import styles from './WeatherByDay.module.scss';
import LineChart from '../lineChart/LineChart';
import { useDispatch, useSelector } from 'react-redux';
import { toDay, daysOfWeek } from '../../contansts/contansts';
import { API_FETCH_REQUEST } from '../../contansts/contansts';

// import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Details = () => {
  const [colorCurrentWeather, setColorCurrentWeather] = useState(toDay);

  const data = useSelector((state) => state.api);
  const dispatch = useDispatch();

  // handle weather changes during the week
  const handleRenderWeatherByDay = (index) => {
    dispatch(
      API_FETCH_REQUEST({ id: index, nameCity: data.detalsWeather.name })
    );
    setColorCurrentWeather(index);
  };

  // setting slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };

  return (
    <div className={styles.wapper}>
      <div>
        <LineChart index={colorCurrentWeather} />
      </div>

      <div className={styles.weatherByDay}>
        <ul>
          {/* <Slider {...settings}> */}
          {data.weekWeather.map((weatherDay, index) => (
            <li
              className={colorCurrentWeather === index ? styles.active : ''}
              key={index}
              onClick={() => handleRenderWeatherByDay(index)}
            >
              <h3>{daysOfWeek[index]}</h3>
              <div className={styles.photo}>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherDay?.weather[0].icon}@2x.png`}
                ></img>
              </div>
              <div className={styles.title}>Humidity</div>
              <div className={styles.humidity}>
                {weatherDay?.main.humidity}%
              </div>
            </li>
          ))}
          {/* </Slider> */}
        </ul>
      </div>
    </div>
  );
};

export default Details;
