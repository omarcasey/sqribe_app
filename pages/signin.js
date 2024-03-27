import { useState } from "react";
import { auth, db } from "@/firebase";
import { Input, Button } from "@nextui-org/react";
import Image from "next/image";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51OjOT0LgT8zvXr8nEojzCeUNTPJgP89CQv0v95gOLoJwUDOpYP1JolBc40aGl7h9y4VT3pKOtclFd55PJK9M8eJ200AdnmMHrM"
);

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to hold error message

  const signInWithEmail = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    setLoading(true);

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
      console.error("Firebase Auth Error:", errorCode, errorMessage);

      // Handle specific error messages based on error code
      switch (errorCode) {
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/user-disabled":
          setError("Your account has been disabled.");
          break;
        case "auth/user-not-found":
          setError("User not found. Please check your email or sign up");
          break;
        case "auth/wrong-password":
          setError("Invalid password. Please try again");
          break;
        case "auth/invalid-credential":
          setError("Invalid credentials. Please try again");
          break;
        case "auth/too-many-requests":
          setError(
            "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
          );
          break;
        default:
          setError(errorMessage);
      }
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Sign in with Google
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Check if the user exists in your Firestore database
      const userDoc = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDoc);

      if (userDocSnapshot.exists()) {
        // User exists, sign in normally
        toast.success("Signed in successfully!");
        router.push("/app/dashboard");
      } else {
        // User doesn't exist, proceed with signup
        // Add to stripe
        const customer = await stripe.customers.create({
          email: user.email,
        });

        // Add user information to Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          darkMode: false,
          subscription: {
            planID: "Free Trial",
            startDate: Timestamp.now(),
            status: "Active",
            usage: {
              usedSeconds: 0,
              remainingSeconds: 300,
              totalSeconds: 300,
            },
          },
          createdAt: Timestamp.now(),
          surveyCompleted: false,
          stripeId: customer.id,
        });
        console.log("Signed up and signed in successfully!");
        toast.success("Signed up and signed in successfully!");
        router.push("/app/dashboard");
      }
    } catch (error) {
      console.error("Firebase Auth Error:", error.code, error.message);
      setError(error.message); // Set error state or handle error accordingly
    }
  };

  return (
    <div className="h-screen flex flex-row text-foreground">
      <div className="w-full px-4 lg:w-[45%] bg-white dark:bg-black flex justify-center items-center">
        <div className="flex flex-col items-center justify-start max-w-sm w-full">
          <Link
            href="/"
            className="flex items-center justify-center -ml-6 lg:-ml-0 lg:justify-start w-full mb-10"
          >
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
            onPress={signInWithGoogle}
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
              className=""
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}{" "}
            {/* Render error message */}
            <p className="mb-2 text-sm font-bold text-cyan-500 mt-4">
              Forgot Password
            </p>
            <Button
              isLoading={loading}
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
          <Image
            src={"/drakedont.png"}
            height={1000}
            width={1000}
            alt="signinidk"
            className="mt-10 border border-foreground-500 shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
