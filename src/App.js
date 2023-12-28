import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import {Rourkela} from "./Database";
import Basic from './components/Basic';
import Mid from "./components/Mid";
import Side from "./components/Side";
import LoadingBar from 'react-top-loading-bar';

const App = () => {

  const API_key = '3ac6885830c3f62db920516318dc24b4';

  const [progress, setProgress] = useState(0);
  const [currentWeather, setCurrentWeather] = useState(Rourkela.currentweather);
  const [forecast, setForecast] = useState(Rourkela.forecast);
  const [location, setLocation] = useState("Rourkela, India");
  const [airQuality, setAirQuality] = useState(Rourkela.airQuality);

  useEffect(()=>{
    handleOnSearchChange({
      label: "Rourkela, India",
      value: "22.249166666 84.882777777"})
  },[])

  const handleOnSearchChange = (searchData) => {
    setProgress(10);
    console.log("SEARCH DATA", searchData)
    const [lat, lon] = searchData.value.split(" ");
    setLocation(searchData.label);
    const weatherCurrent = fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
    const WeatherForecast = fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`);
    const airInfo = fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_key}`);
    setProgress(30);
    Promise.all([weatherCurrent, WeatherForecast, airInfo])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        const airQualityResponse = await response[2].json();
        setProgress(70);
        setCurrentWeather(weatherResponse);
        setForecast(forecastResponse);
        setAirQuality(airQualityResponse);
        setProgress(100);
      })
      .catch((err) => console.log("err"))
      
  }

  return (
    <div >
      <Search onSearchChange={handleOnSearchChange} />
      
      <div className="row mt-5 contain">
      <LoadingBar
        height={3}
        color='#fff'
        progress={progress}
      />
        <div className="col ">
          <Basic currentWeather={currentWeather} location={location} airQuality={airQuality} />
        </div>
        <div className="col-md">
          <Mid currentWeather={currentWeather} forecast={forecast} />
        </div>
        <div className="col-lg ">
          <Side currentWeather={currentWeather} handleOnSearchChange={handleOnSearchChange}/>
        </div>
      </div>
    </div>

  )
};
export default App;

