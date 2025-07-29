import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Text2Img from './pages/Text2Img';
import Img2Video from './pages/Img2Video';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Text2Img</Link>
        <Link to="/img2video">Img2Video</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Text2Img />} />
        <Route path="/img2video" element={<Img2Video />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;