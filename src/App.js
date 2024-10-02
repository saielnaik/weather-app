import React, { useState } from 'react';
import './App.css';

function App() {
  
  const [showInput, setShowInput] = useState(false);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleClick = () => {
    setShowInput(!showInput);
  };

  const getWeather = (e) => {
    e.preventDefault();
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=9994df17ffcf4db490d103038242609&q=${city}&days=1&aqi=no&alerts=no`)      
    .then((res) => {
        if (!res.ok) {
          throw new Error('City not found');
        }
        return res.json();
      })
      .then((finalres) => {
        setWeather(finalres);
        setErrorMessage(''); 
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('City not found. Please enter a valid city name.'); 
      });
    setShowInput(!showInput);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className="">
      <div className='bg-[#1a1a1a] min-h-screen justify-center items-start font-sans p-3'>
        <div className='bg-gradient-to-b from-[#41b2ff] to-blue-600 rounded-lg shadow-lg w-full p-5'>
          <div className='flex justify-between'>
            <div className='flex items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <p className='text-2xl font-light text-white'>{weather ? weather.location.name : 'City Name'}</p>
            </div>
            <div className=''>
              <button onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
          </div>

          <form onSubmit={getWeather}>
            <div className={`transition-all duration-500 ease-in-out ${showInput ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden mt-4 flex`}>
              <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                value={city}
                placeholder="Enter city name"
                className="w-full p-2 rounded-l-lg bg-white text-black transition-opacity duration-500 ease-in-out"
              />
              <button className='bg-blue-600 p-2 rounded-r-lg text-white font-medium'>Search</button>
            </div>
          </form>

          <div className='text-center text-white'>
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
            {weather ? (
              <>
                <div className='text-[120%] text-blue-200'>
                  {new Date(weather.location.localtime).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </div>
                <div className='text-[150%] text-blue-100'>{formatDate(weather.location.localtime)}</div>
                <div className='flex justify-center pt-5'>
                  <img src={`https:${weather.current.condition.icon}`} className=' lg:w-[5%]' />
                </div>
                <div className='flex justify-center'>
                  <div className='text-9xl bg-gradient-to-b from-white to-blue-400 inline-block text-transparent bg-clip-text'>
                    {weather.current.temp_c}
                  </div>
                  <div className='text-7xl'>°</div>
                </div>
                <div className='text-2xl pb-5 font-medium bg-gradient-to-b from-white to-blue-400 inline-block text-transparent bg-clip-text'>
                  {weather.current.condition.text}
                </div>
                <hr className='border-t-2 border-blue-200' />
                <div className=''>
                  <div className='flex justify-between pl-7 pr-7 lg:pl-[20%] lg:pr-[20%] pt-5 text-blue-300'>
                    <div>
                      <svg className="h-8 w-8 text-blue-300" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" />
                        <line x1="10" y1="9" x2="14" y2="9" />
                      </svg>
                      {weather.current.feelslike_c}
                    </div>
                    <div>
                      <svg className="h-8 w-8 text-blue-300" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" />
                        <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" />
                        <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
                      </svg>
                      {weather.current.wind_kph}
                    </div>
                    <div>
                      <svg className="h-8 w-8 text-blue-300" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M12 3l5 5a7 7 0 1 1 -10 0l5 -5" />
                      </svg>
                      {weather.current.humidity}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p>Enter a city to get weather data</p>
            )}
          </div>
        </div>
        {weather ? (
          <div className='flex justify-between text-blue-300 font-semibold p-5 lg:pt-[8%] lg:pl-[20%] lg:pr-[20%] pt-9'>
            <div className='flex flex-col items-center justify-center'>
              <div className=''>
                <img src={`https:${weather.forecast.forecastday[0].hour[0].condition.icon}`} className='w-[50%] mx-auto pb-2' />
              </div>
              <p>{weather.forecast.forecastday[0].hour[0].temp_c}°</p>
              <p>{weather.forecast.forecastday[0].hour[0].time.slice(10)}</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <div className=''>
                <img src={`https:${weather.forecast.forecastday[0].hour[6].condition.icon}`} className='w-[50%] mx-auto pb-2' />
              </div>
              <p>{weather.forecast.forecastday[0].hour[6].temp_c}°</p>
              <p>{weather.forecast.forecastday[0].hour[6].time.slice(10)}</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <div className=''>
                <img src={`https:${weather.forecast.forecastday[0].hour[12].condition.icon}`} className='w-[50%] mx-auto pb-2' />
              </div>
              <p>{weather.forecast.forecastday[0].hour[12].temp_c}°</p>
              <p>{weather.forecast.forecastday[0].hour[12].time.slice(10)}</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <div className=''>
                <img src={`https:${weather.forecast.forecastday[0].hour[23].condition.icon}`} className='w-[50%] mx-auto pb-2' />
              </div>
              <p>{weather.forecast.forecastday[0].hour[23].temp_c}°</p>
              <p>{weather.forecast.forecastday[0].hour[23].time.slice(10)}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
