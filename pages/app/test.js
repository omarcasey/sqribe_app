import React from "react";

const Test = () => {
  return (
    <div className="flex flex-col h-screen">
      <div class="flex flex-wrap -mb-4 bg-red-500">
        <div class="w-1/3 mb-4 bg-gray-400 h-12"></div>
        <div class="w-1/3 mb-4 bg-gray-500 h-12"></div>
        <div class="w-1/3 mb-4 bg-gray-400 h-12"></div>
        <div class="w-1/3 mb-4 bg-gray-500 h-12"></div>
        <div class="w-1/3 mb-4 bg-gray-400 h-12"></div>
      </div>
      <nav className="h-16 bg-neutral-100"></nav>
      <div className="flex flex-1 bg-neutral-200 overflow-hidden">
        <div className="w-2/3 flex flex-col">
          <div className="flex h-14 bg-red-200 flex-shrink-0"></div>
          <div className="bg-red-100 overflow-auto">
            {Array.from({ length: 50 }, (_, index) => (
              <p key={index} className="text-black">
                This is block of text number {index + 1}
              </p>
            ))}
          </div>
        </div>
        <div className="w-1/3 bg-blue-100"></div>
      </div>
    </div>
  );
};

export default Test;
