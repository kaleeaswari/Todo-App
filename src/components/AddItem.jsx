import React from 'react'
import { connect } from 'react-redux'

import { addItem }  from '../actions/items'

export class AddItem extends React.Component {
  constructor(props) {
    super(props)
    this.updateValue = this.updateValue.bind(this)
    this.addItem = this.addItem.bind(this)
    this.state = { itemName: '' }
  }

  updateValue(event) {
    this.setState({ itemName: event.target.value })
  }

  addItem() {
    if (this.state.itemName !== '') {
      this.props.addItem(this.state.itemName)
      this.setState({ itemName: '' })
    }
  }

  render() {
    return (
      <div className={'add-item'}>
        <input value={this.state.itemName} onChange={this.updateValue}/>
        <button className={'btn-add'} onClick={this.addItem}>+</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addItem: (itemName) => {
    let strippedValue = itemName.replace(/,/g, '')
    dispatch(addItem(strippedValue))
  },
})

export default connect(null, mapDispatchToProps)(AddItem)
