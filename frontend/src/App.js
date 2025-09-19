import React, { Component } from 'react'
import api from './api'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import Pagination from './components/Pagination'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { contacts: [], page: 1, limit: 6, total: 0, loading: false }
  }

  componentDidMount() {
    this.fetchContacts(this.state.page)
  }

  async fetchContacts(p) {
    this.setState({ loading: true })
    try {
      const res = await api.get(`/contacts?page=${p}&limit=${this.state.limit}`)
      this.setState({ contacts: res.data.contacts, total: res.data.total, page: p })
    } catch (e) {
      console.error(e)
    }
    this.setState({ loading: false })
  }

  async addContact(c) {
    try {
      await api.post('/contacts', c)
      this.fetchContacts(this.state.page) // refresh list after adding
    } catch (e) {
      console.error(e)
    }
  }

  async deleteContact(id) {
    try {
      await api.delete(`/contacts/${id}`)
      this.setState(
        prev => {
          let updated = prev.contacts.filter(x => (x.id || x._id) !== id)
          let newTotal = prev.total - 1
          let newPage = prev.page
          if (updated.length === 0 && prev.page > 1) newPage = prev.page - 1
          return { contacts: updated, total: newTotal, page: newPage }
        },
        () => this.fetchContacts(this.state.page)
      )
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Contact Book</h1>
        <ContactForm onAdd={c => this.addContact(c)} />
        {this.state.loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <ContactList
            contacts={this.state.contacts}
            onDelete={id => this.deleteContact(id)}
          />
        )}
        <Pagination
          page={this.state.page}
          setPage={p => this.fetchContacts(p)}
          total={this.state.total}
          limit={this.state.limit}
        />
      </div>
    )
  }
}
export default App
