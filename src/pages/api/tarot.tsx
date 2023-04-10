
import axios from 'axios'

const url = 'https://horoscope-astrology.p.rapidapi.com/tarotcard';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST
  }
};


export async function fetchTarotCardData() {
    const response = await axios(url, options);
    return response.data;
  }