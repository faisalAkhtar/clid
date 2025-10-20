import React, { useState } from 'react'
import { Box, Text, useInput } from 'ink'
import TextInput from 'ink-text-input'

const ProfileForm = ({ profile, focus, onChange, msg }) => {
	return (
		<Box flexDirection="column" borderStyle="double" borderColor="yellowBright" paddingX={2}>
			<Text> </Text>
			<Text color="yellowBright" bold>               My Profile               </Text>
			<Text>────────────────────────────────────────</Text>

			<Text> </Text>
			<Text>
                [N] Name{'      '}:{' '}
				<TextInput
					value={profile.name}
					onChange={(v) => onChange('name', v)}
					placeholder="Enter name"
					focus={focus === 'name'}
				/>
			</Text>

			<Text> </Text>
			<Text>
				[A] Age{'       '}:{' '}
				<TextInput
					value={profile.age}
					onChange={(v) => onChange('age', v)}
					placeholder="Enter age"
					focus={focus === 'age'}
				/>
			</Text>

			<Text> </Text>
			<Text>
				[G] Gender{'    '}:{' '}
				<TextInput
					value={profile.gender}
					onChange={(v) => onChange('gender', v)}
					placeholder="Enter gender"
					focus={focus === 'gender'}
				/>
			</Text>

			<Text> </Text>
			<Text>
				[L] Location{'  '}:{' '}
				<TextInput
					value={profile.location}
					onChange={(v) => onChange('location', v)}
					placeholder="Enter location"
					focus={focus === 'location'}
				/>
			</Text>

			<Text> </Text>
			<Text>
				[I] Interests{' '}:{' '}
				<TextInput
					value={profile.interests}
					onChange={(v) => onChange('interests', v)}
					placeholder="Enter interests"
					focus={focus === 'interests'}
				/>
			</Text>

			<Text> </Text>
			<Text>
				[B] Bio{'       '}:{' '}
                <TextInput
					value={profile.bio}
                    onChange={(v) => onChange('bio', v)}
					placeholder="Enter bio"
					focus={focus === 'bio'}
                />
            </Text>

			<Text> </Text>
			<Text color="gray">
				{focus !== 'bio' && focus !== 'none' && '<Enter> Next | <Esc> Back'}
				{focus === 'bio' && '<Enter> Done | <Esc> Back'}
				{focus === 'none' && '<N/A/G/L/I/B> Edit Fields  <Y> Submit  <Esc> Exit'}
			</Text>

			{msg && <Text color={msg.includes('failed') ? 'red' : 'yellow'}>{msg}</Text>}
			<Text> </Text>
		</Box>
	)
}

export default ProfileForm
