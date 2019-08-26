import React, { Component } from 'react'
import { getMovies } from '../../services/fakeMovieService'
import 'font-awesome/css/font-awesome.css'

class Movies extends Component {
  state = {
    movies: getMovies()
  }

  handleDelete = movie => {
    console.log('Deleted', movie)
    const movies = this.state.movies.filter(m => m._id !== movie._id)
    this.setState({ movies })
  }
  render () {
    const { length: movieLength } = this.state.movies
    if (movieLength === 0) {
      return <p>There are no movies to show</p>
    }
    return (
      <div>
        <p>Showing {movieLength} movies in the database</p>
        <table className='table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genere</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() => this.handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Movies
