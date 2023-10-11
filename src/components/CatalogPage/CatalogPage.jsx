import React, { useState, useEffect } from 'react';
import axios from 'axios';

import heartSvg from '../../icons/normalHeart.svg'
import activeHeartSvg from '../../icons/activeHeart.svg'


import css from './CatalogPage.module.css';
import cssModal from './Modal.module.css'

function CatalogPage() {
  const initialFilters = JSON.parse(localStorage.getItem('filters')) || {
    brand: '',
    price: '',
    mileage: '',
    km: '',
  };

  const initialFavoriteCars = JSON.parse(localStorage.getItem('favoriteCars')) || [];
  const [favoriteCars, setFavoriteCars] = useState(initialFavoriteCars);

  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || []);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [displayCount, setDisplayCount] = useState(8);
  const [isModalInfoCarOpen, setIsModalInfoCarOpen] = useState(false);
  const [heartImages, setHeartImages] = useState(JSON.parse(localStorage.getItem('heartImages')) || {});
  const [selectedCar, setSelectedCar] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [filteredData, setFilteredData] = useState(JSON.parse(localStorage.getItem('filteredData')) || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://65216903a4199548356d2c72.mockapi.io/cars');
        setData(response.data);
        localStorage.setItem('data', JSON.stringify(response.data));
      } catch (error) {
        console.error('Помилка при отриманні даних з API:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Збереження даних у локальне сховище при зміні фільтрів
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    // Збереження результатів фільтрації у локальне сховище
    localStorage.setItem('filteredData', JSON.stringify(filteredData));
  }, [filteredData]);

  useEffect(() => {
    // Збереження стану сердець у локальне сховище
    localStorage.setItem('heartImages', JSON.stringify(heartImages));
  }, [heartImages]);

  const handleLoadMore = () => {
    if (displayCount + 8 < (filteredData.length > 0 ? filteredData.length : data.length)) {
      setDisplayCount(displayCount + 8);
    } else {
      setHasMoreData(false);
    }
  };

  const handleFavoriteClick = (car) => {
    // Отримання поточного списку улюблених автомобілів
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteCars')) || [];
  
    // Додавання нового автомобіля до списку
    currentFavorites.push(car);

    localStorage.setItem(favoriteCars, JSON.stringify(currentFavorites));

  // Оновлення стану
  setFavoriteCars(currentFavorites);
};

  const openModalInfoCar = (item) => {
    setSelectedCar(item);
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const toggleHeart = (index) => {
    setHeartImages((prevImages) => {
      const newImages = { ...prevImages };
      newImages[index] = prevImages[index] === activeHeartSvg ? heartSvg : activeHeartSvg;
      return newImages;
    });
  };

  const applyFilters = (e) => {
    e.preventDefault();
    let filteredCars = [...data];

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
    <>
      <div className={css.sectionSearch}>
        <div className={css.blockSelect}>
          <p className={css.blockSelectMarkName}>Car brand</p>
          <select 
            name="brand" 
            id="brand" 
            onChange={handleFilterChange} 
            className={css.selectMark}
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

        <div className={css.blockSelect}>
            <p className={css.blockSelectMarkName}>Price/ 1 hour</p>
            <select 
              name="price" 
              id="price" 
              className={css.selectPrice} 
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
        <div className={css.blockSelect}>
            <p className={css.blockSelectMarkName}>Сar mileage / km</p>
            <div className={css.forms}>
              <form onSubmit={applyFilters} >
              <input
                type="text"
                id="mileage"
                name="mileage"
                className={css.formFrom}
                placeholder="From:"
                value={filters.mileage}
                onChange={handleFilterChange}
              />
            <input
                type="text"
                id="km"
                name="km"
                className={css.formTo}
                placeholder="To:"
                value={filters.km}
                onChange={handleFilterChange}
              />
            </form>
            </div>
        </div>
        <button className={css.buttomSearch} type="submit" onClick={applyFilters}>Search</button>

      </div>


      <div className={css.advertisementList}>
      {(filteredData.length > 0 ? filteredData : data).slice(0, displayCount).map((item, index) => (
        <div key={item.id} className="advertisement">
          
           <div className={css.imageContainer}>
           <img
      src={heartImages[index] === activeHeartSvg ? activeHeartSvg : heartSvg}
      alt="heart"
      className={css.heartIcon}
      onClick={() => {
        toggleHeart(index);
        handleFavoriteClick(item);
      }}
    />
             <img src={item.img} alt="car" className={css.imgCars} />
           </div>
            
           <div className={css.infoCar}>
               <div className={css.blockModalAndPrice}> 
                 <h2 className={css.h2NameModalCars}>{item.make}<span className={css.nameModal}>{item.model}</span>, {item.year}</h2>
                 <h2 className={css.h2NameModalCars}>{item.rentalPrice}</h2>
               </div>
               <p className={css.blockInfo}>{item.address.split(',').slice(-2).join(' | ')} | {item.rentalCompany}</p>
               <p className={css.blockInfo}>{item.type} | {item.model} | {item.id} | {item.functionalities[0]}</p>
           </div>

           <button onClick={() => openModalInfoCar(item)} className={css.LearnMore}>Learn more</button>
            
         </div>
          ))}
        </div>


        {hasMoreData && (
          <p onClick={handleLoadMore} className={css.loadMore}>Load more</p>
        )}


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

export default CatalogPage;