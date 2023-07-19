import express from 'express'

import { getNotes, getNote, createNote , deleteNote , 
  updateNote} from './database.js'

const app = express()

app.use(express.json())
app.get('/', (req, res) => {
  res.send('hello worlds' )
 })
app.get("/retreivenotes", async (req, res) => {
  const notes = await getNotes()
  res.send(notes)
})

app.get("/retreivenote/:id", async (req, res) => {
  const id = req.params.id
  const note = await getNote(id)
  res.send(note)
})

app.post("/createnote", async (req, res) => {
  const { title, contents } = req.body
  const note = await createNote(title, contents)
  res.status(201).send(note)
})
app.post("/deleteNote", async (req, res) => {
  const { id } = req.body
  const note = await deleteNote(id)
  res.status(201).send(note)
})
app.post("/updateNote", async (req, res) => {
  const { id,title, contents } = req.body
  const note = await updateNote(id,title,contents)
  res.status(201).send(note)
})




app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke ')
})

app.listen(process.env.MYSQL_PORT, () => {
  console.log('Server is running on port 3000')
})