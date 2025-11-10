const Home = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-16 bg-white">
      <h1 className="text-5xl font-bold text-blue-600 mb-8">
        Home
      </h1>
      <div className="text-center max-w-2xl px-6">
        <p className="text-lg text-gray-700 mb-2">
          "The only way to learn is live."
        </p>
        <p className="text-sm text-gray-600">
          <span className="underline cursor-pointer hover:text-blue-600">Matt Haig</span> - The Midnight Library
        </p>
      </div>
    </div>
  );
};

export default Home;
