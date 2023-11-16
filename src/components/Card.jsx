import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Card = ({
  data,
  handleDelete,
  setFlag,
  setEdit,
  setRecord,
  setDescription,
}) => {
  const cardColor = data?.type === "income" ? "bg-green-200" : "bg-red-200";

  const getRecord = () => {
    setDescription(true);
    setRecord(data);
    setFlag(true);
  };

  return (
    <div
      onClick={getRecord}
      className={`p-4 m-2 h-24 shadow-lg cursor-pointer hover:scale-110 transition-all duration-300}  rounded-lg w-[90%] md:w-[60%]  ${cardColor}`}
    >
      <div className="flex h-full justify-between items-center    ">
        <p className="text-xs md:text-lg font-bold     overflow-hidden text-ellipsis   ">
          {data?.type === "income" ? "+" : "-"}${data?.amount}
        </p>

        <p className="text-sm md:text-md font-thin italic  text-gray-600">
          {data?.date}
        </p>
        <div className="flex gap-2">
          <FaRegEdit
            onClick={(e) => {
              e.stopPropagation()
              setFlag(false);
              setEdit(data);
            }}
            size={20}
            className=" hover:scale-110 transition-all cursor-pointer duration-300"
          />
          <MdDeleteForever
            onClick={(e) =>{
              e.stopPropagation()
              handleDelete(data?.id)
            } }
            size={20}
            className="hover:scale-110 transition-all cursor-pointer duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
