import axios from 'axios';

// Ustawienie klucza API i konfiguracji axios
const api_key = 'live_qU4hSl988iYocq7Vcf5Ne2MFts9NZWRrdq2LjS9c3yYwJD9esYlrqAPvXbaYxcFW';
axios.defaults.headers.common['x-api-key'] = api_key;

// Funkcja do pobierania ras kotów
export const fetchBreeds = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data.map(breed => ({ id: breed.id, name: breed.name }));
  } catch (err) {
    throw new Error('Error loading breeds');
  }
};

// Funkcja do pobierania informacji o konkretnym kocie
export const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data[0];
  } catch (err) {
    throw new Error('Error loading cat info');
  }
};


