import React from 'react'

const ListGroup = props => {
  const {
    items,
    textProperty,
    ValueProperty,
    onItemSelect,
    selectedItem
  } = props

  return (
    <ul className='list-group clickable'>
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[ValueProperty]}
          className={
            item === selectedItem ? 'list-group-item active' : 'list-group-item'
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  )
}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
}

export default ListGroup
