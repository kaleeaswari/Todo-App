import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/items'

import ItemList from './ItemList'
import AddItem from './AddItem'

export class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.saveItemList = this.saveItemList.bind(this)
  }

  componentDidMount() {
    this.props.fetchItems()
  }

  saveItemList() {
    this.props.saveItems(this.props.todo)
  }

  deleteItem(item) {
    this.deleteItem(item)
  }

  render() {
    const todo = this.props.todo
    return (
      <div className={'items'}>
        <div className={'items-header'}>
          <div className={'items-title'}>TODOs</div>
        </div>
        <div className={'items-container'}>
          <div>
            {todo !== undefined && todo.get('todos') !== undefined && todo.get('todos').length !== 0 ?
              <ItemList items={todo.get('todos')} deleteItem={this.props.deleteItem}/> :
              'No Items......'
            }
          </div>
          <AddItem/>
          <button className={'save-btn'} onClick={this.saveItemList}>Save Changes</button>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  return ({ todo: state.todo })
}

const mapDispatchToProps = dispatch => {
  return ({
    fetchItems: () => dispatch(actions.fetchItems()),
    deleteItem: (item) => dispatch(actions.deleteItem(item)),
    saveItems: (todo) => dispatch(actions.saveItems(todo)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
