import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Todolist from './components/Todolist';
function App() {
  return (
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Todo" element={<Todolist />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
