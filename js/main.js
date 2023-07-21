const API_URL = import.meta.env.VITE_API_URL
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY

const inputSearch = document.querySelector('.hero_centered-form-input')
const selectElement = document.getElementById('hero_select')
const submitBtn = document.querySelector('.hero_centered-form-btn')
const photosContainer = document.querySelector('.photos')
const countPage = document.querySelector('.hero_count-of-page')
const warning = document.querySelector('.hero_centered--warning')
const closeModal = document.querySelector('.modal_content-close')
const modal = document.querySelector('.modal')
const modalImage = document.querySelector('.modal_img')
const selectSize = document.getElementById('select_choose-size')

let perPage = 0

const createElement = data => {
	data.results.forEach((photo, index) => {
		const linkElement = document.createElement('a')
		linkElement.href = photo.links.html
		linkElement.target = '_blank'
		linkElement.addEventListener('click', e => {
			e.preventDefault()
			modal.style.display = 'block'
		})
		const imgElement = document.createElement('img')
		imgElement.src = photo.urls.small
		imgElement.alt = photo.alt_description
		imgElement.id = index
		linkElement.appendChild(imgElement)
		photosContainer.appendChild(linkElement)
	})
}
let photosResults

const searchPhoto = () => {
	if (selectElement.value === '0') {
		return
	}
	warning.style.display = 'none'

	if (!inputSearch.value || !selectElement.value) {
		photosContainer.innerHTML = ''
		return
	}
	warning.style.display = 'none'
	photosContainer.innerHTML = ''
	const count = parseInt(selectElement.value)
	perPage = count
	fetch(`${API_URL}/search/photos/?client_id=${ACCESS_KEY}&query=${inputSearch.value}&per_page=${count}`)
		.then(res => res.json())
		.then(data => {
			photosResults = data.results
			createElement(data)
			inputSearch.value = ''
			
		})
}

const handleSubmit = e => {
	e.preventDefault()
	if (selectElement.value === '0') {
		warning.style.display = 'block'
		return
	}
	warning.style.display = 'none'
	searchPhoto()
}

const handleKeyPress = e => {
	if (e.key === 'Enter') {
		e.preventDefault()
		if (selectElement.value === '0') {
			warning.style.display = 'block'
			return
		}
		warning.style.display = 'none'
		searchPhoto()
	}
}

const closeModalBtn = () => {
	modal.style.display = 'none'
}
const openModalBtn = e => {
	const { id: imgId } = e.target
	modal.style.display = 'flex'
	const imageUrl = photosResults[imgId].urls.small
	modalImage.src = imageUrl
	modalImage.id = imgId

	
}

const showPhotoInModal = () => {
	const { value: selectedSize } = selectSize
	const imageUrl = photosResults[modalImage.id].urls[selectedSize]
	modalImage.src = imageUrl
	
}

inputSearch.addEventListener('change', searchPhoto)
inputSearch.addEventListener('keydown', handleKeyPress)
submitBtn.addEventListener('click', handleSubmit)
selectElement.addEventListener('change', searchPhoto)
closeModal.addEventListener('click', closeModalBtn)
photosContainer.addEventListener('click', openModalBtn)
selectSize.addEventListener('change', showPhotoInModal)
