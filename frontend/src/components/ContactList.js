import React, { Component } from 'react'
import './ContactList.css'

class ContactList extends Component {
    render() {
        const { contacts, onDelete } = this.props
        if (!contacts.length) return <div className="empty">No contacts</div>
        return (
            <div className="list">
                {contacts.map(c => {
                    const cid = c.id || c._id // support SQLite (id) & MongoDB (_id)
                    return (
                        <div className="card" key={cid}>
                            <div className="info">
                                <div className="name">{c.name}</div>
                                <div className="email">{c.email}</div>
                                <div className="phone">{c.phone}</div>
                            </div>
                            <button className="del" onClick={() => onDelete(cid)}>
                                Delete
                            </button>
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default ContactList
