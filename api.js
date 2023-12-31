import express from 'express'
import sqlite3 from 'sqlite3'
import cors from 'cors'

const app = express()
const port = 4001
const db = new sqlite3.Database('memories.db')

app.use(express.json())
app.use(cors()) // Allow CORS requests

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      timestamp DATE,
      imageKey TEXT
    )
  `)
})

app.get('/memories', (req, res) => {
  const { sort } = req.query
  let query = 'SELECT * FROM memories'

  if (sort === 'oldest') {
    query += ' ORDER BY timestamp ASC'
  } else if (sort === 'newest') {
    query += ' ORDER BY timestamp DESC'
  }

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ memories: rows })
  })
})

app.post('/memories', (req, res) => {
  const { name, description, timestamp, imageKey } = req.body

  if (!name || !description || !timestamp || !imageKey) {
    res.status(400).json({
      error:
        'Please provide all fields: name, description, timestamp, imageKey',
    })
    return
  }

  const stmt = db.prepare(
    'INSERT INTO memories (name, description, timestamp, imageKey) VALUES (?, ?, ?, ?)'
  )
  stmt.run(name, description, timestamp, imageKey, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.status(201).json({ message: 'Memory created successfully' })
  })
})

app.get('/memories/:id', (req, res) => {
  const { id } = req.params
  db.get('SELECT * FROM memories WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    if (!row) {
      res.status(404).json({ error: 'Memory not found' })
      return
    }
    res.json({ memory: row })
  })
})

app.put('/memories/:id', (req, res) => {
  const { id } = req.params
  const { name, description, timestamp, imageKey } = req.body

  if (!name || !description || !timestamp || !imageKey) {
    res.status(400).json({
      error:
        'Please provide all fields: name, description, timestamp, imageKey',
    })
    return
  }

  const stmt = db.prepare(
    'UPDATE memories SET name = ?, description = ?, timestamp = ?, imageKey = ? WHERE id = ?'
  )
  stmt.run(name, description, timestamp, imageKey, id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory updated successfully' })
  })
})

app.delete('/memories/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM memories WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory deleted successfully' })
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
