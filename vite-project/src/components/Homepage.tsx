import React from 'react';
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <>  
  <div>
    <div className = "p-8 text-white text-2xl font-bold bg-cyan-600">
      SQL Playground (GROUP 2 ON TOP)
    </div>
    <div className = "ml-24 mt-10 text-5xl">
        Welcome Home, Joey
    </div>
      <div>
      <div className = "ml-16 mt-24 flex flex-row">
        <div className = "flex flex-col text-3xl">
        <div className = "px-20 border-2 border-black py-10 ml-10 rounded-t-lg"> Lessons </div>
          <div className = "flex flex-col font-light">
        <Link to="/intro" className = "border-l-2 border-r-2 border-b-2 border-black py-2 px-5 ml-10"> intro </Link>
        <Link to="/select" className = "border-l-2 border-r-2 border-b-2 border-black py-2 px-5 ml-10"> select </Link>
        <Link to="/order" className = "border-l-2 border-r-2 border-black py-2 px-5 ml-10"> order </Link>
        <Link to="/advanced" className = "border-2 border-black py-2 px-5 ml-10 rounded-b-lg"> advanced lessons </Link>
          </div>
        </div>
        {/* to put down a journey map based on whether user has completed so and so */}
        <div className = "ml-96">
          JOURNEY MAP
          </div>
        </div>
        <div className = "text-white mt-64 h-auto bg-cyan-600">
          <div className = "px-4 py-4"> Questions </div>
          <div className = "px-4 py-4"> Privacy </div>
          <div className = "px-4 py-4"> About Us </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default HomePage;