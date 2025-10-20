import React, { useState, useEffect } from 'react'
import { Text, useInput } from 'ink'
import api from '../utils/api.js'
import ProfileForm from './forms/ProfileForm.jsx'

const Profile = ({ auth, setScreen }) => {
	const [profile, setProfile] = useState(null)
	const [loading, setLoading] = useState(true)
	const [focus, setFocus] = useState('name')	// 'name', 'age', 'gender', 'location', 'interests', 'bio' or 'none'
	const [msg, setMsg] = useState('')

	const handleChange = (field, value) => {
		setProfile((prev) => ({ ...prev, [field]: value }))
	}

	const handleSubmit = async (updated) => {
		try {
			await api.put('/profile', updated, auth.token)
			setMsg('Profile updated successfully!')
			setProfile(updated)
			setTimeout(() => setScreen('home'), 1000)
		} catch {
			setMsg('Error updating profile.')
		}
	}

	const normalizeProfile = (p) => ({
		name: p.name ?? '',
		age: p.age?.toString() ?? '',
		gender: p.gender?.toString() ?? '',
		location: p.location ?? '',
		interests: p.interests ?? '',
		bio: p.bio ?? '',
	})

	useEffect(() => {
		const loadProfile = async () => {
			try {
				const data = await api.get('/profile', auth.token)
				setProfile(normalizeProfile(data.profile))
			} catch (e) {
				try {
					let err = JSON.parse(e)
					setMsg('Load profile failed.\n' + err.error)
				} catch (err) {
					setMsg('Load profile failed.')
				}
			} finally {
				setLoading(false)
			}
		}
		loadProfile()
	}, [])

	useInput(async (input, key) => {
		if (key.escape && focus === 'none') return setScreen('home')

		if (key.escape && focus !== 'none') setFocus('none')

		if (key.return) {
			if (focus === 'name') setFocus('age')
			else if (focus === 'age') setFocus('gender')
			else if (focus === 'gender') setFocus('location')
			else if (focus === 'location') setFocus('interests')
			else if (focus === 'interests') setFocus('bio')
			else if (focus === 'bio') setFocus('none')
			else if (focus === 'none') setMsg('Press Y to confirm signup, or N/A/G/L/I/B to edit fields.')
		}

		if (!key.return && !key.escape) {
			const i = input.toLowerCase()

			if (focus === 'none') {
				if (i === 'n') setFocus('name')
				if (i === 'a') setFocus('age')
				if (i === 'g') setFocus('gender')
				if (i === 'l') setFocus('location')
				if (i === 'i') setFocus('interests')
				if (i === 'b') setFocus('bio')
				if (i === 'y') await handleSubmit(profile)
			}
		}
	})

	if (loading) return <Text>Loading profile...</Text>
	if (!profile) return <Text color="red">No profile found.</Text>

	return <ProfileForm profile={profile} focus={focus} onChange={handleChange} msg={msg} />
}

export default Profile
