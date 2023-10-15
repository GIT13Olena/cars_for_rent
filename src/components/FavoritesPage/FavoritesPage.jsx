import React, { useState } from 'react';
import { connect } from 'react-redux';
import cssFavorit from './FavoritesPage.module.css'

function FavoritesPage({ favoriteCars }) {

  return (
    <div>
      {favoriteCars.length > 0 ? (
        <ul className={cssFavorit.advertisementList}>
          {favoriteCars.map((car) => (
            <li key={car.id}>
             
              <img src={car.img} alt="car"  className={cssFavorit.carImg}/>

              <div className={cssFavorit.infoCar}>
              <div className={cssFavorit.blockModalAndPrice}> 
                 <h2 className={cssFavorit.h2NameModalCars}>{car.make}<span className= 
                  {cssFavorit.nameModal}>{car.model}</span>, {car.year}</h2>
                 <h2 className={cssFavorit.h2NameModalCars}>{car.rentalPrice}</h2>
              </div>

              <p className={cssFavorit.blockInfo}>          {car.address.split(',').slice(-2).join(' | ')} | {car.rentalCompany}</p>
              <p className={cssFavorit.blockInfo}>
                  {car.type} | {car.model} | {car.id} | {car.functionalities[0].split(' ').slice(0, 2).join(' ')}
                  {car.functionalities[0].split(' ').length > 2 ? '...' : ''}
              </p>
            
              </div>

              <button className={cssFavorit.LearnMore}>Learn more</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          Your favorite cars are not yet on the list. Like the car with 
           a heart and it will appear here
        </p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    favoriteCars: state.favorites.favoriteCars, 
  };
};

export default connect(mapStateToProps)(FavoritesPage);
