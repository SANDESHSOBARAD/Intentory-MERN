import React from 'react'
import NavBarIn from '../components/NavBarIn'
import abhiPhoto from '../images/abhi_pic.PNG' 
import sandeshPhoto from '../images/sandesh_pic.jpeg' 
function about() {
  return (
    <>
     <NavBarIn/>
     <div className="about">
        <div className="about-box">
            <img wdith="200px" height="200px" src={abhiPhoto}/>
            <div class="about-box-desc">
                <h3>Abhilash Sreenivasa</h3>
                <p> I like soccer and Burrito</p>
            </div>
        </div>
        <div className="about-box">
            <img wdith="200px" height="200px" src={sandeshPhoto}/>
            <div class="about-box-desc">
                <h3>Sandesh Sobarad</h3>
                <p>I like machine learning and Cricket </p>
            </div>
        </div>

     </div>
    </>
  )
}

export default about