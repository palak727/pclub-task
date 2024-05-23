import React from 'react'
import './br.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
const br = (props) => {
    const {product} = props;
  return (
    <div className='br'>
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name} 
    </div>
  )
}

export default br
