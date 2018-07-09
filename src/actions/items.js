import { createAction } from 'redux-actions'

export const updateItems = createAction('UPDATE_ITEMS')

export const updateRevision = createAction('UPDATE_REVISION')

export const addItem = createAction('ADD_ITEM')

export const deleteItem = createAction('DELETE_ITEM')

const checkStatus = (response) => {
  if (response.status === 200 || response.status === 201) {
    return response.json()
  } else {
    throw Error('Error')
  }
}

export function fetchItems() {
  return dispatch => {
    let url = '//localhost:5984/todo/listOfItems'
    fetch(url)
      .then(checkStatus, (error) => {
        throw (error)
      })
      .then((response) => {
        dispatch(updateItems(response.items))
        dispatch(updateRevision(response._rev))
        return Promise.resolve()
      })
  }
}

const defaultParams = {
  method: 'PUT',
  dataType: "json",
  headers: {
    'Content-Type': 'application/json',
  },
}

export function saveItems(todo) {
  return dispatch => {
    let url = '//localhost:5984/todo/listOfItems'
    const rev = todo.get('revision')
    const items = todo.get('todos')
    fetch(url, {
      ...defaultParams,
      body: JSON.stringify({
        '_id': 'listOfItems',
        '_rev': rev,
        'items': items
      })
    })
      .then(checkStatus, (error) => {
        throw (error)
      })
      .then((response) => {
        dispatch(updateRevision(response.rev))
        alert('Saved successfully')
        return Promise.resolve()
      })
  }
}
