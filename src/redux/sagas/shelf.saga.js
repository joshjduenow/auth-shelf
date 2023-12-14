import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getShelfItems() {
  try {
    const shelfResponse = yield axios.get("/api/shelf");

    yield put({
      type: "SET_SHELF",
      payload: shelfResponse.data,
    });
  } catch (error) {
    console.log("error in get shelf items:", error);
  }
}
function* shelfSaga() {
    yield takeLatest('SAGA_FETCH_SHELF', getShelfItems);
  }
export default shelfSaga;