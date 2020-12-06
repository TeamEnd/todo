const crypto = require('crypto')

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

window.onload = init

document.getElementById('clear').addEventListener('click', () => {
  clear()
})

document.getElementById('add').addEventListener('click', () => {
  const name = document.getElementById('name').value
  const description = document.getElementById('description').value

  addTodo(name, description)
})

function init () {
  if (!isItemExists()) {
    /*
        Todo Example:
        {
          name: 'some name',
          description: 'some desc',
          id: 'randomid'
        }
    */
    localStorage.setItem('data', '{ "todos": [] }')
  }

  loadTodos()
}

function loadTodos () {
  const ulTodos = document.getElementById('todos')
  const data = JSON.parse(localStorage.data)
  const todos = data.todos

  while (ulTodos.hasChildNodes()) {
    ulTodos.removeChild(ulTodos.firstChild)
  }

  todos.forEach(elem => {
    const li = document.createElement('li')

    if (elem.canceled) {
      li.innerHTML = `
      <del title="${elem.description}">
        ${elem.name}
      </del>
      `
    } else {
      li.innerHTML = `
      <span title="${elem.description}">
        ${elem.name}
      </span>
      `
    }
    li.onclick = () => {
      setTodoCanceled(elem.id, !elem.canceled)
    }

    ulTodos.appendChild(li)
  })
}

/**
 * @returns {boolean} is item exists
*/
function isItemExists () {
  return localStorage.data !== undefined
}

/**
 *
 * @param {string} name
 * @param {string} description
 */
function addTodo (name, description) {
  const data = JSON.parse(localStorage.data)
  const obj = {
    name: name,
    description: description,
    id: crypto.randomBytes(3).toString('hex'),
    canceled: false
  }

  data.todos.push(obj)
  localStorage.setItem('data', JSON.stringify(data))
  loadTodos()
}

function setTodoCanceled (id, canceled) {
  const data = JSON.parse(localStorage.data)
  const todos = data.todos

  todos.find(elem => elem.id === id).canceled = canceled

  localStorage.setItem('data', JSON.stringify(data))
  loadTodos()
}

function clear () {
  localStorage.data = '{ "todos": [] }'
  loadTodos()
}
