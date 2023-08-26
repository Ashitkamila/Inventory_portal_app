import {
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";

import { getSideBarAllModules, loginApi } from "./api";
import * as sagaActions from "./sagaActions";
import {
  getAllModulesOfSidebar,
  loginError,
  loginStartSuccess,
} from "./usersSlice";

function* onLoginStartAsync({ type, formValue, headers }) {
  try {
    const responce = yield call(loginApi, formValue, { headers });
    yield delay(500);
    yield put(loginStartSuccess(responce.data));
  } catch (error) {
    yield put(loginError(error.responce.data));
  }
}

function* onAllSideBarModules({ response }) {
  console.log('response', response);
  try {
    const responce = yield call(getSideBarAllModules, response);
    yield delay(500);
    yield put(getAllModulesOfSidebar(responce.data));
  } catch (error) {
    yield put(loginError(error.responce.data));
  }
}

// all status

function* onLogin() {
  yield takeEvery(sagaActions.LOGIN_START);
}
function* onSidebarModules() {
  yield takeEvery(sagaActions.GET_SIDEBAR_MODULE, onAllSideBarModules);
}

const usersSagas = [fork(onLogin), fork(onSidebarModules)];

export default function* rootSaga() {
  yield all([...usersSagas]);
}
