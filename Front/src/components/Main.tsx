import React, {useContext, useMemo, useState, useCallback} from 'react'
import PostItem from './PostItem/PostItem'
import Inputs from './Inputs/Inputs'
import Pagination from './Paginator/Pagination'
import {UserContext} from '../Translator'
import {usePosts} from './usePosts'
import styles from './Main.module.css'
import {Link, useNavigate} from 'react-router-dom'

const Main = () => {
	const {isLoggedIn, setIsGuest, setIsLoggedIn, isGuest} = useContext(UserContext)
	const {posts, handleDeletePost, filterMatch, handleSearchChange, addNewPost, arrange} = usePosts(setIsLoggedIn)
	const navigate = useNavigate()

	const [currentPage, setCurrentPage] = useState(1)

	const wordsOnPage = 20
	const postsPortion = useMemo(() => {
		return posts.slice((currentPage - 1) * wordsOnPage, currentPage * wordsOnPage)
	}, [posts, currentPage])

	const postsList = useMemo(() => {
		return postsPortion.map(post => (
			<PostItem post={post} key={post.id} onDelete={handleDeletePost}/>
		))
	}, [postsPortion, handleDeletePost])

	const handleExit = useCallback(() => {
		localStorage.removeItem('TheToken')
		setIsLoggedIn(false)
		setIsGuest(false)
		localStorage.setItem('isGuest', 'false')
		navigate('/')
	}, [setIsLoggedIn, setIsGuest, navigate])

	const handleFilterMatch = useCallback(() => {
		filterMatch()
		setCurrentPage(1)
	}, [filterMatch])

	if (!isLoggedIn && !isGuest) {
		return <Link className={styles.authLink} to={'/'}>
			Авторизация
		</Link>
	}

	return (
		<div>
			<header className={styles.mainHeader}>
				<button className={styles.exit} onClick={handleExit}>Exit</button>
				<button className={styles.match} onClick={filterMatch}>
					dupl
				</button>
				<button className={styles.arrange} onClick={arrange}>
					sort
				</button>
				<form className={styles.search}>
					<label>
						Search:
						<input type="search" onChange={handleSearchChange}/>
					</label>
				</form>
			</header>
			<Inputs onAdd={addNewPost}/>
			<Pagination
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				postsCount={posts.length}
				wordsOnPage={wordsOnPage}
			/>
			<div>{postsList}</div>
		</div>
	)
}

export default Main
