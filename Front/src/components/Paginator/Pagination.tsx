import React, {useMemo} from 'react'
import styles from './Pagination.module.css'

type PaginationProps = {
	currentPage: number
	setCurrentPage: (page: number) => void
	postsCount: number
	wordsOnPage: number
}

const Pagination: React.FC<PaginationProps> = ({currentPage, setCurrentPage, postsCount, wordsOnPage}) => {
	const pagesCount = Math.ceil(postsCount / wordsOnPage)
	const portionSize = 10
	const portionCount = Math.ceil(pagesCount / portionSize)
	const currentPortion = Math.ceil(currentPage / portionSize)

	const leftPortionPageNumber = (currentPortion - 1) * portionSize + 1
	const rightPortionPageNumber = Math.min(currentPortion * portionSize, pagesCount)

	const pagesItems = useMemo(() => {
		const pages = []
		for (let i = leftPortionPageNumber; i <= rightPortionPageNumber; i++) {
			pages.push(
				<button
					key={i}
					onClick={() => setCurrentPage(i)}
					className={currentPage === i ? styles.selectedPage : undefined}
				>
					{i}
				</button>
			)
		}
		return pages
	}, [leftPortionPageNumber, rightPortionPageNumber, currentPage, setCurrentPage])

	return (
		<span className={styles.pagination}>
			{currentPortion > 1 && (
				<button className={styles.prev}
				        onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
			)}
			{pagesItems}
			{currentPortion < portionCount && (
				<button className={styles.next}
				        onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
			)}
		</span>
	)
}

export default Pagination
