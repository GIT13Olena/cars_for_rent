import React  from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import cssFavorit from './FavoritesPage.module.css'

import activeHeart from "../../icons/activeHeart.svg"

import { removeFromFavorites } from '../../redux/actions/favoritesActions';

const mapDispatchToProps = {
  removeFromFavorites,
};

function FavoritesPage({ favoriteCars}) {
  const dispatch = useDispatch();
  return (
    <div>
      {favoriteCars.length > 0 ? (
        <ul className={cssFavorit.advertisementList}>
          {favoriteCars.map((car) => (
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
                 <h2 className={cssFavorit.h2NameModalCars}>{car.make}<span className= 
                  {cssFavorit.nameModal}>{car.model}</span>, {car.year}</h2>
                 <h2 className={cssFavorit.h2NameModalCars}>{car.rentalPrice}</h2>
              </div>

              <p className={cssFavorit.blockInfo}>{car.address.split(',').slice(-2).join(' | ')} | {car.rentalCompany}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
