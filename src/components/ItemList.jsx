import React from 'react'

const ItemList = (props) => (
  <div>
    {Object.keys(props.items).map(item => {
      const itemName = props.items[item]
      return (<div className={'item-list'} key={itemName}>
        <div className={'item-name'}>{itemName} </div>
        <div className={'item-del'} role={'button'}
              onClick={() => {
                props.deleteItem(itemName)
              }}
        > <button className={'btn-del fa fa-close'}/> </div>
      </div>)
    })}
  </div>
)

export default ItemList

