import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Text2Img from './pages/Text2Img';
import Img2Video from './pages/Img2Video';
import Upscale from './pages/Upscale';
import TrainModel from './pages/TrainModel';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'; // базові стилі

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="text2img" element={<Text2Img />} />
                    <Route path="img2video" element={<Img2Video />} />
                    <Route path="upscale" element={<Upscale />} />
                    <Route path="train" element={<TrainModel />} />
                    <Route path="assets" element={<div>Assets list</div>} />
                    <Route path="*" element={<Navigate to="text2img" />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}