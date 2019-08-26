import React, { Component } from 'react'
import { getMovies } from '../../services/fakeMovieService'
import Like from '../common/like'
import Pagination from '../common/pagination'
import { paginate } from '../../utils/paginate'

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1
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
    this.setState({ currentPage: page })
  }

  render () {
    const { length: movieLength } = this.state.movies
    const { pageSize, currentPage, movies } = this.state

    if (movieLength === 0) {
      return <p>There are no movies to show</p>
    }

    const paginatedMovies = paginate(movies, currentPage, pageSize)

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
            {paginatedMovies.map(movie => (
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
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </div>
    )
  }
}

export default Movies
