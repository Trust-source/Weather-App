import React, { useEffect, useRef, useState } from 'react'
import './Weather.scss'
import Search_icon from '../Assets/Search.png'
import Cloudy from '../Assets/Cloudy.png'
import Drizzle from '../Assets/Drizzle.png'
import Humidity from '../Assets/Humidity.png'
import Rainy from '../Assets/Rainy.png'
import Snowy from '../Assets/Snowy.png'
import Sunny from '../Assets/Sunny.png'
import Windy from '../Assets/Windy.png'
import Loading from '../Assets/Loading.png'


const Weather = () => {

  const inputRef = useRef()
  const [weatherData, setWeatherData]=useState(false);
  const [loader,setLoader] = useState(false);

  const allIcons ={
    "01d":  Sunny,
    "01n":  Sunny,
    "02d":  Cloudy,
    "02n":  Cloudy,
    "03d":  Cloudy,
    "03n":  Cloudy,
    "04d":  Drizzle,
    "04n":  Drizzle,
    "09d":  Rainy,
    "09n":  Rainy,
    "010d": Rainy,
    "010n": Rainy,
    "013d": Snowy,
    "013n": Snowy,

  }
  const search = async (city)=>{
    if(city === ""){
      alert("Enter City Name");
      return;
    }
    try{
      setLoader(true);
      const API_KEY= "22de600dd04d19b561ddab89793c0177"
      const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

      const response = await fetch(url);

      const data = await response.json();
      console.log(data);

      if(!response.ok){
        alert(data.message);
        setLoader(false);
        return;
      }
  
      const icon = allIcons[data.weather[0].icon] || Sunny;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch(error){
      setWeatherData(false);
      console.error("Error in fetching data");
    }
    finally {
      setLoader(false); 
    }
  }

  useEffect(()=>{
    search("New York")
  },[])
  return (
    <div className='Weather'>
      <div className="Search-bar">
        <input ref={inputRef} type="text" placeholder='Search'/>
        <img src={Search_icon} alt=""  onClick={()=>search(inputRef.current.value)}/>
      </div>
      {
      loader ? (
        <div className="Loading">
          <img src={Loading} alt="Loading..." />
          <p>Loading...</p>
        </div>
      ):
      (weatherData?<>
        <img src={weatherData.icon} alt="" className='Weather-icon' />
      <p className='Temperature'>{weatherData.temperature}</p>
      <p className='Location'>{weatherData.location}</p>
      <div className="Weather-data">
        <div className="col">
          <img src={Humidity} alt="" />
          <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={Windy} alt="" />
          <div>
            <p>{weatherData.windSpeed}</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      </>:<></>)}
      
    </div>
  )
}

export default Weather