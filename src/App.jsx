import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [varos, setVaros] = useState('')
  const [adatok, setAdatok] = useState(null)
  const [hiba, setHiba] = useState(null)

  // FIGYELEM: Ide kell majd az API kulcsod!
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  const kereses = async () => {
    if (!varos) return
    try {
      setHiba(null)
      const forras = `https://api.openweathermap.org/data/2.5/weather?q=${varos}&appid=${apiKey}&units=metric&lang=hu`
      const valasz = await axios.get(forras)
      setAdatok(valasz.data)
} catch (err) {
  // Ez kiírja a szerver pontos válaszát (pl. "Invalid API key" vagy "city not found")
  setHiba("Hiba: " + (err.response?.data?.message || err.message));
  setAdatok(null);
}
  }

return (
    <div className="container">
      <div className="weather-card">
        <h1>Időjárás App 🌤️</h1>
        
        <div className="search-box">
          <input 
            value={varos} 
            onChange={(e) => setVaros(e.target.value)} 
            placeholder="Város neve..."
          />
          <button onClick={kereses}>Keresés</button>
        </div>

        {hiba && <p style={{ color: '#ff6b6b', marginTop: '20px' }}>{hiba}</p>}

        {adatok && (
          <div className="result">
            <h2 className="city">{adatok.name}</h2>
            <p>Szélsebesség: {adatok.wind.speed} m/s</p>
            <p className="temp">{Math.round(adatok.main.temp)}°C</p>
            <p className="desc">{adatok.weather[0].description}</p>
            <p>Páratartalom: {adatok.main.humidity}%</p>
            <p>Legyen szép napod! ☀️</p>
          </div>
        )}
      </div>
    </div>
  )}
    
export default App