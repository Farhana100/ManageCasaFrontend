import React from 'react'

const Progress_bar = ({bgcolor,progress,height}) => {
	
	const Parentdiv = {
		height: height,
		width: '70%',
		backgroundColor: 'whitesmoke',
		borderRadius: 40,
		margin: 20
	}
	
	const Childdiv = {
		height: '100%',
		width: `${progress}%`,
		backgroundColor: bgcolor,
	    borderRadius:40,
		textAlign: 'right'
	}
	
	const progresstext = {
		padding: 5,
		color: 'white',
		fontWeight: 350
	}
		
	return (
	<div style={Parentdiv}>
	<div style={Childdiv}>
		<span style={progresstext}>{`${progress}%`}</span>
	</div>
	</div>
	)
}

export default Progress_bar;
