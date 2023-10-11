import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import CatalogPage from './CatalogPage/CatalogPage';
import FavoritesPage from './FavoritesPage/FavoritesPage';
import logo from '../img/logo.jpg'

function App() {
  return (
    <div className='container'>
      <nav>
        <ul className='menu'>
         <li><img src={logo} alt="logo" className='logoImg'/></li>
          <li>
            <Link to="/" className='menuLink'>Home</Link>
          </li>
          <li>
            <Link to="/catalog" className='menuLink'>Catalog</Link>
          </li>
          <li>
            <Link to="/favorites" className='menuLink'>Favorites</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}


export default App;
