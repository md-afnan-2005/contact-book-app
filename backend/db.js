const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.resolve(__dirname, 'contacts.db')
const db = new sqlite3.Database(dbPath, (err) => { if (err) console.error(err); else db.run(`CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL)`) })
const run = (sql, params = []) => new Promise((res, rej) => { db.run(sql, params, function (err) { if (err) rej(err); else res({ lastID: this.lastID, changes: this.changes }) }) })
const all = (sql, params = []) => new Promise((res, rej) => { db.all(sql, params, (err, rows) => { if (err) rej(err); else res(rows) }) })
const get = (sql, params = []) => new Promise((res, rej) => { db.get(sql, params, (err, row) => { if (err) rej(err); else res(row) }) })
module.exports = { run, all, get }
