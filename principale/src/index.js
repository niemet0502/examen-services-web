import axios from "axios";
import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(bodyParser.json());

app.post("/dayfinder", async (req, res) => {
  const { date } = req.body;

  // validate the request body
  if (!(date && /^\d{2}-\d{2}-\d{4}$/.test(date))) {
    return res
      .status(400)
      .send({ date: "La date n'est pas au bon format jj-mm-aaaa" });
  }

  // find what day it will or was
  const [day, month, year] = date.split("-");

  const convertedDate = new Date(`${year}-${month}-${day}`);

  const jourSemaine = convertedDate.getDay();

  const jours = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  const dayOfWeek = jours[jourSemaine];

  // convert the request body by changing the - by /
  const stringConvertedDate = date.replaceAll("-", "/");

  // send the response
  res.status(200).send({ date: stringConvertedDate, dayOfWeek });
  // make a call to the historic service to store the call historic

  const currentDate = new Date();

  try {
    const requestBody = {
      searchDate: `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}   ${currentDate
        .getHours()
        .toString()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
      request: date,
      date: stringConvertedDate,
      day: dayOfWeek,
    };

    const response = await axios.post("http://localhost:3000/", requestBody);
  } catch (e) {
    console.log("Error while trying to save the historic");
  }
});

app.get("/dayfinder/historique", async (req, res) => {
  const response = await axios.get("http://localhost:3000/");
  const data = response.data;

  return res.status(200).send(data);
});

app.listen(8080, () => {
  console.log("the app is listening on the port 8080");
});
