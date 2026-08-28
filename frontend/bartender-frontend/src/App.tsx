import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Menu from './pages/Menu'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />

      </Routes>
    </BrowserRouter>
  )
}
