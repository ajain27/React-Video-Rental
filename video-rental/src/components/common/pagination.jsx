import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Pagination = props => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props

  const pagesCount = Math.ceil(itemsCount / pageSize)
  if (pagesCount === 1) return null
  const pages = _.range(1, pagesCount + 1) // lodash function that takes the fist number and the last number. We add +1 because this function does not return the last number.

  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination'>
        {pages.map(page => (
          <li
            className={page === currentPage ? 'page-item active' : 'page-item'}
            key={page}
          >
            <a className='page-link' onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default Pagination
