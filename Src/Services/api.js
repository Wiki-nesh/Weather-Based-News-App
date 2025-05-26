import axios from 'axios';

const API_Token = '2776336a4c2a8ca239fe8cc8f0cb2778';
const NEWS_API_Token = 'ff129b0c6ed54a999cbae9b113a552ba';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const NEWS_BASE_URL = 'https://newsapi.org/v2/everything?';
export const GetCurrentData = async () => {
  const res = await axios.get(
    `${BASE_URL}/weather?lat=13.067439&lon=80.237617&appid=${API_Token}&units=metric`,
  );

  return res;
};

export const GetForecast = async () => {
  const res = await axios.get(
    `${BASE_URL}/forecast?lat=13.067439&lon=80.237617&appid=${API_Token}&units=metric`,
  );
  return res;
};

export const GetNews = async keyword => {
  const res = await axios.get(
    `${NEWS_BASE_URL}q=${encodeURIComponent(
      keyword,
    )}&language=en&apiKey=${NEWS_API_Token}`,
  );
  return res;
};

export const GetNewsBasedOnCategory = async keyword => {
  const res = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&category=${keyword}&apiKey=${NEWS_API_Token}`,
  );
  return res;
};
