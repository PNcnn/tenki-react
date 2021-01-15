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
        {this.props.price}<br />
        {this.props.weather}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    price: state.price,
    data: state.data,
    weather: state.weather
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick(price,data,weather){
      dispatch(addTax(price,data,weather));
    }
  };
}

let AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponents);



// ActionCreator
const ADDTAX = 'ADDTAX';
function addTax(price,data,weather) {
  return {
    type: ADDTAX,
    price,
    data,
    weather
  };
}


// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case 'ADDTAX':
      const appid ='f48d28e89819515c1b2f219c5bb5bca4'
      const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ action.price +'&appid='+ appid
      fetch(url)
      .then(response => response.json())
      .then(data =>
        state.data = data
      );

      state.price = action.price

      if(state.data.weather){
        console.log(state.data.weather[0].description)
        state.weather = state.data.weather[0].description
      }

      console.log(state)

      return {
        data: state.data,
        price: state.price,
        weather: state.weather
      }

    default:
      return state
  }
}


//state初期化
const initialState = {
  price: '',
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
