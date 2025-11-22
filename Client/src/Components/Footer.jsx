import React from 'react'
import logo from '../assets/image-Photoroom.png'
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import '../App.css'
import { Link } from 'react-router-dom';

function Footer() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
}
  return (
    
    <footer className="bg-dark text-white   mt-auto"> 
      <div className="container footerContainer  ">
        <div className="row">
            <div className='col-12 col-md-6 mb-4 mb-md-0'>
            <h3> <img src={logo} alt="Ozagi Logo" style={{ height: '30px',marginRight:'-10px' ,backgroundColor:'transparent'}} /> Ozagi</h3>

            <button className='bg-dark backToTopBtn' onClick={scrollToTop} ><MdOutlineKeyboardDoubleArrowUp />Back to Top</button>
        </div>
        <div className='col-12 col-md-6 d-flex justify-content-md-end mt-5 '>
            <ul className='list text-light ps-0'>
                <li><Link to='/'  >Home</Link></li>
                <li><Link to='/about' >About us</Link></li>
            </ul>
        </div>
        </div>
        
      </div>
      <div className=" text-center p-1 w-100 mt-3">
        <p className="mb-0 text-white">
        © {new Date().getFullYear()} Ozagi. All rights reserved.
        </p>
</div>

    </footer>
    
  )
}

export default Footer