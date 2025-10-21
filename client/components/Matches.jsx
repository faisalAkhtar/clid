import React, { useState, useEffect } from 'react'
import { useInput } from 'ink'
import api from '../utils/api.js'
import MatchesForm from './forms/MatchesForm.jsx'

const Matches = ({ auth, setScreen }) => {
    const [profiles, setProfiles] = useState(null)
    const [loading, setLoading] = useState(true)
	const [msg, setMsg] = useState('')

    const fetchAllMatches = async () => {
		setLoading(true)
		try {
			const data = await api.get('/browse/matches', auth.token)
            setProfiles(data.profiles)
		} catch (e) {
            try {
                let err = JSON.parse(e)
                setMsg('Error loading profiles.\n' + err.error)
            } catch (err) {
                console.error(e)
                setMsg('Error loading profiles.')
            }
		} finally {
			setLoading(false)
		}
    }

    useInput((input, key) => {
		if (key.escape) setScreen('home')
	})

    useEffect(() => {
		fetchAllMatches()
	}, [])

    return <MatchesForm profiles={profiles} msg={msg} loading={loading} />
}

export default Matches
