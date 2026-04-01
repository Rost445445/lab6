import React from 'react'
import NewsFeed from './components/NewsFeed/NewsFeed'
import Login from './components/Login/Login'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Лабораторна робота №6</h1>
      </header>
      <main style={{display: 'flex', gap: '20px', padding: '20px'}}>
        <div style={{flex: 1}}>
          <Login />
        </div>
        <div style={{flex: 2}}>
          <NewsFeed />
        </div>
      </main>
    </div>
  )
}

export default App
