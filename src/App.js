import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponents from './components/PrivateComponents';
import Login from './components/Login';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponents />}>
            <Route path='/' element={<h1>product</h1>} />
            <Route path='/add' element={<AddProduct/>} />
            <Route path='/update' element={<h1>update product</h1>} />
            <Route path='/profile' element={<h1>profile</h1>} />
            <Route path='/logout' element={<h1>logout</h1>} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
