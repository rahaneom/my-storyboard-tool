import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Storyboard = () => {
  const [storyPoints, setStoryPoints] = useState([]);
  const inputRef = useRef("");
  const audioRef = useRef(null);

  useEffect(() => {
    const handleUserInteraction = () => {
      audioRef.current.volume = 0.04
      audioRef.current.play().catch((e) => {
        console.log("Audio play failed:", e);
      });

      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  const handleAdd = () => {
    if (inputRef.current.value.trim()) {
      setStoryPoints([...storyPoints, inputRef.current.value]);
      inputRef.current.value = "";
      toast.success("Story point added!");
    } else {
      toast.error("Please enter a valid story point.");
    }
  };

  const handleDelete = (index) => {
    const updatedPoints = storyPoints.filter((_, i) => i !== index);
    setStoryPoints(updatedPoints);
    toast.success("Story point deleted!");
  };

  const handleDragStart = (index) => {
    inputRef.current.draggedItem = index;
  };

  const handleDragEnter = (index) => {
    const draggedItem = inputRef.current.draggedItem;
    if (draggedItem === index) return;

    const items = [...storyPoints];
    const item = items.splice(draggedItem, 1)[0];
    items.splice(index, 0, item);

    inputRef.current.draggedItem = index;
    setStoryPoints(items);
  };

  const handleDragEnd = () => {
    inputRef.current.draggedItem = null;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <audio ref={audioRef} src="/audio-story.mp3" />
      <div className="flex gap-6">
        {/* Left Side */}
        <div className="bg-white p-6 rounded-xl shadow-xl w-120">
          <div className="flex items-center justify-center gap-2 mb-7">
            <img src="./script.png" className="h-10 w-10" alt="" />

            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Storyboard Tool
            </h2>
          </div>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              placeholder="Enter story point"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleAdd}
              className="bg-purple-900 text-white rounded-lg px-6 py-3 font-medium hover:bg-purple-700 transition"
            >
              Add
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {storyPoints.map((point, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
              >
                <span className="text-slate-800 font-medium">{point}</span>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-pink-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-gray-800 text-white p-6 rounded-xl shadow-xl w-100">
          <h2 className="text-2xl font-bold mb-7 text-center">Preview</h2>
          {storyPoints.length === 0 ? (
            <p className="text-gray-400 italic">No story points added yet.</p>
          ) : (
            <ul className="space-y-2">
              {storyPoints.map((point, index) => (
                <li
                  key={index}
                  className="bg-gray-700 p-2 rounded-md shadow-md italic font-medium"
                >
                  {index + 1}. {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Storyboard;
