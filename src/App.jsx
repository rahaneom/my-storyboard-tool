import React, { useState } from "react";
import Storyboard from "./components/Storyboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/story2.jpg";

const App = () => {
  const [storyPoints, setStoryPoints] = useState([]);

  const handleAddPoint = (point) => {
    if (!point.trim()) {
      toast.error("Story point cannot be empty!");
      return;
    }
    setStoryPoints([...storyPoints, point]);
    toast.success("Story point added!");
  };

  const handleRemovePoint = (index) => {
    const updatedPoints = storyPoints.filter((_, i) => i !== index);
    setStoryPoints(updatedPoints);
    toast.info("Story point deleted!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center backdrop-blur-[2.8px] bg-black/50">
      <div className="flex gap-8">
        <Storyboard
          storyPoints={storyPoints}
          onAddPoint={handleAddPoint}
          onRemovePoint={handleRemovePoint}
        />
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default App;
