import React, { Component } from 'react'
import './ContactForm.css'

class ContactForm extends Component {
    constructor(props) {
        super(props)
        this.state = { name: '', email: '', phone: '', error: null }
    }
    validEmail(e) { return /^\S+@\S+\.\S+$/.test(e) }
    validPhone(p) { return /^\d{10}$/.test(p) }
    async handleSubmit(e) {
        e.preventDefault()
        const { name, email, phone } = this.state
        if (!name || !email || !phone) return this.setState({ error: 'All fields required' })
        if (!this.validEmail(email)) return this.setState({ error: 'Invalid email' })
        if (!this.validPhone(phone)) return this.setState({ error: 'Phone must be 10 digits' })
        try {
            await this.props.onAdd({ name, email, phone })
            this.setState({ name: '', email: '', phone: '', error: null })
        } catch (err) { this.setState({ error: 'Failed to add' }) }
    }
    render() {
        return (
            <form className="form" onSubmit={e => this.handleSubmit(e)}>
                <input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} placeholder="Name" />
                <input value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder="Email" />
                <input value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} placeholder="Phone (10 digits)" />
                <button type="submit">Add</button>
                {this.state.error && <div className="error">{this.state.error}</div>}
            </form>
        )
    }
}
export default ContactForm
