import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Predict from './pages/Predict'
import DataAnalytics from './pages/DataAnalytics'
import ModelAnalytics from './pages/ModelAnalytics'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/data-analytics" element={<DataAnalytics />} />
        <Route path="/model-analytics" element={<ModelAnalytics />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
