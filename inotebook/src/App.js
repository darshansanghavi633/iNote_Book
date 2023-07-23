import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddNote from './components/AddNote';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <BrowserRouter>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact element={<Home showAlert={showAlert} />} path="/" />
            <Route exact element={<AddNote showAlert={showAlert} />} path="/add" />
            <Route exact element={<About />} path="/about" />
            <Route exact element={<Login showAlert={showAlert} />} path="/login" />
            <Route exact element={<Signup showAlert={showAlert} />} path="/signup" />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
