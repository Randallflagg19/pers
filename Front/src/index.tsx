import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Translator from './Translator'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)
root.render(
	<BrowserRouter>
		<React.StrictMode>
			<Translator/>
		</React.StrictMode>
	</BrowserRouter>
)
