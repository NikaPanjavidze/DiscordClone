
const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="flex space-x-2">
        <div className="w-4 h-16 bg-white animate-bounce [animation-delay:-0.3s]" />
        <div className="w-4 h-16 bg-white animate-bounce [animation-delay:-0.15s]" />
        <div className="w-4 h-16 bg-white animate-bounce" />
      </div>
    </div>
  );
};

export default Loading;
