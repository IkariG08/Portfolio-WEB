const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);


app.get("/", (req, res) => {
  res.render("index")
});

app.get("/city", (req, res) => {
  const city_name = req.query.cityName;
  const apiKey = "98040c04de2ac432fbeaee050b786d79"; // Reemplaza con tu clave API de OpenWeather

  // Hacer una solicitud a la API de OpenWeather
  https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${apiKey}`, (apiRes) => {
    let data = "";

    // Recopilar los datos de la respuesta de la API
    apiRes.on("data", (chunk) => {
      data += chunk;
    });

    // Procesar los datos una vez que se complete la respuesta de la API
    apiRes.on("end", () => {
      try {
        // Convertir la respuesta JSON a un objeto JavaScript
        const weatherData = JSON.parse(data);

        // Extraer la temperatura y el ícono del objeto weatherData
        const temperatureKelvin = weatherData.main.temp;
        
        // Convertir la temperatura a Celsius
        const temperatureCelsius = temperatureKelvin - 273.15;

        // Redondear la temperatura a dos decimales
        const roundedTemperature = temperatureCelsius.toFixed(2);

        const icon = weatherData.weather[0].icon;

        // Renderizar la vista "country.ejs" con los datos
        res.render("city", { city_name: city_name, temperature: roundedTemperature, icon: icon, error: null });
      } catch (error) {
        console.error("Error al procesar la respuesta de la API de OpenWeather:", error);
        res.render("city", { city_name: city_name, error: "Error al obtener datos del clima" });
      }
    });
  }).on("error", (error) => {
    console.error("Error al realizar la solicitud a la API de OpenWeather:", error);
    res.render("city", { city_name: city_name, error: "Error al obtener datos del clima" });
  });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});