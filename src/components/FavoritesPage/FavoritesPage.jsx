import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';

import cssFavorit from './FavoritesPage.module.css';

import activeHeart from "../../icons/activeHeart.svg";
import cross from "../../icons/cross-small-blue.svg";

import { removeFromFavorites } from '../../redux/actions/favoritesActions';

const mapDispatchToProps = {
  removeFromFavorites,
};

function FavoritesPage({ favoriteCars, data }) {
  const dispatch = useDispatch();

  const initialFilters = JSON.parse(localStorage.getItem('favoritesFilters')) || {
    brand: '',
    price: '',
    mileage: '',
    km: '',
  };

  const [filters, setFilters] = useState(initialFilters);
  const [filteredData, setFilteredData] = useState(favoriteCars);

  useEffect(() => {
    localStorage.setItem('favoritesFilters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    setFilteredData(favoriteCars);
  }, [favoriteCars]);

  function resetFilters() {
    const defaultFilters = {
      brand: '',
      price: '',
      mileage: '',
      km: '',
    };

    setFilters(defaultFilters);
    document.getElementById('brand').value = '';
    document.getElementById('price').value = '';
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const applyFilters = (e) => {
    e.preventDefault();
    let filteredCars = [...favoriteCars];

    if (filters.brand) {
      filteredCars = filteredCars.filter(
        (car) => car.make.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    if (filters.price) {
      filteredCars = filteredCars.filter(
        (car) => car.rentalPrice.toLowerCase() === filters.price.toLowerCase()
      );
    }

    if (filters.mileage && filters.km) {
      const fromMileage = Number(filters.mileage);
      const toMileage = Number(filters.km);
      filteredCars = filteredCars.filter(
        (car) => car.mileage >= fromMileage && car.mileage <= toMileage
      );
    }

    setFilteredData(filteredCars);
  };

   return (
    <div className={cssFavorit.carAndSidebar}>
      <div>
        {filteredData.length > 0 ? (
          <ul className={cssFavorit.advertisementList}>
            {filteredData.map((car) => (
              <li key={car.id}>
                <div className={cssFavorit.imageContainer}>
                  <img src={car.img} alt="car" className={cssFavorit.carImg}/>
                  <img src={activeHeart} alt="svg active heart" 
                    onClick={() => dispatch(removeFromFavorites(car))} 
                    className={cssFavorit.activeHeartIcon} 
                  />
                </div>
                <div className={cssFavorit.infoCar}>
                  <div className={cssFavorit.blockModalAndPrice}> 
                    <h2 className={cssFavorit.h2NameModalCars}>
                      {car.make}<span className={cssFavorit.nameModal}>{car.model}</span>, {car.year}
                    </h2>
                    <h2 className={cssFavorit.h2NameModalCars}>{car.rentalPrice}</h2>
                  </div>
                  <p className={cssFavorit.blockInfo}>
                    {car.address.split(',').slice(-2).join(' | ')} | {car.rentalCompany}
                  </p>
                  <p className={cssFavorit.blockInfo}>
                    {car.type} | {car.model} | {car.id} | {car.functionalities[0].split(' ').slice(0, 1).join(' ')}
                    {car.functionalities[0].split(' ').length > 1 ? '...' : ''}
                  </p>
                </div>
                <button className={cssFavorit.LearnMore}>Learn more</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            Your favorite cars are not yet on the list. Like the car with 
            a heart and it will appear here?
          </p>
        )}
      </div>
    <div className={cssFavorit.sectionSearch}>
      <div className={cssFavorit.brandAndPrice}>
        <div className={cssFavorit.blockSelect}>
          <p className={cssFavorit.blockSelectMarkName}>Car brand</p>
          <select 
            name="brand" 
            id="brand" 
            onChange={handleFilterChange} 
            className={cssFavorit.selectMark}
            defaultValue={filters.brand}
          >
            <option value="">Enter the text</option>
            <option value="Buick">Buick</option>
            <option value="Volvo">Volvo</option>
            <option value="HUMMER">HUMMER</option>
            <option value="Subaru">Subaru</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Nissan">Nissan</option>
            <option value="Lincoln">Lincoln</option>
            <option value="GMC">GMC</option>
            <option value="Hyundai">Hyundai</option>
            <option value="MINI">MINI</option>
            <option value="Bentley">Bentley</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Aston Martin">Aston Martin</option>
            <option value="Pontiac">Pontiac</option>
            <option value="Lamborghini">Lamborghini</option>
            <option value="Audi">Audi</option>
            <option value="BMW">BMW</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Chrysler">Chrysler</option>
            <option value="Kia">Kia</option>
            <option value="Land">Land</option>
            <option value="Toyota Camry">Toyota Camry</option>
            <option value="Ford Mustang">Ford Mustang</option>
            <option value="Honda CR-V">Honda CR-V</option>
            <option value="BMW 3 Series">BMW 3 Series</option>
            <option value="Audi Q5">Audi Q5</option>
            <option value="Mercedes-Benz E-Class">Mercedes-Benz E-Class</option>
            <option value="Nissan Rogue">Nissan Rogue</option>
            <option value="Volkswagen Golf">Volkswagen Golf</option>
          </select>
        </div>

        <div className={cssFavorit.blockSelect}>
            <p className={cssFavorit.blockSelectMarkName}>Price/ 1 hour</p>
            <select 
              name="price" 
              id="price" 
              className={cssFavorit.selectPrice} 
              onChange={handleFilterChange}
              defaultValue={filters.price}
            >
              <option value="">To $</option>
              <option value="$25">25$</option>
              <option value="$30">30$</option>
              <option value="$35">35$</option>
              <option value="$40">40$</option>
              <option value="$45">45$</option>
              <option value="$50">50$</option>
              <option value="$55">55$</option> 
              <option value="$60">60$</option>
              <option value="$65">65$</option>
              <option value="$75">75$</option>
              <option value="$100">100$</option>
              <option value="$150">150$</option>
              <option value="$200">200$</option>
              <option value="$250">250$</option>
              <option value="$300">300$</option>
              <option value="$500">500$</option>
            </select>
        </div>
        </div>
        <div className={cssFavorit.blockSelect}>
            <p className={cssFavorit.blockSelectMarkName}>Сar mileage / km</p>
            <div >
              <form onSubmit={applyFilters} >
              <input
                type="number"
                id="mileage"
                name="mileage"
                className={cssFavorit.formFrom}
                placeholder="From:"
                value={filters.mileage}
                onChange={handleFilterChange}
              />
            <input
                type="number"
                id="km"
                name="km"
                className={cssFavorit.formTo}
                placeholder="To:"
                value={filters.km}
                onChange={handleFilterChange}
              />
            </form>
            </div>
        </div>
        <div className={cssFavorit.btnSearchRemoveSvg}>
          <button className={cssFavorit.buttomSearch} type="submit" onClick={applyFilters}>Search</button>
          <img src={cross} alt="svg cross" className={cssFavorit.filterCrossSvg} onClick={resetFilters} />
        </div>
        
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    favoriteCars: state.favorites.favoriteCars, 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
