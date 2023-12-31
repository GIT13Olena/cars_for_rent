import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';

import cssFavorit from './FavoritesPage.module.css';
import cssModal from '../CatalogPage/Modal.module.css'

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

  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalInfoCarOpen, setIsModalInfoCarOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [filteredData, setFilteredData] = useState(favoriteCars);
  const [noCarsMessage, setNoCarsMessage] = useState('');

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

  const openModalInfoCar = (car) => {
    setSelectedCar(car);
    setIsModalInfoCarOpen(true);
  }

  const closeModalInfoCar = () => {
    setIsModalInfoCarOpen(false);
  };

  const handleOnClose = e => {
    if (e.code === 'Escape') {
      closeModalInfoCar();
    }
  };

  window.addEventListener('keydown', handleOnClose);

  const handleOverlyClick = e => {
    if (e.currentTarget === e.target) {
      closeModalInfoCar();
    }
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

    if (filteredCars.length === 0) {
      setNoCarsMessage('No cars match the selected filters.')
      
      setTimeout(() => {
        setNoCarsMessage('');
      }, 3000);
    } else {
      setFilteredData(filteredCars);
    }
  };

   return (
    <>

{favoriteCars.length === 0 && (
    <p className={cssFavorit.messNoFavCars}>No favorite cars added yet.</p>
)}

    <div className={cssFavorit.carAndSidebar}>


<div>
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
      <p className={cssFavorit.messageFilters}>{noCarsMessage}</p>
      </div>

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
                <button onClick={() => openModalInfoCar(car)} className={cssFavorit.LearnMore}>Learn more</button>
              </li>
            ))}
          </ul>

    </div>

{isModalInfoCarOpen && selectedCar && (

  <div className={cssModal.modalOverly} onClick={handleOverlyClick}>

    <div className={cssModal.modalContent}>
     <button onClick={closeModalInfoCar} className={cssModal.closeModalBtn}>&#10006;</button> 
     <img src={selectedCar.img} alt="car" className={cssModal.imgCars} />
    <div className={cssModal.blockInfoCar}>

    <div className={cssModal.nameCarAndInfo}>
      <h2 className={cssModal.h2NameModalCars}>{selectedCar.make} <span className={cssModal.nameModal}>{selectedCar.model}</span>, {selectedCar.year}</h2>
      <p className={cssModal.blockInfo}>{selectedCar.address.split(',').slice(-2).join(' | ')} | Id: {selectedCar.id} | Year: {selectedCar.year} | Type: {selectedCar.type} </p>
      <p className={cssModal.blockInfo}>Fuel Consumption: {selectedCar.fuelConsumption} | Engine Size: {selectedCar.engineSize}</p>
    </div>
   
     <p className={cssModal.description}>{selectedCar.description}</p>
    </div>

    <div className={cssModal.blockAccessoriesInfo}>
     <p className={cssModal.accessories}>Accessories and functionalities:</p>
     <p className={cssModal.blockInfo}>{selectedCar.accessories[0]} | {selectedCar.accessories[1]} | {selectedCar.accessories[2]}</p>
     <p className={cssModal.blockInfo}>{selectedCar.functionalities[0]} | {selectedCar.functionalities[1]} | {selectedCar.functionalities[2]}</p>
    </div>
     
     <div className={cssModal.allBlockReantalConditions}>
       <p className={cssModal.rentalConditions}>Rental Conditions: </p>

       <div className={cssModal.blockRentalConditions}>
         {selectedCar.rentalConditions.split('\n').map((item, index) => (
         <p key={index} className={cssModal.textInfoRental}>{item} </p>
          ))
         }
         <p className={cssModal.textInfoRental}>Mileage: <span className={cssModal.infoIteam}>{selectedCar.mileage}</span></p>
         <p className={cssModal.textInfoRental}>Price: <span className={cssModal.infoIteam}>{selectedCar.rentalPrice}</span></p>
       </div>

     </div>
     
      <a href="tel:+380730000000"><button className={cssModal.buttonRenalCar}>Rental car</button></a>
      
   </div>
  </div>
)}
</>
  );
}

const mapStateToProps = (state) => {
  return {
    favoriteCars: state.favorites.favoriteCars, 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
