// pages/signin.js
import { useState } from "react";
import { auth } from "@/firebase";
import { Input, Button } from "@nextui-org/react";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithEmail = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);

      toast.success("Signed in successfully!");
      router.push("/dashboard");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      toast.error("The credentials you entered are not valid");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-start dark">
      <Link className="flex flex-col items-center mb-14" href={"/"}>
        <Image
          src={"/abstract.png"}
          width={1024}
          height={1024}
          className="w-24 contrast-125 mt-10"
        />
        <p className="text-gray-400 font-bold text-xl tracking-widest">
          Sqribe
        </p>
      </Link>
      <h1 className="text-3xl font-bold mb-10">Log In</h1>
      <form
        onSubmit={signInWithEmail}
        className="bg-neutral-800 rounded-lg p-10 flex flex-col w-[28rem]"
      >
        <Input
          type="email"
          variant="underlined"
          placeholder="Enter your email or username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          variant="underlined"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit" // Ensure that the button type is "submit"
          className="mt-6 h-unit-14 text-white bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold text-base"
          isDisabled={email.length <= 4 ? true : false}
        >
          Continue
        </Button>
        <p className="my-6 text-center text-sm">or</p>
        <Button
          className="flex justify-start border-white border px-8 py-unit-7"
          variant="bordered"
        >
          <FaGoogle size={20} className="text-white mr-10" />
          <p className="text-white font-bold">Continue with Google</p>
        </Button>
        <Link className="text-center mt-4" href={"/signup"}>Signup</Link>
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
        style={{ width: "400px" }} // Set the width as needed
      />
    </div>
  );
};

export default SignIn;
