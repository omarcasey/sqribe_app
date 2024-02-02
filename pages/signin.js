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

      toast.success("Signed in successfully!");
      router.push("/app/dashboard");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      toast.error("The credentials you entered are not valid");
    }
  };

  return (
    <div className="h-screen flex flex-row text-foreground">
      <div className="w-full px-4 lg:w-[45%] bg-white dark:bg-black flex justify-center items-center">
        <div className="flex flex-col items-center justify-start max-w-sm w-full">
          <Link href="/" className="flex items-center justify-center -ml-6 lg:-ml-0 lg:justify-start w-full mb-10">
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
            Sign in
          </h1>
          <p className="mb-6 w-full">Continue translating video 🤘</p>
          <Button
            variant="bordered"
            className="flex items-center justify-center border border-foreground-300 px-4 py-1 rounded-xl w-full shadow h-14"
          >
            <Image
              src="/google.png"
              width={1000}
              height={1000}
              alt="Google logo"
              className="w-10 h-10"
            />
            <p className="text-foreground-500 font-semibold ml-2">
              Sign in with Google
            </p>
          </Button>
          <div className="flex items-center justify-center mt-6 w-full">
            <div className="border-t border-foreground-300 flex-grow"></div>
            <p className="text-foreground-500 mx-4">Or sign in with e-mail</p>
            <div className="border-t border-foreground-300 flex-grow"></div>
          </div>
          <form
            onSubmit={signInWithEmail}
            className="flex flex-col w-full mt-6"
          >
            <p className="mb-2 text-sm font-medium">Email</p>
            <Input
              type="email"
              variant="bordered"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <p className="mb-2 text-sm font-medium">Password</p>
            <Input
              type="password"
              variant="bordered"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            <p className="mb-2 text-sm font-bold text-cyan-500">
              Forgot Password
            </p>
            <Button
              type="submit"
              className="mt-6 h-unit-14 text-white bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold text-base"
            >
              Sign in
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
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-cyan-500 font-bold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="w-[55%] bg-slate-100 dark:bg-neutral-800 justify-center items-center hidden lg:flex">
        <div className="flex flex-col items-center justify-start w-full px-16">
          <p className="text-5xl">Localize videos. Fast. Fun. With AI.</p>
          <Image src={"/drakedont.png"} height={1000} width={1000} alt="signinidk" className="mt-10 border border-foreground-500 shadow-xl" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
