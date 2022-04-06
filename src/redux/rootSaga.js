import { call, put, takeEvery } from 'redux-saga/effects';
import { API_FETCH_FAILED, API_FETCH_SUCCEEDED } from '../contansts/contansts';
import fetchData from './api';

function* rootSaga() {
  yield takeEvery('API_FETCH_REQUEST', handleApiRequest);
}

function* handleApiRequest(action) {
  try {
    const data = yield call(fetchData, action.payload.nameCity);
    // add id to data ---> get the day of the week
    data.id = action.payload.id;
    yield put(API_FETCH_SUCCEEDED(data));
  } catch (e) {
    yield put(API_FETCH_FAILED());
  }
}

export default rootSaga;
