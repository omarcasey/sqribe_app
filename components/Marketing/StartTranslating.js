import { Button } from "@nextui-org/react";
import React from "react";

const StartTranslating = () => {
  return (
    <section className="pt-6 md:pt-24 pb-12 sm:pb-16 lg:pb-20 xl:pb-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 saturate-200 rounded-3xl flex flex-col md:flex-row justify-between items-center px-20 py-6 md:py-14">
          <p className="text-2xl md:text-3xl tracking-tight md:text-start text-center mb-4 md:mb-0">
            Start translating videos now
          </p>
          <Button
            size="lg"
            className="bg-white py-4 md:py-8 w-52 text-blue-700 text-xl font-semibold"
          >
            Try it free
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StartTranslating;
