import React, { useState, useEffect } from 'react';
import Thermo from './icons/thermometer_wht.png';
import LoadingBar from 'react-top-loading-bar';
import bgMumbai from './mumbai.jpg';
import bgnyc from './nyc.jpg';
import bgbegin from './begin.jpg';
import bgDubai from './dubai.jpg';



const Side = (props) => {

  const [progress, setProgress] = useState(0);
  const [temps, setTemps] = useState([])
  const bgUrls = [bgMumbai,bgnyc,bgbegin,bgDubai]

  const API_key = '3ac6885830c3f62db920516318dc24b4';


  const cities = [
    {
      value: '19.075833333 72.8775',
      label: 'Mumbai, India'
    },
    {
      value: '40.7 -74',
      label: 'New York, United States of America'
    },
    {
      value: '39.90403 116.407526',
      label: "Beijing, People's Republic of China"
    },
    {
      value: '25.269722222 55.309444444',
      label: 'Dubai, United Arab Emirates'
    }
  ]

  useEffect(() => {
    fetchCities();
  }, []);


  const fetchCities = async () => {
    setProgress(10);
    const urls = [
      `http://api.openweathermap.org/data/2.5/weather?lat=19.075833333&lon=72.8775&appid=${API_key}`,
      `http://api.openweathermap.org/data/2.5/weather?lat=40.7&lon=-74&appid=${API_key}`,
      `http://api.openweathermap.org/data/2.5/weather?lat=39.90403&lon=116.407526&appid=${API_key}`,
      `http://api.openweathermap.org/data/2.5/weather?lat=25.269722222&lon=55.309444444&appid=${API_key}`
    ];
    setProgress(50);
    const requests = urls.map(url => fetch(url).then(res => res.json()));
    const toMembers = responses => responses.map(response => response);
    setProgress(70);
    Promise.all(requests).then(toMembers).then(members => setTemps(members));
    setProgress(100);
  }

  return (
    <div>
      <LoadingBar
        height={3}
        color='#fff'
        progress={progress}
      />
      <div className="row">
        <div className="col bg-black bg-opacity-25 rounded-5 text-white p-4" style={{ marginRight: '5px' }}>
          <span style={{ fontSize: '12px' }}>FEELS LIKE</span>
          <p className='fs-1' style={{ color: '#79dc4a' }}><img style={{ width: '35px', marginRight: '5px' }} src={Thermo} alt="Temp" />{(props.currentWeather.main.feels_like - 273).toFixed(0)}°</p>
          <span className='text-white-50 ' style={{ fontSize: '10px' }}>Humidity is making it feel harder.</span>
        </div>
      </div>
      <p className='text-white my-3'>WEATHER AROUND THE WORLD</p>
      {
        temps.map((temp, index) => (
          <div key={index} onClick={() => props.handleOnSearchChange(cities[index])} className="backgroundImage col bg-black bg-opacity-25 rounded-5 text-white p-3 my-2 row" style={{ marginRight: '5px', background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgUrls[index]})`, backgroundPosition: "center", backgroundSize: "cover" }}>
            <div className="row">
              <div className="col-8"><h3 className="d-flex m-auto">{cities[index].label.split(",")[0]}</h3></div>
              <div className="col m-auto"><h4>{Math.round(temp.main.temp-273)}°C</h4></div>
            </div>
            <div className="row ">
              <p className='my-2'>{cities[index].label.split(",")[1]}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}
export default Side;
