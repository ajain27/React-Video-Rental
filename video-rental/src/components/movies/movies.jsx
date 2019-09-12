import React, { Component } from 'react'
import { getMovies } from '../../services/fakeMovieService'
import ListGroup from '../common/listGroup'
import Pagination from '../common/pagination'
import { paginate } from '../../utils/paginate'
import { getGenres } from '../../services/fakeGenreService'
import MoviesTable from '../moviesTable'
import _ from 'lodash'

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' }
  }

  componentDidMount () {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]

    this.setState({ movies: getMovies(), genres })
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

  handlegenreSelect = genre => {
    this.setState({ selectedgenre: genre, currentPage: 1 })
  }
  handleSort = path => {
    this.setState({ sortColumn: { path, order: 'asc' } })
  }

  render () {
    const { length: count } = this.state.movies
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: allMovies,
      selectedgenre
    } = this.state

    if (count === 0) {
      return <p>There are no movies to show</p>
    }
    const filtered =
      selectedgenre && selectedgenre._id
        ? allMovies.filter(m => m.genre._id === selectedgenre._id)
        : allMovies
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

    const movies = paginate(sorted, currentPage, pageSize)

    return (
      <div className='row'>
        <div className='col-2'>
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedgenre}
            onItemSelect={this.handlegenreSelect}
          />
        </div>
        <div className='col'>
          <p>Showing {filtered.length} movies in the database</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
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
