const API_URL = import.meta.env.VITE_API_URL
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY

const inputSearch = document.querySelector('.hero_centered-form-input');
const selectElement = document.getElementById('hero_select');
const submitBtn = document.querySelector('.hero_centered-form-btn')
const photosContainer = document.querySelector('.photos')
const countPage = document.querySelector('.hero_count-of-page')
const mess = document.querySelector('.hero_centered--mess')

let perPage = 0;



const createElement = (data) => {
	data.results.forEach(photo => {

		const linkElement = document.createElement('a');
		linkElement.href = photo.links.html;
		linkElement.target = '_blank';
		linkElement.addEventListener('click', (e) => {
  		e.preventDefault();
		});
		const imgElement = document.createElement('img');
		imgElement.src = photo.urls.regular;
		imgElement.alt = photo.alt_description;
		linkElement.appendChild(imgElement);
		photosContainer.appendChild(linkElement);
		
	});
}



const searchPhoto = ()  => {
	  if (selectElement.value === '0') {
		return;
	  }
	  mess.style.display = 'none';
	
	  if (!inputSearch.value || !selectElement.value) {
		photosContainer.innerHTML = '';
		return;
	  }
	  mess.style.display = 'none';
	photosContainer.innerHTML='';
	const count = parseInt(selectElement.value);
  perPage = count;
	fetch(`${API_URL}/search/photos/?client_id=${ACCESS_KEY}&query=${inputSearch.value}&per_page=${count}`)
		.then(res => res.json())
		.then(data => {
			
			createElement(data);
			inputSearch.value = '';
		})
}




const handleSubmit = (e) => {
	e.preventDefault();
	if (selectElement.value === '0') {
		mess.style.display = 'block';
		return;
	  }
	  mess.style.display = 'none';
	searchPhoto();
}

const handleKeyPress = event => {
	if (event.key === 'Enter') {
	  event.preventDefault();
	  if (selectElement.value === '0') {
		mess.style.display = 'block';
		return;
	  }
	  mess.style.display = 'none';
	  searchPhoto();
	}
  };

 


inputSearch.addEventListener('change', searchPhoto)
inputSearch.addEventListener('keydown', handleKeyPress)
submitBtn.addEventListener('click', handleSubmit)
selectElement.addEventListener('change', searchPhoto);