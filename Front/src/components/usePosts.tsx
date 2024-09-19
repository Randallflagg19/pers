import api from '../api/API'
import {useEffect, useState} from 'react'

export interface Post {
	id: number;
	word: string;
	translation: string;
}

export function usePosts(setIsLoggedIn: (value: boolean) => void) {
	const [posts, setPosts] = useState<Post[]>([])
	const [searchValue, setSearchValue] = useState('')

	const fetchWords = async () => {
		try {
			if (localStorage.getItem('TheToken')) {
				setIsLoggedIn(true)
			}
			const words = await api.fetchAllWords()
			setPosts(words)
		}
		catch (error) {
			console.error('Failed to fetch words:', error)
		}
	}

	useEffect(() => {
		fetchWords()
	}, [setIsLoggedIn])

	const handleDeletePost = (id: number) => {
		setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
	}

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value.toLowerCase())
	}

	const addNewPost = async (word: string, translation: string) => {
		try {
			const newWordData = await api.sendWords(word, translation)
			const newPost = {id: newWordData.id, word, translation}
			setPosts((prevPosts) => [newPost, ...prevPosts])
		}
		catch (error) {
			console.error('Failed to add new word:', error)
		}
	}

	const arrange = () => {
		setPosts((prevPosts) => {
			const sortedPosts = [...prevPosts].sort((a, b) =>
				a.word.localeCompare(b.word)
			)
			return sortedPosts
		})
	}

	return {
		posts: posts.filter((post) =>
			post.word.toLowerCase().includes(searchValue)
		),
		handleDeletePost,
		handleSearchChange,
		addNewPost,
		arrange,
		searchValue
	}
}
