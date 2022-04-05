const apikey = process.env.REACT_APP_API_KEY;

const fetchData = (nameCity) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${nameCity ? nameCity : 'hanoi'
    }&units=metric&cnt=7&appid=${apikey}`
  ).then((res) => {
    if (res.status == 200) {
      return res.json();
    }
  });
};

export default fetchData;
