import jwt from 'jsonwebtoken'
import express from 'express'
import cors from 'cors'
import pg from 'pg'
/////////////////////////////////////

//multer почитать
//
//
import multer from 'multer'
import fs from 'fs'
import {fileURLToPath} from 'url'
import path from 'path'
//
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const imageDirectory = path.join(__dirname, 'uploads')
//
if (!fs.existsSync(imageDirectory)) {
    fs.mkdirSync(imageDirectory, {recursive: true})
}

// обработка/сохранение файлов (мидлвейр)

// создаем стор


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageDirectory)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now() + '-' + Math.round(Math.random() * 159)}.jpg`)
    }
})

//это что?
const upload = multer({storage})

//////////////////////////////////////////////

const PORT = 3001
const {Pool} = pg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db1',
    password: '123',
    port: '5432'
})

const app = express()

app.use(express.json())
app.use(cors())


///////////////////////

// 1 фото

app.get('/api/uploads/:filename', async (req, res) => {
    const imageName = req.params.filename
    const imagePath = path.join(imageDirectory, imageName)

    res.sendFile(imagePath, err => {
        if (err) {
            res.status(404).send('image not found')
        }
    })
})

// загрузить на сервер

app.post('/api/upload', upload.single('image'), async (req, res) => {
    const file = req.file

    if (!file) {
        return res.status(400).send('No file uploads')
    }

    res.json({
        message: 'File success upload',
        filename: file.filename,
        path: `/api/uploads/${file.filename}`
    })
})

//получить все


app.get('/api/getImages', async (req, res) => {
    const filesArr = fs.readdirSync(imageDirectory, {withFileTypes: true})
    const fileNames = filesArr.map(file => {
        return `/api/uploads/${file.name}`
    })

    return res.json(fileNames)
})

///////////////////////////////////////////////////

app.get('/api/check', async (req, res) => {
    res.send('OK server working, you\'re goood')
})

app.post('/api/registation', async (req, res) => {
    const {username, password} = req.body
    try {
        const checkUserName = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        )

        if (checkUserName.rows.length) {
            res.status(401).send('Пользователь уже зарегистрирован')
            return
        }

        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
            [username, password]
        )
        const userId = result.rows[0].id
        res.status(201).json({userId})
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

app.post('/api/login', async (req, res) => {
    const {username, password} = req.body

    const user = await pool.query(
        'SELECT * FROM users WHERE username=$1 AND password=$2',
        [username, password]
    )

    if (user.rows.length) {
        const token = jwt.sign(
            {
                username: username,
                user_id: user.rows[0].id
                // , role: "admin"
            },
            'SECRET_KEY',
            {
                expiresIn: 9999999
            }
        )

        res.send({token: token})
    } else {
        res.status(403).send('unauthorize')
    }
})

const validateUser = async (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) {
        return res.status(403).send('No token provided.')
    } else {
        jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
            if (err) {
                return res.status(500).send('Failed auth token')
            }

            req.username = decoded.username
            req.user_id = decoded.user_id
            console.log(req.user_id)
            next()
        })
    }
}

app.put('/api/translator/write', validateUser, async (req, res) => {
    const body = req.body

    // При создании word мы указываем кто конекретно создает это слово
    // Логику надо переписать + переписать БД
    try {
        const result = await pool.query(
            `INSERT INTO words1 ("en", "ru","user_id") VALUES ($1, $2, $3) RETURNING id`,
            [body.en, body.ru, req.user_id]
        )

        console.log([body.en, body.ru, req.user_id])
        const newWordId = result.rows[0].id
        res.send({id: newWordId, en: body.en, ru: body.ru})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

app.get('/api/translator/get', validateUser, async (req, res) => {
    try {
        // Получаем только слова, которые принадлежат пользователю
        const data = await pool.query(`SELECT * FROM words1 WHERE
        user_id = $1 ORDER BY id DESC`, [req.user_id])
        res.json(data.rows)
        console.log([req.user_id])

    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

app.get('/api/translator/guest/get', async (req, res) => {
    try {
        // Получаем все слова
        const data = await pool.query(`SELECT * FROM words1 ORDER BY id DESC`
        )
        res.json(data.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

app.delete('/api/translator/delete', validateUser, async (req, res) => {
    try {
        const idToDelete = req.body.id
        await pool.query(`DELETE FROM words1 WHERE id = $1`, [idToDelete])
        res.status(200).json({message: 'Word deleted successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

app.get('/api/test', (req, res) => {
    console.log('test was success')
    res.status(200).json({message: 'ok'})

})

app.listen(PORT, () => {
    console.log('this server works')
})

// При ините фронта (в компоненте апп) мы создаем подписку на сокет joinUsers
// На фронт приходит сообщение, мы запускаем функцию которая рисует табличку.
// появляется табличка сверху (ВАМ УВЕДОМЛЕНИЕ (текст))

// БЭК - Устанавливаем вебсокеты socket.io, смотрим как отправлять эти вебсокеты на фронт
// отправляем сообщение, при заходе каждого нового пользователя
// https://github.com/Shoxip/chatik/blob/master/backend/index.js