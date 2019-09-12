import React from 'react'
import Like from './common/like'

const MoviesTable = props => {
  const { movies, onDelete, onLike } = props
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Title</th>
          <th>genre</th>
          <th>Stock</th>
          <th>Rate</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like liked={movie.liked} onToggle={() => onLike(movie)} />
            </td>
            <td>
              <button
                className='btn btn-danger btn-sm'
                onClick={() => onDelete(movie)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MoviesTable