import React, {useContext, useMemo, useState} from 'react'
import Exit from './Exit/Exit'
import PostItem from './PostItem/PostItem'
import LinkAuth from './LinkAuth/LinkAuth'
import Inputs from './Inputs/Inputs'
import MatchButton from './MatchButton/MatchButton'
import ArrangeButton from './ArrangeButton/ArrangeButton'
import {UserContext} from '../App'
import {usePosts} from './usePosts'
import styles from './Main.module.css'

export default function Main() {
	const {isLoggedIn, setIsLoggedIn, isGuest} = useContext(UserContext)

	const {posts, handleDeletePost, filterMatch, handleSearchChange, addNewPost, arrange} =
		usePosts(setIsLoggedIn)

	const [currentPage, setCurrentPage] = useState(1)

	const wordsOnPage = 20
	const pagesPortionSize = 10
	const totalWordsCount = posts.length
	//всего страниц и всего порций страниц

	let [portionNumber, setPortionNumber] = useState(1)

	let pagesCount = Math.ceil(totalWordsCount / wordsOnPage)

	//количество порций страниц это количество страниц/размер порции 5
	let portionCount = Math.ceil(pagesCount / pagesPortionSize)
	//   let pagesPortionSizeCount = Math.ceil(pagesCount / pagesPortionSize);

	//порция начинается с:
	//номера порции минус один помноженного на коли-во в порции страниц. +1
	//заканчивается номером порции помноженного на кол-во страниц
	let leftPortionPageNumber = (portionNumber - 1) * pagesPortionSize + 1
	let rightPortionPageNumber = portionNumber * pagesPortionSize

	let portion = wordsOnPage * (currentPage - 1)
	let postsPortion = posts.slice(portion, portion + wordsOnPage)

	const postsList = useMemo(() => {
		return postsPortion.map((post: any) => (
			<PostItem post={post} key={post.id} onDelete={handleDeletePost}/>
		))
	}, [posts])

	let pages = []

	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}
	if (!isLoggedIn && !isGuest) {
		return <LinkAuth/>
	}

	let pagesItems = pages
		.filter(
			(page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber
		)
		.map((page) => {
			return (
				<button
					onClick={() => {
						setCurrentPage(page)
					}}
					key={page}
					className={currentPage === page ? styles.selectedPage : undefined}
				>
					{page}{' '}
				</button>
			)
		})

	return (
		<div>
			<div className={styles.mainHeader}>
				<Exit/>
				<MatchButton posts={posts} filterMatch={filterMatch}/>
				<ArrangeButton arrange={arrange}/>
				<form className={styles.search}>
					Search:
					<input onChange={handleSearchChange} type="search"/>
				</form>
			</div>
			<Inputs onAdd={addNewPost}/>

			<span className={styles.pagination}>
        {portionNumber > 1 && (
	        <button
		        className={styles.prev}
		        onClick={() => {
			        setPortionNumber(portionNumber - 1)
		        }}
	        >
		        Prev
	        </button>
        )}

				{pagesItems}

				{portionCount > portionNumber && (
					<button
						className={styles.next}
						onClick={() => {
							setPortionNumber(portionNumber + 1)
						}}
					>
						Next
					</button>
				)}
      </span>

			{postsList}
		</div>
	)
}
