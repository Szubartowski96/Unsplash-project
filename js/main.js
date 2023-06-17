const API_URL = import.meta.env.VITE_API_URL
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY

const inputSearch = document.querySelector('.hero_centered-form-input');
const selectElement = document.getElementById('hero_select');
const selectedValue = selectElement.value;
const submitBtn = document.querySelector('.hero_centered-form-btn')




const searchPhoto = ()  => {
	fetch(`${API_URL}/search/photos/?client_id=${ACCESS_KEY}&query=${inputSearch.value}`)
		.then(res => res.json())
		.then(data => console.log(data))

		
}

const handleSubmit = (e) => {
	e.preventDefault();
	searchPhoto();
}

const handleKeyPress = event => {
	if (event.key === 'Enter') {
	  event.preventDefault();
	  searchPhoto();
	}
  };



inputSearch.addEventListener('change', searchPhoto)
inputSearch.addEventListener('keydown', handleKeyPress)
submitBtn.addEventListener('click', handleSubmit)