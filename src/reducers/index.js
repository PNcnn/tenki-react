// Reducer
export default function appReducer(state, action) {
  switch (action.type) {
    case 'RETURNWEATHER':

      console.log(action.payload)

      const weather = action.payload.weather[0]

      return {
        data: action.payload,
        place: action.payload.name,
        weather: weather.description
      }


    default:
      return state
  }
}
