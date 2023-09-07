const API_URL = import.meta.env.VITE_API_URL
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY

const inputSearch = document.querySelector('.hero_centered-form-input')
const selectElement = document.getElementById('hero_select')
const submitBtn = document.querySelector('.hero_centered-form-btn')
const photosContainer = document.querySelector('.photos')
const warning = document.querySelector('.hero_centered--warning')
const closeModal = document.querySelector('.modal_content-close')
const modal = document.querySelector('.modal')
const modalImage = document.querySelector('.modal_img')
const selectSize = document.getElementById('select_choose-size')
const dowloadBtn = document.querySelector('.modal_download-button')

let perPage = 0
let photosResults
let isImageLoaded = false

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
			photosResults.value = ''
			selectElement.value = '0'
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
	modalImage.src = ''
	modalImage.id = ''
	isImageLoaded = false
}
const openModalBtn = e => {
	const { id: imgId } = e.target
	modal.style.display = 'flex'
	modalImage.id = imgId
	selectSize.value = '0'
	
	const clickedImg = document.getElementById(imgId)
	const altDescription = clickedImg.alt

	modalImage.alt = altDescription
}

const showPhotoInModal = () => {
	const { value: selectedSize } = selectSize
	const imgId = modalImage.id

	if (
		!photosResults ||
		imgId < 0 ||
		imgId >= photosResults.length ||
		!photosResults[imgId].urls ||
		!photosResults[imgId].urls[selectedSize]
	) {
		return
	}

	const imageUrl = photosResults[imgId].urls[selectedSize]
	modalImage.src = imageUrl
	isImageLoaded = true
}
const showButtonOnPhoto = () => {
	dowloadBtn.style.display = 'flex'
	modalImage.style.opacity = '0.6'
}

const hideButtonOnPhoto = () => {
	dowloadBtn.style.display = 'none'
	modalImage.style.opacity = '1'
}

const downloadImage = imageUrl => {
	const link = document.createElement('a')
	link.href = imageUrl
	link.target = '_blank'
	link.download = 'zdjecie.jpg'

	link.click()
}

inputSearch.addEventListener('change', searchPhoto)
inputSearch.addEventListener('keydown', handleKeyPress)
submitBtn.addEventListener('click', handleSubmit)
closeModal.addEventListener('click', closeModalBtn)
photosContainer.addEventListener('click', openModalBtn)
selectSize.addEventListener('change', showPhotoInModal)

modalImage.addEventListener('mousemove', function (event) {
	const modalImageRect = modalImage.getBoundingClientRect()
	const positionX = event.clientX - modalImageRect.left
	const positionY = event.clientY - modalImageRect.top
	const { value: selectedSize } = selectSize

	let conditionMet = false

	if (selectedSize === 'small') {
		conditionMet = positionX > 100 && positionX < 330 && positionY > 80 && positionY < 200
	} else if (selectedSize === 'regular') {
		conditionMet = positionX > 100 && positionX < 600 && positionY > 80 && positionY < 300
	}

	if (conditionMet) {
		showButtonOnPhoto()
	} else {
		hideButtonOnPhoto()
	}
})

dowloadBtn.addEventListener('click', downloadImage)
