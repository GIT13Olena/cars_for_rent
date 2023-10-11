import React from 'react';

import carsImg from '../../img/carsImage.jpeg'
import companyCars from '../../img/companyImg.jpeg'

import cssHome from './HomePage.module.css'

function HomePage() {
  return (
    <>
     <div className={cssHome.blockInfoAndImg}>
       <p className={cssHome.textOrCompany}>"RentCar is a modern car rental company designed for your convenience. 
        On our website, you can easily find and book a car that meets your needs. 
        Our mission is to provide reliable and comfortable transportation for your 
        trip.</p>
        <img src={carsImg} alt="cars" className={cssHome.imgCars}/>
      </div>
      <div className={cssHome.blockInfoAndImg}>
      <img src={companyCars} alt="Company Cars" className={cssHome.companyImg}/>
      <p className={cssHome.textOrCompany}>The website is designed with one main goal in mind - to make the car 
        rental process as easy and convenient as possible for you. So go to the catalog 
        and choose a car as soon as possible.</p>
      </div>
      
    </>
  );
}

export default HomePage;