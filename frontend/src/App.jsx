import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
