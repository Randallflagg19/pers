import React, {useEffect, useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import Notfoundpage from './components/NotFoundPage/Notfoundpage'
import Login from './components/Login/Login'
import Main from './components/Main'
import './App.css'

export const UserContext = React.createContext<
	| {
	isLoggedIn: boolean;
	isGuest: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	setIsGuest: React.Dispatch<React.SetStateAction<boolean>>;
}
	| any
>(null)
export const AuthMessageContext = React.createContext<
	| {
	authMessage: string;
	setAuthMessage: React.Dispatch<React.SetStateAction<string>>;
}
	| any
>(null)

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isGuest, setIsGuest] = useState(false)
	const [authMessage, setAuthMessage] = useState('Требуется авторизация')

	const [images, setImages] = useState([])	//тут картиночки
	useEffect(() => {
		fetch('http://localhost:3001/api/getImages')
			.then(response => response.json())
			.then(data => {
				setImages(data)
			})
	}, [])
	return (
		<UserContext.Provider
			value={{isLoggedIn, setIsLoggedIn, isGuest, setIsGuest}}
		>
			<AuthMessageContext.Provider
				value={{
					authMessage,
					setAuthMessage
				}}
			>
				<Routes>
					<Route path="" element={<Login/>}/>
					<Route path="/main" element={<Main/>}/>
					<Route path="*" element={<Notfoundpage/>}/>
				</Routes>
				{/*{images.map((image: any, index: any) => (*/}
				{/*	<img width={200} height={150} key={index} src={`http://localhost:3001${image}`}*/}
				{/*	     alt="uploaded"/>*/}
				{/*))}*/}
			</AuthMessageContext.Provider>
		</UserContext.Provider>
	)
}

export default App
