import axios from 'axios';

const api_key = 'live_qU4hSl988iYocq7Vcf5Ne2MFts9NZWRrdq2LjS9c3yYwJD9esYlrqAPvXbaYxcFW';
axios.defaults.headers.common['x-api-key'] = api_key;

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const showLoader = () => {
  loader.style.display = 'block';
  error.style.display = 'none';
  catInfo.style.display = 'none';
};

const hideLoader = () => {
  loader.style.display = 'none';
};

const showError = (errorMsg) => {
  error.textContent = errorMsg;
  error.style.display = 'block';
};

const fetchBreeds = async () => {
  showLoader();
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    breedSelect.innerHTML = response.data.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
    hideLoader();
  } catch (err) {
    showError('Error loading breeds. Please try again.');
  }
};

const fetchCatByBreed = async (breedId) => {
  showLoader();
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    const catData = response.data[0];
    catInfo.innerHTML = `
      <img src="${catData.url}" alt="A cat">
      <p>Name: ${catData.breeds[0].name}</p>
      <p>Description: ${catData.breeds[0].description}</p>
      <p>Temperament: ${catData.breeds[0].temperament}</p>
    `;
    catInfo.style.display = 'block';
    hideLoader();
  } catch (err) {
    showError('Error loading cat info. Please try again.');
  }
};

breedSelect.addEventListener('change', () => {
  const selectedBreed = breedSelect.value;
  if (selectedBreed) {
    fetchCatByBreed(selectedBreed);
  }
});

fetchBreeds();


