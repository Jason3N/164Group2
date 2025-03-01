import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import CatPFP from "../assets/cat.svg";
import CheckmarkPic from "../assets/checkmark.svg"
import UncheckmarkPic from "../assets/uncheckmark.svg"

const HomePage: React.FC = () => {

  const [introCheckmark, setIntroCheckmark] = useState<boolean>(() => {
    const stored = localStorage.getItem("introCheckmark");
    return stored ? JSON.parse(stored) : false;
  });

  const handleIntroCheckmark = () => {
    setIntroCheckmark(prev => !prev);
  };

  const [selectCheckmark, setSelectCheckmark] = useState<boolean>(() => {
    const stored = localStorage.getItem("selectCheckmark");
    return stored ? JSON.parse(stored) : false;
  });

  const handleSelectCheckmark = () => {
    setSelectCheckmark(prev => !prev);
  };

  const [orderCheckmark, setOrderCheckmark] = useState<boolean>(() => {
    const stored = localStorage.getItem("orderCheckmark");
    return stored ? JSON.parse(stored) : false;
  });

  const handleOrderCheckmark = () => {
    setOrderCheckmark(prev => !prev);
  };

  const [advancedCheckmark, setAdvancedCheckmark] = useState<boolean>(() => {
    const stored = localStorage.getItem("advancedCheckmark");
    return stored ? JSON.parse(stored) : false;
  });

  const handleAdvancedCheckmark = () => {
    setAdvancedCheckmark(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem("introCheckmark", JSON.stringify(introCheckmark));
    localStorage.setItem("selectCheckmark", JSON.stringify(selectCheckmark));
    localStorage.setItem("orderCheckmark", JSON.stringify(orderCheckmark));
    localStorage.setItem("advancedCheckmark", JSON.stringify(advancedCheckmark));
  }, [introCheckmark, selectCheckmark, orderCheckmark, advancedCheckmark]);


  return (
    <>  
      <div>
        <div className="p-8 text-white text-2xl font-bold bg-cyan-600">
          SQL Playground (GROUP 2 ON TOP)
        </div>
        <div className="flex flex-row ml-24 mt-10 text-5xl">
          <div className="mt-6"> Welcome Home, Joey </div>
          <img className="ml-auto mr-96 h-32 w-32" src={CatPFP} alt="cat profile" />
        </div>
        <div>
          <div className="ml-16 mt-24 flex flex-row">
            <div className="flex flex-col text-3xl">
              <div className="px-24 border-2 border-black py-10 ml-10 rounded-t-lg"> Lessons </div>
              <div className="flex flex-col font-light">
                <Link 
                  to="/intro" 
                  onClick={handleIntroCheckmark} 
                  className="border-l-2 border-r-2 border-b-2 border-black py-2 px-5 ml-10 flex flex-row"
                >
                  intro <img className = "ml-auto h-10 w-10"src={introCheckmark ? CheckmarkPic : UncheckmarkPic } alt="checkmark" />
                </Link>
                <Link 
                  to="/select" 
                  onClick={handleSelectCheckmark} 
                  className="border-l-2 border-r-2 border-b-2 border-black py-2 px-5 ml-10 flex flex-row"
                >
                  select
                  <img className = "ml-auto h-10 w-10"src={selectCheckmark ? CheckmarkPic : UncheckmarkPic } alt="checkmark" />
                </Link>
                <Link 
                  to="/order" 
                  onClick={handleOrderCheckmark} 
                  className="border-l-2 border-r-2 border-black py-2 px-5 ml-10 flex flex-row"
                >
                  order
                  <img className = "ml-auto h-10 w-10"src={orderCheckmark ? CheckmarkPic : UncheckmarkPic } alt="checkmark" />
                </Link>
                <Link 
                  to="/advanced" 
                  onClick={handleAdvancedCheckmark} 
                  className="border-2 border-black py-2 px-5 ml-10 rounded-b-lg flex flex-row"
                >
                  advanced lessons
                  <img className = "ml-auto h-10 w-10"src={advancedCheckmark ? CheckmarkPic : UncheckmarkPic } alt="checkmark" />
                </Link>
              </div>
            </div>
            <div className="ml-96">
            <div className="flex items-center space-x-2">
              <div className={`h-8 w-8 rounded-full ${advancedCheckmark ? "bg-green-500" : "bg-gray-300"}`}></div>
              <div className="flex-1 h-1 bg-gray-300">?</div>
              <div className={`h-8 w-8 rounded-full ${orderCheckmark ? "bg-green-500" : "bg-gray-300"}`}></div>
              <div className="flex-1 h-1 bg-gray-300">?</div>
              <div className={`h-8 w-8 rounded-full ${selectCheckmark ? "bg-green-500" : "bg-gray-300"}`}></div>
              <div className="flex-1 h-1 bg-gray-300">?</div>
              <div className={`h-8 w-8 rounded-full ${introCheckmark ? "bg-green-500" : "bg-gray-300"}`}></div>
            </div>
            </div>
          </div>
          <div className="text-white mt-64 h-auto bg-cyan-600">
            <div className="px-4 py-4"> Questions </div>
            <div className="px-4 py-4"> Privacy </div>
            <div className="px-4 py-4"> About Us </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
