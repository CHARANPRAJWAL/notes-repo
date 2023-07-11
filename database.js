import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM notes")
  return rows
}

export async function getNote(id) {                  //r
  const [rows] = await pool.query(`
  SELECT * 
  FROM notes
  WHERE id = ?
  `, [id])
  return rows[0]
}

export async function createNote(title, contents) {      //c
  const [result] = await pool.query(`
  INSERT INTO notes (title, contents)
  VALUES (?, ?)
  `, [title, contents])
  const id = result.insertId
  return getNote(id)
}
export async function deleteNote(id) {                    //d
  const [result] = await pool.query(`
  delete from notes where id = ?
  `, [id])
  return "Deleted"
}
export async function updateNote(contents,title, id) {      //u
  const [result] = await pool.query(
  `update notes set title= ?  where id=?`,[title,id])
  return "Updated successfully"
}