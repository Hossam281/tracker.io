import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Modal from "./components/Modal";
import Card from "./components/Card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Description from "./components/Description";
import { VscClearAll } from "react-icons/vsc";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showDescription, setDescription] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [record, setRecord] = useState(null);
  const [records, setRecords] = useState(() => {
    return JSON.parse(localStorage.getItem("records")) || [];
  });
  const [edit, setEdit] = useState(null);
  const [flag, setFlag] = useState(true);
  //console.log(records);
  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));
    setIncome(() =>
      records?.reduce(
        (a, b) => (b?.type === "income" ? a + parseInt(b?.amount) : a),
        0
      )
    );
    setExpense(() =>
      records?.reduce(
        (a, b) => (b?.type === "expense" ? a + parseInt(b?.amount) : a),
        0
      )
    );
  }, [records]);

  const handleDelete = (id) => {
    setFlag(false);
    setRecords((prev) => {
      return prev.filter((record) => record?.id !== id);
    });
  };
  return (
    <div className="w-full h-screen bg-[#F5F7F8]">
      <NavBar setModalOpen={setModalOpen} />
      <Modal
        isOpen={isModalOpen}
        setModalOpen={setModalOpen}
        setRecords={setRecords}
        records={records}
        edit={edit}
        setEdit={setEdit}
      />
      <div className="w-full flex  flex-col  items-center mt-12 gap-5 bg-inherit ">
        {records.map((record) => (
          <Card
            setFlag={setFlag}
            setRecord={setRecord}
            setDescription={setDescription}
            key={record?.id}
            data={record}
            setEdit={setEdit}
            handleDelete={handleDelete}
          />
        ))}
        {record && flag && (
          <Description
            showDescription={showDescription}
            setDescription={setDescription}
            description={record?.description}
          />
        )}
        {records.length > 0 ? (
          <div className="flex w-full justify-evenly mt-8  mb-7">
            <h1 className="md:text-lg text-sm text-center bg-[#495E57]  rounded-xl text-[#F5F7F8] p-2 md:p-4 font-bold">
              Total Income: {income}
            </h1>
            <h1 className="md:text-lg text-sm text-center bg-[#F4CE14]  rounded-xl text-[#45474B] p-2 md:p-4 font-bold">
              Total Balance: {income - expense}
            </h1>
            <h1 className="md:text-lg text-sm text-center bg-red-500  rounded-xl text-[#F5F7F8] p-2 md:p-4 font-bold">
              Total Expense: {expense}
            </h1>
          </div>
        ) : (
          <h1 className="md:text-lg text-sm text-center   rounded-xl text-[#45474B] p-2 md:p-4 font-bold">
            {" "}
            No records available
          </h1>
        )}
        {records.length > 0 && (
          <button
            onClick={() => setRecords([])}
            className=" bg-red-600 mb-6 flex items-center gap-3 font-semibold shadow-2xl hover:scale-90 transition-all duration-300 rounded-full p-3 text-font-bold text-lg text-[#F5F7F8]"
          >
            Clear All
            <VscClearAll />
          </button>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
