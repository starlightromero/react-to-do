import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      todos: [],
      userInput: ''
    }
  }

  userInputChanged = event => {
    this.setState({
      userInput: event.target.value
    })
  }

  addTodo = () => {
    const newTodo = {
      id: Math.random(),
      name: this.state.userInput,
      completed: false
    }
    this.setState({ todos: [newTodo, ...this.state.todos] })
  }

  changeState = (id, completed) => {
    if (completed) {
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    } else {
      this.setState({
        todos: this.state.todos.map((todo, index) => {
          if (todo.id === id) {
            todo.completed = !todo.completed
          }
          return todo
        }).sort((a, b) => a.completed - b.completed)
      })
    }
  }

  render () {
    let todos = this.state.todos.map((todo, index) => {
      let completed = () => todo.completed ? 'completed' : ''
      return (
        <li
          key={index}
          class={completed()}
          onClick={this.changeState.bind(this, todo.id, todo.completed)}>
          {todo.name}
        </li>
      )
    })
    return (
      <div className='App'>
        <h1>React To-Do</h1>
        <input
          type='text'
          placeholder='Add To Do...'
          value={this.state.userInput}
          onChange={this.userInputChanged.bind(this)}
        />
        <button onClick={this.addTodo.bind(this)}>Add {this.state.userInput}</button>
        <hr />
        <ul>
          {todos}
        </ul>
      </div>
    )
  }
}

export default App
