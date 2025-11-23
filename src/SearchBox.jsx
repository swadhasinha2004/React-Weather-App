import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState(""); 
    const [error, setError] = useState("");     

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "07cb409b389024dc0d7c4e33725d238d";

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(
                `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`
            );
            let jsonResponse = await response.json();
            console.log(jsonResponse);

            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,   
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };

            console.log(result);
            return result;

        } catch (err) {
    console.error(err);
    setError("No such place in our API");
}
   };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = async (evt) => {
        evt.preventDefault();
        console.log(city);

        let newInfo = await getWeatherInfo();
        if (newInfo) updateInfo(newInfo);

        setCity("");
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>

                <TextField 
                    id="City" 
                    label="City Name" 
                    variant="outlined" 
                    required
                    value={city}
                    onChange={handleChange}
                /> 

                <br /><br />

                <Button variant="contained" type="submit">
                    Search
                </Button>  

                {error && (
                    <p style={{ color: "red", marginTop: "10px" }}>
                        {error}
                    </p>
                )}

            </form>
        </div>
    );
}
