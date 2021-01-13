import React from 'react';
import ReactDOM from 'react-dom';
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      weather: [],
      data: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const appid =''
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ this.state.value +'&appid='+ appid
    var obj = []
    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          weather: data
        })
      );
      console.log(this.state.weather.weather)
      if(this.state.weather.weather){
        obj = this.state.weather.weather[0].description
        console.log(obj)
        this.setState({data: obj})
      }
      event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Place:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Weather" />
        <br />({this.state.data}){this.state.value}
      </form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);
