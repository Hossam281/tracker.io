import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";

const Description = ({ showDescription,setDescription, description }) => {
    const modalClasses = showDescription
    ? 'fixed inset-0 flex items-center justify-center z-50  bg-gray-800 bg-opacity-50'
    : 'hidden';
    const closeModal = (e) => {
        e.stopPropagation();
        setDescription(false);
    }
  return (
    <div className={modalClasses}>
      <div className="bg-white relative p-8 rounded-md shadow-lg w-[90%] md:w-1/2">
        <h1 className="text-2xl font-bold mb-4">Description</h1>
        <IoIosCloseCircle onClick={closeModal} size={30} className=" text-red-600 cursor-pointer hover:scale-110 transition-all duration-300   absolute top-1 right-1  font-bold rounded-xl shadow-2xl  "/>
        <p className='text-lg break-words'>{description===""?"No description":description}</p>
        
        
      </div>
    </div>
  );

}

export default Description