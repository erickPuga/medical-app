import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import pg from 'pg';

dotenv.config()
const app = express()
const port = process.env.PORT || 3001
const secret = process.env.PORT || 'secret'
const pool = new pg.Pool()

app.use(cors())
app.use(express.json())

// Authentication middleware
function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.sendStatus(401).json({ error: 'Token not provided' })

         try {
            req.user = jwt.verify(token, secret)
            next()
        }
        catch (err) {
            res.status(401).json({ error: 'Invalid token' })
        }
}

// Register

app.post('/register', async (req, res) => {
    const { email, password } = req.body
    const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email', [email, password])
    res.json(result.rows[0])
})

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password])
    const user = result.rows[0]
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    
    const token = jwt.sign({ id: user.id, email:user,email }, secret)
    res.json({ token })
})

// Perfil

app.get('/me', auth, async (req, res) => {
    const result = await pool.query('SELECT id, email FROM users WHERE id = $1', [req.user.id])
    res.json( {success: true})
})

// Crear formulario
app.post('/forms', auth, async (req, res) => {
    const { data } = req.body
    await pool.query('INSERT INTO forms (user_id, data) VALUES ($1, $2)', [req.user.id, data])
    res.json({ success: true })
  })

// Obtener formularios

app.get('/forms', auth, async (req, res) => {
    const result = await pool.query('SELECT * FROM forms WHERE user_id = $1', [req.user.id])
    res.json(result.rows)
})

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
})

// Obtener todos los doctores
app.get('/doctors', auth, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM doctors');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch doctors' });
    }
});

// Crear un nuevo doctor
app.post('/doctors', auth, async (req, res) => {
    const { name, specialty } = req.body;
    if (!name || !specialty) {
        return res.status(400).json({ error: 'Name and specialty are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO doctors (name, specialty) VALUES ($1, $2) RETURNING *',
            [name, specialty]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create doctor' });
    }
});

// Ruta para el endpoint raíz
app.get('/', (req, res) => {
    res.send('Bienvenido al backend de la aplicación médica');
});