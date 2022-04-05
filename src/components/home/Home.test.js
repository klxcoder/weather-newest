import React from "react";
import store from '../../redux/store';
import { Provider } from 'react-redux';
import { StoreProvider } from '../../store';
import axios from 'axios';
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';
import Home from "./Home";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

jest.mock('axios');

const Wrapper = <Provider store={store}>
  <StoreProvider>
    <Home />
  </StoreProvider>
</Provider>

describe('test Fetch', () => {
  test("render Home without crashing", async () => {
    const data = { "cod": "200", "message": 0, "cnt": 7, "list": [{ "dt": 1649073600, "main": { "temp": 25, "feels_like": 25.07, "temp_min": 20.01, "temp_max": 25, "pressure": 1019, "sea_level": 1019, "grnd_level": 1018, "humidity": 58, "temp_kf": 4.99 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "clouds": { "all": 7 }, "wind": { "speed": 4.87, "deg": 139, "gust": 8.65 }, "visibility": 10000, "pop": 0, "sys": { "pod": "n" }, "dt_txt": "2022-04-04 12:00:00" }, { "dt": 1649084400, "main": { "temp": 22.77, "feels_like": 22.75, "temp_min": 18.32, "temp_max": 22.77, "pressure": 1020, "sea_level": 1020, "grnd_level": 1020, "humidity": 63, "temp_kf": 4.45 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "clouds": { "all": 7 }, "wind": { "speed": 3.29, "deg": 150, "gust": 7.43 }, "visibility": 10000, "pop": 0, "sys": { "pod": "n" }, "dt_txt": "2022-04-04 15:00:00" }, { "dt": 1649095200, "main": { "temp": 20.04, "feels_like": 19.95, "temp_min": 17.56, "temp_max": 20.04, "pressure": 1020, "sea_level": 1020, "grnd_level": 1019, "humidity": 71, "temp_kf": 2.48 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "clouds": { "all": 7 }, "wind": { "speed": 2.07, "deg": 170, "gust": 3.47 }, "visibility": 10000, "pop": 0, "sys": { "pod": "n" }, "dt_txt": "2022-04-04 18:00:00" }, { "dt": 1649106000, "main": { "temp": 17.18, "feels_like": 17.04, "temp_min": 17.18, "temp_max": 17.18, "pressure": 1020, "sea_level": 1020, "grnd_level": 1019, "humidity": 80, "temp_kf": 0 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "clouds": { "all": 7 }, "wind": { "speed": 0.85, "deg": 142, "gust": 1.04 }, "visibility": 10000, "pop": 0, "sys": { "pod": "n" }, "dt_txt": "2022-04-04 21:00:00" }, { "dt": 1649116800, "main": { "temp": 18.54, "feels_like": 18.41, "temp_min": 18.54, "temp_max": 18.54, "pressure": 1022, "sea_level": 1022, "grnd_level": 1021, "humidity": 75, "temp_kf": 0 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "clouds": { "all": 5 }, "wind": { "speed": 0.51, "deg": 10, "gust": 0.68 }, "visibility": 10000, "pop": 0, "sys": { "pod": "d" }, "dt_txt": "2022-04-05 00:00:00" }, { "dt": 1649127600, "main": { "temp": 23.72, "feels_like": 23.58, "temp_min": 23.72, "temp_max": 23.72, "pressure": 1023, "sea_level": 1023, "grnd_level": 1021, "humidity": 55, "temp_kf": 0 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "clouds": { "all": 8 }, "wind": { "speed": 1.47, "deg": 360, "gust": 1.76 }, "visibility": 10000, "pop": 0, "sys": { "pod": "d" }, "dt_txt": "2022-04-05 03:00:00" }, { "dt": 1649138400, "main": { "temp": 26.62, "feels_like": 26.62, "temp_min": 26.62, "temp_max": 26.62, "pressure": 1019, "sea_level": 1019, "grnd_level": 1017, "humidity": 41, "temp_kf": 0 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "clouds": { "all": 10 }, "wind": { "speed": 2.09, "deg": 49, "gust": 2.16 }, "visibility": 10000, "pop": 0, "sys": { "pod": "d" }, "dt_txt": "2022-04-05 06:00:00" }], "city": { "id": 1581130, "name": "Hanoi", "coord": { "lat": 21.0245, "lon": 105.8412 }, "country": "VN", "population": 1431270, "timezone": 25200, "sunrise": 1649026044, "sunset": 1649070703 } }
    const promise = Promise.resolve({ data });
    axios.get.mockImplementationOnce(() => promise);

    render(Wrapper);
    await act(() => sleep(1000));
    // Show city ok
    expect(await screen.findByText('Hanoi')).toBeInTheDocument();
    // Show temperature in C unit ok
    expect(await screen.findByText('21')).toBeInTheDocument();
    // check switch button function ok
    const switchBtn = screen.getByRole("checkbox");
    await userEvent.click(switchBtn);
    await act(() => sleep(1000));
    // Show tempature in F unit ok
    expect(await screen.findByText('69')).toBeInTheDocument();
  });
});