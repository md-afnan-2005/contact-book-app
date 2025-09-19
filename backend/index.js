const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { run, all, get } = require('./db')

const app = express()
app.use(cors())
app.use(express.json())

function validEmail(e) { return /^\S+@\S+\.\S+$/.test(e) }
function validPhone(p) { return /^\d{10}$/.test(p) }

app.post('/api/contacts', async (req, res) => {
    try {
        const { name, email, phone } = req.body
        if (!name || !email || !phone) return res.status(400).json({ message: 'Missing fields' })
        if (!validEmail(email)) return res.status(400).json({ message: 'Invalid email' })
        if (!validPhone(phone)) return res.status(400).json({ message: 'Invalid phone' })
        const result = await run('INSERT INTO contacts (name,email,phone) VALUES (?,?,?)', [name, email, phone])
        const newContact = await get('SELECT * FROM contacts WHERE id=?', [result.lastID])
        res.status(201).json(newContact)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error' })
    }
})

app.get('/api/contacts', async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 10
        if (page < 1) page = 1
        const offset = (page - 1) * limit
        const contacts = await all('SELECT * FROM contacts ORDER BY id DESC LIMIT ? OFFSET ?', [limit, offset])
        const row = await get('SELECT COUNT(*) as count FROM contacts')
        res.json({ contacts, total: row.count, page, limit })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error' })
    }
})

app.delete('/api/contacts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if (!id) return res.status(400).json({ message: 'Invalid id' })
        const result = await run('DELETE FROM contacts WHERE id=?', [id])
        if (result.changes === 0) return res.status(404).json({ message: 'Not found' })
        res.status(204).end()
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error' })
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
