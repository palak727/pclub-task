import React from 'react'
import './Offers.css'
import exclusive from '../Assets/ex.png'
const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Exclusive</h1>
          <h1>Sale For You</h1>
          <p>BEST PRICES!</p>
          <button>Check Now</button>
      </div>
      <div className="offers-right">
        <img src={exclusive} alt="" />
      </div>
    </div>
  )
}

export default Offers
