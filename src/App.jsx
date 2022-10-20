import "./App.css";
import Weather from "../src/assets/weather.png";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [data, setData] = useState({});
  const [weather, setWeather] = useState([]);
  const [inputCity, setInputCity] = useState("");
  const apiKey = "2cc14ce07e07eaf3d4a4229588c628c2";
  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURl)
      .then((res) => {
        setData(res.data);
        setWeather(res.data.weather);

        setInputCity("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };
  useEffect(() => {
    getWeatherDetails("Mumbai");
  }, []);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-[#116466] ">
        <div
          className="w-[60vw] h-[70vh] lg:w-[40vw] lg:h-[70vh] border 
          border-[#747474] shadow-md shadow-blue-200 rounded-xl"
        >
          <h1 className="text-center text-3xl font-semibold p-10 text-gray-300">
            Weather
          </h1>

          <div className="flex flex-col">
            <input
              className="m-auto w-[170px] lg:w-[300px] overflow-hidden p-1 rounded focus:outline-none "
              type="text"
              value={inputCity}
              placeholder="City Name"
              onChange={handleChange}
            />

            <button
              onClick={handleSearch}
              className="mt-4 m-auto bg-transparent hover:bg-blue-500 text-gray-300 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Search
            </button>
          </div>

          <div className="flex flex-col justify-between items-center pt-4">
            <img className="h-[150px] w-[150px] " src={Weather} alt="" />
            <div>
              <p className="text-2xl text-center  text-gray-300 ">
                {data?.name}
              </p>

              <p className="text-3xl text-gray-300 pt-3">
                {(data?.main?.temp - 273.15).toFixed(2)}
                <span className="pl-2">°C</span>
              </p>
            </div>
          </div>
          <div className="flex justify-evenly items-center   pt-5 text-xl tracking-wide text-gray-300 text-center">
            {weather.map((item) => (
              <div key={item.id}>
                <p>{item.main}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
