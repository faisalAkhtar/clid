import React, { useState } from 'react'
import { useInput } from 'ink'
import SignInForm from './forms/SignInForm.js'

const SignIn = ({ setScreen, auth }) => {
	const [formData, setFormData] = useState({ username: '', password: '' })
	const [focus, setFocus] = useState('username')	// 'username', 'password', or 'none'
	const [msg, setMsg] = useState('')

	const handleChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
	}

	const handleSubmit = async () => {
		try {
			setMsg('Logging in...')
			await auth.signIn(formData.username, formData.password)
			setScreen('home')
		} catch (e) {
			try {
				let err = JSON.parse(e)
				setMsg('Login failed. Check credentials.\n' + err.error)
			} catch (err) {
				setMsg('Login failed. Check credentials.')
			}
		}
	}

	useInput(async (input, key) => {
		if (key.escape && focus === 'none') return setScreen('welcome')

		if (key.escape && focus !== 'none') setFocus('none')

		if (key.return) {
			if (focus === 'username') setFocus('password')
			else if (focus === 'password') setFocus('none')
			else if (focus === 'none') setMsg('Press Y to confirm login, or U/P to edit fields.')
		}

		if (!key.return && !key.escape) {
			const i = input.toLowerCase()

			if (focus === 'none') {
				if (i === 'u') setFocus('username')
				if (i === 'p') setFocus('password')
				if (i === 'y') await handleSubmit()
			}
		}
	})

	return <SignInForm username={formData.username} password={formData.password} focus={focus} onChange={handleChange} msg={msg} />
}

export default SignIn
