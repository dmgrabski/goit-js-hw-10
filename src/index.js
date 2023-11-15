import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', async () => {
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

  try {
    showLoader();
    const breeds = await fetchBreeds();
    breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
    hideLoader();
  } catch (err) {
    showError(err.message);
  }

  breedSelect.addEventListener('change', async () => {
    const selectedBreed = breedSelect.value;
    if (selectedBreed) {
      try {
        showLoader();
        const catData = await fetchCatByBreed(selectedBreed);
        catInfo.innerHTML = `
          <img src="${catData.url}" alt="A cat">
          <p>Name: ${catData.breeds[0].name}</p>
          <p>Description: ${catData.breeds[0].description}</p>
          <p>Temperament: ${catData.breeds[0].temperament}</p>
        `;
        catInfo.style.display = 'block';
        hideLoader();
      } catch (err) {
        showError(err.message);
      }
    }
  });
});



