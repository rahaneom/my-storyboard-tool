const Preview = ({ storyPoints }) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md w-[350px]">
      <h2 className="text-xl font-semibold mb-4">Preview</h2>
      {storyPoints.length === 0 ? (
        <p className="text-gray-400">No story points added yet.</p>
      ) : (
        <ul className="space-y-2">
          {storyPoints.map((point, index) => (
            <li key={index} className="bg-gray-700 p-2 rounded-md">
              {index + 1}. {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Preview;
