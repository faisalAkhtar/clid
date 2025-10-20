import fetch from 'node-fetch'

const API_URL = 'http://faisal.com:5000'

const api = {
	async post(path, data = {}, token) {
		return this._request('POST', path, data, token)
	},

	async get(path, token) {
		return this._request('GET', path, null, token)
	},

	async put(path, data = {}, token) {
		return this._request('PUT', path, data, token)
	},

	async _request(method, path, data, token) {
		const headers = { 'Content-Type': 'application/json' }
		if (token) headers['Authorization'] = `Bearer ${token}`

		const options = { method, headers }
		if (data && method !== 'GET') options.body = JSON.stringify(data)

		const res = await fetch(API_URL + path, options)
		if (!res.ok) {
			const err = await res.text()
            throw err
		}
		return res.json()
	},
}

export default api
