const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  apiKey = "407695e69e4e837c529cbb48541c4193";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units;
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (stream) => {
      const weatherStream = JSON.parse(stream);
      const temp = weatherStream.main.temp;
      const weatherDescription = weatherStream.weather[0].description;
      const icon = weatherStream.weather[0].icon;
      const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      // console.log(temp);
      // console.log(weatherDescription);

      res.write(
        "<h1>The Temperature in " +
          query +
          " " +
          temp +
          " degree celcius</h1>  "
      );
      res.write(
        "<h3>And the weather description is " +
          weatherDescription +
          " today</h3>"
      );
      res.write("<img src ="+ imgurl+">");
      res.send();
    });
  });
});
app.listen(80, () => {
  console.log("Server started at port 80");
});
