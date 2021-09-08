const express = require('express')
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

let notes = [
  {
    id: 1,
    content: 'estudiar las clases',
    date: '2019-03-30',
    importante: false
  },
  { id: 2, content: 'repasar', date: '2019-04-30', importante: true },
  {
    id: 3,
    content: 'me tengo que suscribir',
    date: '2019-05-30',
    importante: false
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find((note) => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id === !id)
  response.status(404).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    response.status(400).json({
      error: 'note.content is missing'
    })
  }
  app.use((request, response) => {
    response.status(404).json({
      error: 'not found'
    })
  })

  const ids = notes.map((note) => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== 'undefined' ? note.important : false
  }

  notes = [...notes, newNote]

  response.json(newNote)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`corriendo en puerto ${PORT}`)
})
