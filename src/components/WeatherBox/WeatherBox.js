import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useState, useCallback } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {
  const [weather, setWeather] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  console.log('WeatherBox render')
  
  const handleCityChange = useCallback (city => {
    setIsPending(true);
    setError(false);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4fdbba23aab8e42a9f97c38b3ff9152b&units=metric`)
    .then(res => {
      if(res.status === 200) {
        res.json()
        .then(data => {
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        };
        setWeather(weatherData);
        setIsPending(false);
      });
    }   else {
         setError(true);
    }
  });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange}/>
      { (weather && !isPending) && <WeatherSummary {...weather} /> }
      { (isPending && !error) && <Loader /> }
      { error && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;