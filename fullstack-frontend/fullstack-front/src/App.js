
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUser from './users/AddUser';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/AddUser" element={<AddUser/>}/> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
