import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact element={<Home />} path="/" />
            <Route exact element={<About />} path="/about" />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
