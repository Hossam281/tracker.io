import React, { useEffect } from "react";
import { useState } from "react";
import {  toast } from 'react-toastify';

const Modal = ({ isOpen, setModalOpen ,setRecords,edit,setEdit }) => {
  const modalClass = isOpen || edit ? "block" : "hidden";

  const [formData, setFormData] = useState({
    id:"",
    type: "income",
    date: "",
    amount: "",
    description: "",
  });

  useEffect(() => {
    if (edit) {
      setFormData(edit);
    }
  }, [edit]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (edit) {
      if(parseInt(formData.amount)<=0 || formData.amount===""){
        toast.error('Negative or zero amount not allowed', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return
      }
      else if(formData.date===""){
        toast.error('Date is required', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return
      }
      setRecords((prev) => {
        return prev.map((record) => {
          if (record?.id === edit?.id) {
            return { ...formData };
          }
          else {
            return record;
          }
        });
      });
      setEdit(null);
    } else {
      const tempData = {
        id: crypto.randomUUID(),
        type: formData.type,
        date: formData.date,
        amount: formData.amount,
        description: formData.description,
      };
      if(parseInt(tempData.amount)<=0 || tempData.amount===""){
        toast.error('Negative or zero amount not allowed', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return
      }
      else if(tempData.date===""){
        toast.error('Date is required', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return
      }
      setRecords((prev) => [...prev, tempData]);
    }
  
    setFormData({
      type: "income",
      date: "",
      amount: "",
      description: "",
    });
  
    setModalOpen(false);
  };
  

  return (
    <div
      className={`fixed inset-0 w-full bg-black z-[999] bg-opacity-50 ${modalClass}`}
    >
      <div className="fixed flex flex-col items-center bg-white p-4 rounded-md top-1/2 left-1/2 transform w-[90%] -translate-x-1/2 -translate-y-1/2 md:w-[50%]">
        <form onSubmit={handleSubmit} className="md:w-[50%] w-full flex  flex-col ">
          <div className="mb-6 flex flex-col  ">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Category 
            </label>
            <select
              type="dropdown"
              value={formData.type}
              onChange={handleChange}
              name="type"
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block  p-2.5  "
              placeholder=""
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Date
            </label>
            <input
              type="date"
              name="date"
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5  "
              onChange={handleChange}
              value={formData.date}
              pattern="\d{4}-\d{2}-\d{2}"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              onChange={handleChange}
              value={formData.amount}
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5  "
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5  "
              onChange={handleChange}
              value={formData.description}
              
            />
          </div>
          <div className="flex justify-evenly">
            <button
              onClick={handleSubmit}
              type="submit"
              className="text-gray-900 transition-all duration-300    hover:bg-yellow-500  bg-[#F4CE14] focus:outline-none font-bold rounded-lg text-sm   px-4 py-2.5 text-center  "
            >
              {edit ? "Update" : "Add"} 
            </button>
            <button
            type="button"
              onClick={(e) => {
                e.preventDefault();
                setModalOpen(false);
                setEdit(null);  
                setFormData({
                  type: "",
                  date: "",
                  amount: "",
                  description: "",
                });
              }}
              className="text-[#F5F7F8] px-4 transition-all duration-300    hover:bg-red-700  bg-red-600 focus:outline-none font-bold rounded-lg text-sm   py-2.5 text-center  "
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
