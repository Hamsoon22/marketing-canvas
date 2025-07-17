import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import CanvasView from './CanvasView';
import { MarketingProvider } from './MarketingContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css'; // 글로벌 CSS

const theme = createTheme({
  typography: {
    fontFamily: `'Nanum Gothic', sans-serif`, // ✅ 원하는 웹폰트
    fontSize: 16,  // 기본 폰트 크기
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MarketingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/canvas" element={<CanvasView />} />
        </Routes>
      </Router>
    </MarketingProvider>
  </React.StrictMode>
);
