import React, { Component } from 'react'
import { getMovies } from '../../services/fakeMovieService'
import Like from '../common/like'
import Pagination from '../common/pagination'

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 10
  }

  handleDelete = movie => {
    console.log('Deleted', movie)
    const movies = this.state.movies.filter(m => m._id !== movie._id)
    this.setState({ movies })
  }

  handleLike = movie => {
    const movies = [...this.state.movies]
    const index = movies.indexOf(movie)
    movies[index] = { ...movies[index] }
    movies[index].liked = !movies[index].liked
    this.setState({ movies })
    console.log('Like clicked', movie)
  }

  handlePageChange = page => {
    console.log('Page Number', page)
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
                  <Like
                    liked={movie.liked}
                    onToggle={() => this.handleLike(movie)}
                  />
                </td>
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
        <Pagination
          itemsCount={movieLength}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
        />
      </div>
    )
  }
}

export default Movies
