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

function* postShelfIds(action) {
    try {
        const shelfResponse = yield axios({
            method: 'POST',
            url: '/api/shelf',
            data: {image_url: action.payload.url, 
                  description: action.payload.description,
                  user_id: action.payload.userID}
        });
    
        yield put({
            type: 'SAGA_FETCH_SHELF'
        });
      } catch (error) {
        console.log("error in post shelf items:", error);
      }
}

function* deleteImage(action) {
    try {
        console.log("action.payload", action.payload)
        const shelfResponse = yield axios({
            method: 'delete',
            url: `/api/shelf/${action.payload.itemId}`,
            data: action.payload
        });
        yield put({
            type: 'SAGA_FETCH_SHELF'
        });
      } catch (error) {
        console.log("error in delete shelf items:", error);
      }
}





function* shelfSaga() {
    yield takeLatest('SAGA_FETCH_SHELF', getShelfItems);
    yield takeLatest('SAGA_POST_SHELF', postShelfIds);
    yield takeLatest('SAGA_DELETE_SHELF', deleteImage);
  }
export default shelfSaga;