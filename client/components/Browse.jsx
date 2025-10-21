import React, { useState, useEffect } from 'react'
import { Text, useInput } from 'ink'
import api from '../utils/api.js'
import ProfileForm from './forms/ProfileForm.js'

const Browse = ({ auth, setScreen }) => {
	const emptyProfile = { id: '', name: '', age: '', gender: '', location: '', interests: '', bio: '' }

    const [profile, setProfile] = useState(emptyProfile)
    const [loading, setLoading] = useState(true)
	const [msg, setMsg] = useState('')

	const normalizeProfile = (p) => ({
        id: p.id ?? undefined,
		name: p.name ?? '',
		age: p.age?.toString() ?? '',
		gender: p.gender?.toString() ?? '',
		location: p.location ?? '',
		interests: p.interests ?? '',
		bio: p.bio ?? '',
	})

	const fetchNextProfile = async () => {
		setLoading(true)
		try {
			const data = await api.get('/browse', auth.token)
            if (data.profiles.length === 0) {
                setProfile(emptyProfile)
                setMsg(`That's all for today. Login again tomorrow to get fresh matches!!`)
            } else {
                setProfile(normalizeProfile(data.profiles[0]))
                setMsg('')
            }
		} catch (e) {
            try {
                let err = JSON.parse(e)
                setMsg('Error loading profiles.\n' + err.error)
            } catch (err) {
                setMsg('Error loading profiles.')
            }
		} finally {
			setLoading(false)
		}
	}

	const handleSwipe = async (type) => {
		try {
			const revert = await api.post('/browse/swipe', { target_id: profile.id, type }, auth.token)
			if (type === 'like' && revert.match) {
				setMsg('💖 It’s a Match!')
                setTimeout(() => fetchNextProfile(), 1200)
            } else {
			    setTimeout(() => fetchNextProfile(), 800)
            }
		} catch (e) {
            try {
                let err = JSON.parse(e)
                setMsg('Error recording swipe.\n' + err.error)
            } catch (err) {
                setMsg('Error recording swipe.')
            }
			setTimeout(() => fetchNextProfile(), 1000)
		}
	}

	useEffect(() => {
		fetchNextProfile()
	}, [])

	useInput((input, key) => {
		if (key.escape) setScreen('home')

		if (key.leftArrow) handleSwipe('pass')
		else if (key.rightArrow) handleSwipe('like')
	})

	if (loading) return <ProfileForm profile={emptyProfile} msg={'Loading!'} mode="view" />

	if (!profile) return <ProfileForm profile={emptyProfile} msg={msg} mode="view" />

	return <ProfileForm profile={profile} msg={msg} mode="view" />
}

export default Browse
