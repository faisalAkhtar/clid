import fetch from 'node-fetch'

const API_URL = 'http://faisal.com:5000'

const api = {
	async post(path, data = {}, token) {
		const headers = { 'Content-Type': 'application/json' }
		if (token) headers['Authorization'] = `Bearer ${token}`

		const res = await fetch(API_URL + path, {
			method: 'POST',
			headers,
			body: JSON.stringify(data),
		})

		if (!res.ok) {
			const err = await res.text()
            throw err
		}
		return res.json()
	},
}

export default api
