import React from 'react';
import store from '../../../redux/store';
import { Provider } from 'react-redux';
import { StoreProvider } from '../../../store/index';
import {
  render
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LineChart from "../LineChart"

const Wrapper = (
  <Provider store={store}>
    <StoreProvider>
      <LineChart />
    </StoreProvider>
  </Provider>
);

describe('test LineChart', () => {
  test('render LineChart without crashing', async () => {
    render(Wrapper);
  });
});
