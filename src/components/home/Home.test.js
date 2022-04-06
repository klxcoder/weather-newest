import React from "react";
import store from '../../redux/store';
import { Provider } from 'react-redux';
import { StoreProvider } from '../../store';
import axios from 'axios';
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';
import Home from "./Home";
import mockData from "./mockData";

// import {
//   hour,
//   minute,
//   year,
//   amPm,
//   date,
//   day,
//   month,
//   toDay,
// } from '../../contansts/contansts';

const {
  hour,
  minute,
  year,
  amPm,
  date,
  day,
  month,
  toDay
} = {
  hour: 11,
  minute: 58,
  year: 2022,
  amPm: 'AM',
  date: 6,
  day: 'Wednesday',
  month: 'April',
  toDay: 2
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

jest.mock('axios');

const Wrapper = <Provider store={store}>
  <StoreProvider>
    <Home hour={hour} minute={minute} year={year} amPm={amPm} date={date} day={day} month={month} toDay={toDay} />
  </StoreProvider>
</Provider>

describe('test Fetch', () => {
  test("render Home without crashing", async () => {
    const promise = Promise.resolve({ data: mockData });
    axios.get.mockImplementationOnce(() => promise);

    render(Wrapper);
    await act(() => sleep(1000));

    expect(axios.get).toHaveBeenCalledTimes(1);
    // Show city ok
    expect(await screen.findByText('Hanoi')).toBeInTheDocument();
    // Show temperature in C unit ok
    expect(await screen.findByText('20')).toBeInTheDocument();
    // check switch button function ok
    const switchBtn = screen.getByRole("checkbox");
    await userEvent.click(switchBtn);
    await act(() => sleep(1000));
    // Show tempature in F unit ok
    expect(await screen.findByText('68')).toBeInTheDocument();
    // Show himidity ok
    expect(await screen.findByText('71')).toBeInTheDocument();
    // Show wind speed ok
    expect(await screen.findByText('2.1 km/h')).toBeInTheDocument();
  });
});