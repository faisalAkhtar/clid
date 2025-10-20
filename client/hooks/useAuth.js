import { useEffect, useState } from 'react'
import api from '../utils/api.js'
import storage from '../utils/storage.js'

export default function useAuth() {
	const [token, setToken] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const stored = storage.getToken()
		if (stored) setToken(stored)
		setLoading(false)
	}, [])

	const signIn = async (username, password) => {
		const res = await api.post('/auth/signin', { username, password })
		setToken(res.token)
		storage.saveToken(res.token)
		return res
	}

	const signUp = async (username, email, password) => {
		const res = await api.post('/auth/signup', { username, email, password })
		return res
	}

	const signOut = async () => {
		if (!token) return
		await api.post('/auth/signout', {}, token)
		storage.clearToken()
		setToken(null)
	}

	return { token, loading, signIn, signUp, signOut }
}
