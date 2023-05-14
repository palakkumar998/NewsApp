import React from 'react'
import loading from './loading.gif'

export default function Spinner() {
	return (
		<div className="text-center">
			<img
				className='my-3'
				src={loading}
				alt="Loading"
				style={{ width: '160px', height: '60px' }}
			/>
		</div>
	)
}
