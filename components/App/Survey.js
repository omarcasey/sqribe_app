import React, { useState } from "react";
import { Button, RadioGroup, Radio } from "@nextui-org/react";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { db } from "@/firebase";
import { useSelector } from "react-redux";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";

const StepOne = ({ question, setQuestion }) => {
  return (
    <div className="flex flex-col p-6 flex-1">
      <p className="mb-6 font-semibold text-foreground-500 w-full">
        How did you find out Sqribe?
      </p>
      <RadioGroup value={question} onValueChange={setQuestion}>
        <Radio value="Search Engine">Search Engine (e.g., Google)</Radio>
        <Radio value="Social Media">
          Social Media (e.g., Facebook, Twitter)
        </Radio>
        <Radio value="Online Advertisement">Online Advertisement</Radio>
        <Radio value="Word of Mouth/Referral">Word of Mouth/Referral</Radio>
        <Radio value="Other">Other (please specify)</Radio>
      </RadioGroup>
    </div>
  );
};

const StepTwo = ({ question, setQuestion }) => {
  return (
    <div className="flex flex-col p-6 flex-1">
      <p className="mb-6 font-semibold text-foreground-500 w-full">
        How satisfied are you with the quality of the dubbed videos produced by
        our AI service?
      </p>
      <RadioGroup value={question} onValueChange={setQuestion}>
        <Radio value="Very Satisfied">Very Satisfied</Radio>
        <Radio value="Satisifed">Satisifed</Radio>
        <Radio value="Neutral">Neutral</Radio>
        <Radio value="Dissatisfied">Dissatisfied</Radio>
        <Radio value="Very Dissatisfied">Very Dissatisfied</Radio>
      </RadioGroup>
    </div>
  );
};

const StepThree = ({ question, setQuestion }) => {
  return (
    <div className="flex flex-col p-6 flex-1">
      <p className="mb-6 font-semibold text-foreground-500 w-full">
        Which feature of our AI video dubbing service do you find most valuable?
      </p>
      <RadioGroup value={question} onValueChange={setQuestion}>
        <Radio value="Voice Variety">Voice Variety</Radio>
        <Radio value="Accuracy of Lip Syncing">Accuracy of Lip Syncing</Radio>
        <Radio value="Language Support">Language Support</Radio>
        <Radio value="Customization Options">Customization Options</Radio>
        <Radio value="Other">Other (please specify)</Radio>
      </RadioGroup>
    </div>
  );
};

const StepFour = ({ question, setQuestion }) => {
  return (
    <div className="flex flex-col p-6 flex-1">
      <p className="mb-6 font-semibold text-foreground-500 w-full">
        In which aspect of our AI video dubbing service would you like to see
        the most improvement?
      </p>
      <RadioGroup value={question} onValueChange={setQuestion}>
        <Radio value="Dubbing Accuracy">Dubbing Accuracy</Radio>
        <Radio value="User Interface/Experience">
          User Interface/Experience
        </Radio>
        <Radio value="Speed of Processing">Speed of Processing</Radio>
        <Radio value="Additional Features">Additional Features</Radio>
        <Radio value="Other">Other (please specify)</Radio>
      </RadioGroup>
    </div>
  );
};

const Survey = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const uid = useSelector((state) => state.user.auth.uid);
  const [question1, setQuestion1] = React.useState(null);
  const [question2, setQuestion2] = React.useState(null);
  const [question3, setQuestion3] = React.useState(null);
  const [question4, setQuestion4] = React.useState(null);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    // Handle form submission
    console.log(question1);
    console.log(question2);
    console.log(question3);
    console.log(question4);
    try {
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);
      const currentData = docSnap.data();
      const updatedTotalSeconds =
        currentData.subscription.usage.totalSeconds + 600;
      const updatedRemainingSeconds =
        currentData.subscription.usage.remainingSeconds + 600;
      updateDoc(userRef, {
        subscription: {
          ...currentData.subscription,
          usage: {
            ...currentData.subscription.usage,
            totalSeconds: updatedTotalSeconds,
            remainingSeconds: updatedRemainingSeconds,
          },
        },
        surveyCompleted: true,
      });
      addDoc(collection(db, "surveys"), {
        uid,
        question1,
        question2,
        question3,
        question4,
      });
      onClose();
    } catch (e) {
      console.error("Error updating credits: ", e);
    }
    console.log("Form submitted!");
  };

  const isOptionSelected = () => {
    switch (step) {
      case 1:
        return question1 !== null;
      case 2:
        return question2 !== null;
      case 3:
        return question3 !== null;
      case 4:
        return question4 !== null;
      default:
        return false;
    }
  };

  return (
    <div className="flex h-96">
      <div className="w-1/2 flex flex-col">
        {step === 1 && (
          <StepOne question={question1} setQuestion={setQuestion1} />
        )}
        {step === 2 && (
          <StepTwo question={question2} setQuestion={setQuestion2} />
        )}
        {step === 3 && (
          <StepThree question={question3} setQuestion={setQuestion3} />
        )}
        {step === 4 && (
          <StepFour question={question4} setQuestion={setQuestion4} />
        )}
        <div className="flex items-center justify-between w-full p-3">
          {step > 1 && step < 4 ? (
            <Button onClick={handlePrevStep} className="min-w-0 px-4" size="sm">
              <FaArrowAltCircleLeft />
            </Button>
          ) : (
            <div></div>
          )}
          {step === 4 ? (
            <Button
              onClick={handleSubmit}
              isDisabled={!isOptionSelected()}
              className="min-w-0 px-4"
              size="sm"
            >
              <FaCheck />
            </Button>
          ) : (
            <Button
              onClick={handleNextStep}
              isDisabled={!isOptionSelected()}
              className="min-w-0 px-4"
              size="sm"
            >
              <FaArrowAltCircleRight />
            </Button>
          )}
        </div>
      </div>
      <div className="w-1/2">
        <Image
          alt=""
          src="/drakedont.png"
          width={1000}
          height={1000}
          className="h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Survey;
