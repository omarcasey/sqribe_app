import React, { useState } from "react";
import { Button, RadioGroup, Radio } from "@nextui-org/react";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const StepOne = () => {
  return (
    <div className="flex flex-col items-center p-6 mr-6">
      <p className="mb-6 font-semibold text-foreground-500 w-full">How did you find out Sqribe?</p>
      <RadioGroup>
        <Radio value="google">Search Engine (e.g., Google)</Radio>
        <Radio value="youtube">Social Media (e.g., Facebook, Twitter)</Radio>
        <Radio value="tiktok">Online Advertisement</Radio>
        <Radio value="instagram">Word of Mouth/Referral</Radio>
        <Radio value="friend">Other (please specify)</Radio>
      </RadioGroup>
    </div>
  );
};

const StepTwo = () => {
  return (
    <div className="flex flex-col items-center">
      <h2>Step 2: Question 2</h2>
    </div>
  );
};

const StepThree = () => {
  return (
    <div className="flex flex-col items-center">
      <h2>Step 3: Question 3</h2>
    </div>
  );
};

const StepFour = () => {
  return (
    <div className="flex flex-col items-center">
      <h2>Step 4: Question 4</h2>
    </div>
  );
};

const Survey = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted!");
  };

  return (
    <div className="flex">
      <div className="w-1/2">
        {step === 1 && <StepOne onNext={handleNextStep} />}
        {step === 2 && <StepTwo onNext={handleNextStep} />}
        {step === 3 && <StepThree onNext={handleNextStep} />}
        {step === 4 && <StepFour onSubmit={handleSubmit} />}
        <div className="flex items-center justify-between w-full">
          {step > 1 && step < 4 ? (
            <Button onClick={handlePrevStep} className="min-w-0 px-4" size="sm">
              <FaArrowAltCircleLeft />
            </Button>
          ) : (
            <div></div>
          )}
          {step === 4 ? (
            <Button onClick={handleSubmit} className="min-w-0 px-4" size="sm">
              <FaCheck />
            </Button>
          ) : (
            <Button onClick={handleNextStep} className="min-w-0 px-4" size="sm">
              <FaArrowAltCircleRight />
            </Button>
          )}
        </div>
      </div>
      <div className="w-1/2">
        <Image alt="" src="/drakedont.png" width={1000} height={1000} />
      </div>
    </div>
  );
};

export default Survey;
