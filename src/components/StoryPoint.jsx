import { useRef } from "react";

const StoryPoint = ({ text, index, onDelete, onReorder }) => {
  const ref = useRef(null);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("index", index);
    ref.current.classList.add("opacity-50");
  };

  const handleDragEnd = () => {
    ref.current.classList.remove("opacity-50");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const startIndex = e.dataTransfer.getData("index");
    onReorder(Number(startIndex), index);
  };

  return (
    <li
      ref={ref}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="bg-gray-100 p-3 rounded-lg flex justify-between items-center cursor-move hover:bg-gray-200 transition"
    >
      <span className="text-gray-700">{text}</span>
      <button
        onClick={() => onDelete(index)}
        className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
      >
        Delete
      </button>
    </li>
  );
};

export default StoryPoint;
