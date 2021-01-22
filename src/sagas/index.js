import { put, call, take, fork } from 'redux-saga/effects'

async function getweatherdata(place){
  const appid ='f48d28e89819515c1b2f219c5bb5bca4'
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ place +'&appid='+ appid

  console.log(url)
  return fetch(url)
    .then(res => res.json())
}

function* handleRequestPlace() {
  while(true){
    const action = yield take('GETWEATHER');
    console.log(action)
    const payload = yield call(getweatherdata, action.data);
    console.log(payload)
    yield put({type:'RETURNWEATHER', payload});
  }
}


export default function* rootSaga() {
  yield fork(handleRequestPlace)
}
