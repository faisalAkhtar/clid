import React, { useState } from 'react'
import { useInput } from 'ink'
import SignUpForm from './forms/SignUpForm.js'

const SignUp = ({ setScreen, auth }) => {
	const [formData, setFormData] = useState({ username: '', email: '', password: '' })
	const [focus, setFocus] = useState('username')	// 'username', 'email', 'password', or 'none'
	const [msg, setMsg] = useState('')

	const handleChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
	}

	const handleSubmit = async () => {
		try {
			setMsg('Signing up...')
			await auth.signUp(formData.username, formData.email, formData.password)
			setMsg('Signup successful! Redirecting...')
			setTimeout(() => setScreen('signin'), 1000)
		} catch (e) {
			try {
				let err = JSON.parse(e)
				setMsg('Signup failed.\n' + err.error)
			} catch (err) {
				setMsg('Signup failed.')
			}
		}
	}

	useInput(async (input, key) => {
		if (key.escape && focus === 'none') return setScreen('welcome')

		if (key.escape && focus !== 'none') setFocus('none')

		if (key.return) {
			if (focus === 'username') setFocus('email')
			else if (focus === 'email') setFocus('password')
			else if (focus === 'password') setFocus('none')
			else if (focus === 'none') setMsg('Press Y to confirm signup, or U/E/P to edit fields.')
		}

		if (!key.return && !key.escape) {
			const i = input.toLowerCase()

			if (focus === 'none') {
				if (i === 'u') setFocus('username')
				if (i === 'e') setFocus('email')
				if (i === 'p') setFocus('password')
				if (i === 'y') await handleSubmit()
			}
		}
	})

	return <SignUpForm username={formData.username} email={formData.email} password={formData.password} focus={focus} onChange={handleChange} msg={msg} />
}

export default SignUp
