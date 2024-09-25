class API {
	url: string

	constructor(url: string) {
		this.url = url
	}

	registration = async (login: string, password: string) => {
		try {
			const response = await fetch(`${this.url}/registation`, {
				headers: {'Content-Type': 'application/json'},
				method: 'POST',
				body: JSON.stringify({username: login, password: password})
			})
			return response.ok
		}
		catch (error) {
			return false
		}
	}

	fetchAllWords = async () => {
		try {
			const token = localStorage.getItem('TheToken')
			if (!token) {
				throw new Error('No token found')
			}

			const response = await fetch(`${this.url}/translator/get`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': localStorage.getItem('TheToken') || ''
				}
			})

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const data = await response.json()

			const arrayOfWords = data.map((word: any) => ({
				id: word.id,
				word: word.en,
				translation: word.ru
			}))
			return arrayOfWords
		}
		catch (error) {
			console.error('Failed to fetch words:', error)
			return []
		}
	}
	fetchGuestWords = async () => {
		try {
			const response = await fetch(`${this.url}/translator/guest/get`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const data = await response.json()

			const arrayOfWords = data.map((word: any) => ({
				id: word.id,
				word: word.en,
				translation: word.ru
			}))
			return arrayOfWords
		}
		catch (error) {
			console.error('Failed to fetch words:', error)
			return []
		}
	}
	sendWords = async (en: string, ru: string) => {
		const response = await fetch(`${this.url}/translator/write`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('TheToken') || ''
			},
			body: JSON.stringify({en, ru})
		})
		if (!response.ok) throw new Error('Ошибка при отправке данных на сервер')
		return await response.json()
	}

	login = async (login: string, password: string) => {
		try {
			const response = await fetch(`${this.url}/login`, {
				headers: {'Content-Type': 'application/json'},
				method: 'POST',
				body: JSON.stringify({username: login, password: password})
			})
			if (!response.ok) {
				throw new Error('Invalid login or password')
			}
			const data = await response.json()
			return data
		}
		catch (error) {
			throw new Error('Invalid login or password')
		}
	}

	delete = async (id: number) => {
		try {
			await fetch(`${this.url}/translator/delete`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': localStorage.getItem('TheToken') || ''
				},
				body: JSON.stringify({id})
			})
		}
		catch (error) {
			throw new Error('Ошибка при удалении слова с сервера')
		}
	}
}

// let api = new API('http://localhost:3001/api')

let api = new API('http://91.210.170.148/api')

export default api
