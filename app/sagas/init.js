import { put, takeLatest, all } from 'redux-saga/effects';
import { APP } from '../actions/actionsTypes';
import { appReady, appStart, ROOT_LOADING, ROOT_OUTSIDE } from '../actions/app';
import AsyncStorage from '@react-native-community/async-storage';
import { CURRENT_USER } from '../constants/keys';
import firebaseSdk from '../lib/firebaseSdk';
import { loginSuccess } from '../actions/login';

export const restore = function* restore() {
  const user = yield AsyncStorage.getItem(CURRENT_USER);
  const auth = yield firebaseSdk.authorizedUser();
  if (auth && user) {
    //yield put(appStart({ root: ROOT_LOADING }));
    const userInfo = yield firebaseSdk.getUser(auth.uid);
    if (userInfo && userInfo.id) {
      const user = { ...userInfo, emailVerified: auth.emailVerified };
      yield AsyncStorage.setItem(CURRENT_USER, JSON.stringify(user));
      yield put(loginSuccess(user));
      return;
    } else {
      yield AsyncStorage.removeItem(CURRENT_USER);
    }
  }

  yield put(appStart({ root: ROOT_OUTSIDE }));
  yield put(appReady({}));
};

const start = function* start() {};

const root = function* root() {
  yield takeLatest(APP.INIT, restore);
  yield takeLatest(APP.START, start);
};
export default root;
