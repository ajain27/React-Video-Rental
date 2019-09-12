import React, { Component } from 'react'
import { getMovies } from '../../services/fakeMovieService'
import Like from '../common/like'
import ListGroup from '../common/listGroup'
import Pagination from '../common/pagination'
import { paginate } from '../../utils/paginate'
import { getGenres } from '../../services/fakeGenreService'

class Movies extends Component {
  state = {
    movies: [],
    generes: [],
    pageSize: 4,
    currentPage: 1
  }

  componentDidMount () {
    this.setState({ movies: getMovies(), generes: getGenres() })
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id)
    this.setState({ movies })
  }

  handleLike = movie => {
    const movies = [...this.state.movies]
    const index = movies.indexOf(movie)
    movies[index] = { ...movies[index] }
    movies[index].liked = !movies[index].liked
    this.setState({ movies })
  }

  handlePageChange = page => {
    this.setState({ currentPage: page })
  }

  handleGenereSelect = genere => {
    console.log(genere)
    this.setState({ selectedGenere: genere })
  }

  render () {
    const { length: movieLength } = this.state.movies
    const { pageSize, currentPage, movies: allMovies } = this.state

    if (movieLength === 0) {
      return <p>There are no movies to show</p>
    }

    const movies = paginate(allMovies, currentPage, pageSize)

    return (
      <div className='row'>
        <div className='col-2'>
          <ListGroup
            items={this.state.generes}
            selectedItem={this.state.selectedGenere}
            onItemSelect={this.handleGenereSelect}
          />
        </div>
        <div className='col'>
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
              {movies.map(movie => (
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
      </div>
    )
  }
}

export default Movies
