import './App.css';
import React, { Fragment, useEffect, useState } from 'react';

let originalMin = 0
let originalSec = 0
let timeoutFunc

function App() {
	const [min, setMin] = useState(0)
	const [sec, setSec] = useState(0)
	const [isCountingDown, setIsCountingDown] = useState(false)

	const minRef = React.useRef()
	const secRef = React.useRef()

	useEffect(() => {
		console.log('useEffect', min, sec, isCountingDown)
		if (isCountingDown) {
			timeoutFunc = setTimeout(() => {
				if (sec > 0) {
					setSec(sec - 1)
				} else if (sec === 0 && min > 0) {
					setSec(59)
					setMin(min - 1)
				} else {
					setIsCountingDown(false)
				}
			}, 1000)
		}
	}, [min, sec, isCountingDown])


	const onStart = () => {
		originalMin = minRef.current.value || 0
		originalSec = secRef.current.value || 0

		if (originalSec > 60) {
			const oldSec = originalSec
			originalSec = oldSec % 60
			originalMin = Number(originalMin) + Math.floor(oldSec / 60)
		}

		minRef.current.value = originalMin
		secRef.current.value = originalSec

		clearTimeout(timeoutFunc)
		setMin(originalMin)
		setSec(originalSec)
		setIsCountingDown(true)
	}

	const onPause = () => {
		console.log('onPause', min, sec)
		clearTimeout(timeoutFunc)
		setIsCountingDown(!isCountingDown)
	}

	const onReset = () => {
		console.log('reset', originalMin, originalSec)
		clearTimeout(timeoutFunc)
		setMin(originalMin)
		setSec(originalSec)
		setIsCountingDown(false)
	}

	const toDisplay = value => value < 10 ? '0' + value : value

	return (
		<Fragment>
			<label>
				<input type="number" ref={minRef} />
				Minutes
			</label>
			<label>
				<input type="number" ref={secRef} />
				Seconds
			</label>

			<button onClick={onStart}>START</button>
			<button onClick={onPause}>PAUSE / RESUME</button>
			<button onClick={onReset}>RESET</button>

			<h1 data-testid="running-clock">{toDisplay(min)}:{toDisplay(sec)}</h1>
		</Fragment>
	);
}

export default App;
