import './App.css';
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Accueil from './components/accueil.jsx'



function App(){
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Accueil />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;