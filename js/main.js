console.log(import.meta.env.VITE_ACCESS_KEY)

const API_URL = import.meta.env.VITE_API_URL
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY

;(() => {
	fetch(`${API_URL}/search/photos/?client_id=${ACCESS_KEY}&query=dog`)
		.then(res => res.json())
		.then(data => console.log(data))
})()
