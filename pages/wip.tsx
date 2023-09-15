import React from 'react';
import Navbar from '@/Components/header/Navbar';
const Wip = () => {
  return (<>
  
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-slate-400 -translate-y-10 rounded-lg p-8 shadow">
        <div className="flex justify-center mb-4">
          <img
            src="Mascot.png"
            alt="Site Mascot"
            className="h-20 w-20"
          />
        </div>
        <h1 className="text-2xl font-bold mb-4">Work in Progress</h1>
        <p className="text-gray-700">This page is currently under construction.</p>
        <p className="text-gray-700">Please check back later!</p>
      </div>
    </div>
  </>);
};

export default Wip;