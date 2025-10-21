import React from 'react'
import { Box, Text } from 'ink'
import TextInput from 'ink-text-input'

const ProfileForm = ({ profile, focus, onChange, msg, mode = 'edit' }) => {
	const isView = mode === 'view'
	const color = isView ? "yellowBright" : "redBright"

	const renderField = (label, field, placeholder) => {
		if (isView) {
			return (
				<Text>
					{label.slice(3).padEnd(14)}: <Text color="white">{profile[field] || '...'}</Text>
				</Text>
			)
		}

		return (
			<Text>
				{label.padEnd(14)}:{' '}
				<TextInput
					value={profile[field] ?? ''}
					onChange={(v) => onChange(field, v)}
					placeholder={placeholder}
					focus={focus === field}
				/>
			</Text>
		)
	}

	return (
		<Box flexDirection="column" borderStyle="double" borderColor={color} paddingX={2}>
			<Text> </Text>
			<Text color={color} bold>
				{'               '}
				{isView ? '  Browse  ' : 'My Profile'}
				{'               '}
			</Text>
			<Text>────────────────────────────────────────</Text>

			<Text> </Text>
			{renderField('[N] Name', 'name', 'Enter name')}
			<Text> </Text>
			{renderField('[A] Age', 'age', 'Enter age')}
			<Text> </Text>
			{renderField('[G] Gender', 'gender', 'Enter gender')}
			<Text> </Text>
			{renderField('[L] Location', 'location', 'Enter location')}
			<Text> </Text>
			{renderField('[I] Interests', 'interests', 'Enter interests')}
			<Text> </Text>
			{renderField('[B] Bio', 'bio', 'Enter bio')}
			<Text> </Text>

			{!isView && (
				<Text color="gray">
					{focus !== 'bio' && focus !== 'none' && '<Enter> Next | <Esc> Back'}
					{focus === 'bio' && '<Enter> Done | <Esc> Back'}
					{focus === 'none' && '<N/A/G/L/I/B> Edit Fields  <Y> Submit  <Esc> Exit'}
				</Text>
			)}
			{!isView && msg && <Text color={msg.includes('failed') ? 'red' : 'yellow'}>{msg}</Text>}

			{isView && (
				<Text color="gray">
					[←] Pass   [Esc] Exit   [→] Like
				</Text>
			)}
			{isView && msg && <Text color={msg.includes('Match') ? 'magentaBright' : 'yellow'}>{msg}</Text>}
			<Text> </Text>
		</Box>
	)
}

export default ProfileForm
