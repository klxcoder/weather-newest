import axios from "axios";

const apikey = process.env.REACT_APP_API_KEY;

const fetchData = async (nameCity) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${nameCity ? nameCity : 'hanoi'
    }&units=metric&cnt=7&appid=${apikey}`
  ).then((res) => {
    return res.data
  });
};

export default fetchData;
