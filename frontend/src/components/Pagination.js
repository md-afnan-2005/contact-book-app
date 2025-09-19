import React, { Component } from 'react'
import './Pagination.css'

class Pagination extends Component {
    render() {
        const { page, setPage, total, limit } = this.props
        const totalPages = Math.max(1, Math.ceil(total / limit))
        return (
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
                <span>Page {page} / {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
            </div>
        )
    }
}
export default Pagination
