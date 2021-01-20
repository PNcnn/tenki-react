import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

//Presentational Components
class AppComponents extends React.Component {

  send(e){
    this.props.onClick(this.refs.inputText.value);
  }

  render() {
    return (
      <div>
        <input type="text" defaultValue="" ref="inputText" />
        <button onClick={this.send.bind(this)}>計算</button>
        <br />
        {this.props.place}<br />
        {this.props.weather}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    place: state.place,
    data: state.data,
    weather: state.weather
  };
}

async function getweatherdata(place){
  const appid ='f48d28e89819515c1b2f219c5bb5bca4'
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ place +'&appid='+ appid

  const response = await fetch(url)
  const weatherdata = await response.json()
  return Promise.resolve(weatherdata)
}

function mapDispatchToProps(dispatch) {
  return {
    onClick(place){
      getweatherdata(place).then(result =>{
        dispatch(getWeather(result))
        }
      )
    }
  };
}

let AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponents);



// ActionCreator
const GETWEATHER = 'GETWEATHER';
function getWeather(data) {
  return {
    type: GETWEATHER,
    data
  };
}


// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case 'GETWEATHER':

      console.log(action.data)

      const weather = action.data.weather[0]

      return {
        data: state.data,
        place: action.data.name,
        weather: weather.description
      }

    default:
      return state
  }
}


//state初期化
const initialState = {
  place: '',
  data: [],
  weather: ''
};

//store作成
const store = createStore(appReducer, initialState);

//レンダリング
ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
