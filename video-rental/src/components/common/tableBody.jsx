import React, { Component } from 'react'
import _ from 'lodash'

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item) // if it has a content prop, display

    return _.get(item, column.path) // else display whatever we have using Loadash
  }

  createKey = (item, column) => {
    return item._id + (column.path || column.key) // combine the ID of the item rendering and path of the target prop. If there is no path property we use the OR operator
  }
  render () {
    const { data, columns } = this.props
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    )
  }
}

export default TableBody
