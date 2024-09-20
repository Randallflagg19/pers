import React from 'react'
import styles from './MatchButton.module.css'

export default function MatchButton({filterMatch}: any) {

	return (
		<button className={styles.match} onClick={filterMatch}>
			dupl
		</button>
	)
}
