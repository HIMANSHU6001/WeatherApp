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

  useEffect(() => {
    console.log(temps);
  }, [temps])

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
    // console.log("fetching");
    // const Mumbaiurl = `http://api.openweathermap.org/data/2.5/weather?lat=19.075833333&lon=72.8775&appid=${API_key}`
    // const NycUrl = `http://api.openweathermap.org/data/2.5/weather?lat=40.7&lon=-74&appid=${API_key}`
    // const BijUrl = `http://api.openweathermap.org/data/2.5/weather?lat=39.90403&lon=116.407526&appid=${API_key}`
    // const DubUrl = `http://api.openweathermap.org/data/2.5/weather?lat=25.269722222&lon=55.309444444&appid=${API_key}`
    // const MumbaiData = await fetch(Mumbaiurl);
    // const parsedMumbaiData = await MumbaiData.json();
    // setMumbai(parsedMumbaiData);
    const urls = [
      `http://api.openweathermap.org/data/2.5/weather?lat=19.075833333&lon=72.8775&appid=${API_key}`,
      `http://api.openweathermap.org/data/2.5/weather?lat=40.7&lon=-74&appid=${API_key}`,
      `http://api.openweathermap.org/data/2.5/weather?lat=39.90403&lon=116.407526&appid=${API_key}`,
      `http://api.openweathermap.org/data/2.5/weather?lat=25.269722222&lon=55.309444444&appid=${API_key}`
    ];
    const requests = urls.map(url => fetch(url).then(res => res.json()));
    const toMembers = responses => responses.map(response => response);

    Promise.all(requests).then(toMembers).then(members => setTemps(members));

    // const NycData = await fetch(NycUrl);
    // const parsedNycData = await NycData.json();
    // setNyc(parsedNycData);

    // const BijData = await fetch(BijUrl);
    // const parsedBijData = await BijData.json();
    // setBij(parsedBijData);

    // const DubData = await fetch(DubUrl);
    // const parsedDubData = await DubData.json();
    // setDub(parsedDubData);

    // cities.map(async (city, index) => {
    //   setProgress(0);
    //   const [lat, lon] = city.value.split(" ");
    //   const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
    //   setProgress(40);
    //   const data = await fetch(url);
    //   const parsedData = await data.json();
    //   setProgress(70);
    //   switch (index) {
    //     case 0:
    //       setMumbai(parsedData)
    //       break;
    //     case 1:
    //       setNyc(parsedData)
    //       break;
    //     case 2:
    //       setBij(parsedData)
    //       break;
    //     case 3:
    //       setDub(parsedData)
    //       break;
    //     default:
    //       break;
    //   }
    //   setProgress(100);
    //   setFetched(true);
    // })
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


      {/*<div onClick={() => props.handleOnSearchChange(cities[1])} className="backgroundImage col bg-black bg-opacity-25 rounded-5 text-white p-3 my-2 row" style={{ marginRight: '5px', background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgnyc})`, backgroundPosition: "center", backgroundSize: "cover" }}>
        <div className="row">
          <div className="col-8"><h3 className="d-flex m-auto">New York</h3></div>
          <div className="col m-auto"><h4 className="">{nyc.main.temp}°C</h4></div>
        </div>
        <div className="row">
          <p className='my-2'>USA</p>
        </div>
      </div>
      <div onClick={() => props.handleOnSearchChange(cities[2])} className="backgroundImage col bg-black bg-opacity-25 rounded-5 text-white p-3 my-2 row" style={{ marginRight: '5px', background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgbegin})`, backgroundPosition: "center", backgroundSize: "cover" }}>
        <div className="row">
          <div className="col-8"><h3 className="d-flex m-auto">Beijin</h3></div>
          <div className="col m-auto"><h4 className="">{bij.main.temp}°C</h4></div>
        </div>
        <div className="row">
          <p className='my-2'>China</p>
        </div>
      </div>
      <div onClick={() => props.handleOnSearchChange(cities[3])} className="backgroundImage col bg-black bg-opacity-25 rounded-5 text-white p-3 my-2 row" style={{ marginRight: '5px', background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgDubai})`, backgroundPosition: "center", backgroundSize: "cover" }}>
        <div className="row">
          <div className="col-8"><h3 className="d-flex m-auto">Dubai</h3></div>
          <div className="col m-auto"><h4 className="">{dub.main.temp}°C</h4></div>
        </div>
        <div className="row">
          <p className='my-2'>UAE</p>
        </div> 
      </div>*/}
    </div>
  )
}
export default Side;
