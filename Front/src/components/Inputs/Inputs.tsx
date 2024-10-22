import React, {useContext, useRef} from 'react'
import {UserContext} from '../../Translator'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import styles from './Inputs.module.css'

const Inputs = ({
	onAdd
}: {
	onAdd: (word: string, translation: string) => void;
}) => {
	const wordInputRef = useRef<HTMLInputElement>(null)
	const {isLoggedIn} = useContext(UserContext)

	const initialValues = {word: '', translation: ''}

	const validationSchema = Yup.object({
		word: Yup.string().required('Обязательное поле'),
		translation: Yup.string().required('Обязательное поле')
	})

	const handleSubmit = (values: { word: string; translation: string },
		{resetForm}: { resetForm: () => void }) => {
		onAdd(values.word, values.translation)
		resetForm()
		wordInputRef.current?.focus()
	}

	return (
		<div>
			{isLoggedIn && (
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{() => (
						<Form className={styles.wrapper}>
							<div className={styles.inputWrapper}>
								<Field
									name="word"
									placeholder="word"
									className={styles.globalInput}
									innerRef={wordInputRef}
									autoComplete="off"
								/>
								<ErrorMessage name="word" component="div" className={styles.error}/>
								<div className={styles.gap}></div>
								<Field
									name="translation"
									placeholder="перевод"
									className={styles.globalInput}
									autoComplete="off"
								/>
								<ErrorMessage name="translation" component="div" className={styles.error}/>
								<button className={styles.add} type="submit">
									add
								</button>
							</div>
						</Form>
					)}
				</Formik>
			)}
		</div>
	)
}

export default Inputs
