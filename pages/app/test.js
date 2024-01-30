import React from "react";

const Test = () => {
  return (
    <div className="flex flex-col h-screen">
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
