// pages/signup.js
import { useState } from "react";
import { auth } from "@/firebase";
import { Input, Button } from "@nextui-org/react";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { Timestamp } from "firebase/firestore";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      // Add user information to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        darkMode: false,
        subscription: "free",
        usedCredits: 0,
        remainingCredits: 100,
        totalCredits: 100,
        createdAt: new Timestamp.now(),
        // Add more user details as needed
      });
      console.log("Signed up and add");

      router.push("/app/dashboard");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      toast.error("The credentials you entered are not valid");
    }
  };

  return (
    // <div className="h-screen flex flex-col items-center justify-start dark">
    //   <Link className="flex flex-col items-center mb-14" href={"/"}>
    //     <Image
    //       src={"/new logo transparent.png"}
    //       width={1024}
    //       height={1024}
    //       className="w-24 contrast-125 mt-10"
    //       alt=""
    //     />
    //     <p className="text-gray-400 font-bold text-xl tracking-widest">
    //       Sqribe
    //     </p>
    //   </Link>
    //   <h1 className="text-3xl font-bold mb-10">Sign Up</h1>
    //   <form
    //     onSubmit={signUp}
    //     className="bg-neutral-800 rounded-lg p-10 flex flex-col w-[28rem]"
    //   >
    //     <Input
    //       type="email"
    //       variant="underlined"
    //       placeholder="Enter your email or username"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <Input
    //       type="password"
    //       variant="underlined"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <Button
    //       type="submit" // Ensure that the button type is "submit"
    //       className="mt-6 h-unit-14 text-white bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold text-base"
    //       isDisabled={email.length <= 4 ? true : false}
    //     >
    //       Continue
    //     </Button>
    //     <p className="my-6 text-center text-sm">or</p>
    //     <Button
    //       className="flex justify-start border-white border px-8 py-unit-7"
    //       variant="bordered"
    //     >
    //       <FaGoogle size={20} className="text-white mr-10" />
    //       <p className="text-white font-bold">Continue with Google</p>
    //     </Button>
    //   </form>
    //   <ToastContainer
    //     position="top-center"
    //     autoClose={5000}
    //     hideProgressBar={false}
    //     newestOnTop={false}
    //     closeOnClick
    //     rtl={false}
    //     pauseOnFocusLoss
    //     draggable
    //     pauseOnHover
    //     theme="dark"
    //     style={{ width: "400px" }} // Set the width as needed
    //   />
    // </div>
    <div className="h-screen flex flex-row text-foreground">
      <div className="w-[45%] bg-white dark:bg-black flex justify-center">
        <div className="flex flex-col items-center justify-start max-w-sm mt-24 w-full">
          <Link href="/" className="flex items-center w-full mb-10">
            <Image
              className="w-auto h-16 mr-4"
              src="/new logo transparent.png"
              alt=""
              width={1024}
              height={1024}
            />
            <h1 className="text-foreground font-extrabold text-3xl tracking-tight">
              Sqribe
            </h1>
          </Link>
          <h1 className="text-3xl font-medium mb-4 text-foreground w-full">
            Sign Up for free
          </h1>
          <p className="mb-4 w-full">
            We recommend using your work email —<br/> it keeps work and life
            separate.
          </p>
          <div className="flex items-center justify-center border border-foreground-300 px-4 py-1 rounded-xl w-full shadow">
            <Image src="/google.png" width={1000} height={1000} alt="Google logo" className="w-10 h-10" />
            <p className="text-foreground-500 font-semibold ml-2">
              Sign up with Google
            </p>
          </div>
          <div className="flex items-center justify-center mt-6 w-full">
            <div className="border-t border-foreground-300 flex-grow"></div>
            <p className="text-foreground-500 mx-4">Or sign up with e-mail</p>
            <div className="border-t border-foreground-300 flex-grow"></div>
          </div>
          <form
            onSubmit={signUp}
            className="flex flex-col w-full mt-6"
          >
            <Input
              type="email"
              variant="bordered"
              placeholder="Enter your email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              variant="bordered"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              className="mt-6 h-unit-14 text-white bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold text-base"
              isDisabled={email.length <= 4 ? true : false}
            >
              Sign up
            </Button>
            <p className="my-6 text-center text-sm">or</p>
            <Button
              className="flex justify-start border-white border px-8 py-unit-7"
              variant="bordered"
            >
              <FaGoogle size={20} className="text-white mr-10" />
              <p className="text-white font-bold">Continue with Google</p>
            </Button>
          </form>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            style={{ width: "400px" }}
          />
          <p className="text-center text-sm mt-10">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-500 font-bold">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <div className="w-[55%] bg-default-200"></div>
    </div>
  );
};

export default SignUp;
