import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, Store, AnyAction } from 'redux'
import { Provider, connect } from 'react-redux'

import appReducer from './reducers'
import getWeather from './actions'
import rootSaga from './sagas'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

const initialState = {
  place: '',
  data: [],
  weather: ''
};

const configureStore = () => {
  const store = createStore(
    appReducer,
    initialState,
    applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(rootSaga)
  return store
}

const store = configureStore()

class AppComponents extends React.Component {
  send(e){
    this.props.onClick(this.refs.inputText.value);
  }

  render() {
    return (
      <div>
        <input type="text" defaultValue="" ref="inputText" />
        <button onClick={this.send.bind(this)}>表示</button>
        <br />
        {this.props.place}<br />
        {this.props.weather}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onClick(place){
        dispatch(getWeather(place))
      }
    };
  }

function mapStateToProps(state) {
  return {
    place: state.place,
    data: state.data,
    weather: state.weather
  };
}

let AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponents);

//レンダリング
ReactDOM.render(
  <Provider store={store}>
  <AppContainer />
  </Provider>,
  document.getElementById('root')
);
