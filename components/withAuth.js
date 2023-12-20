import { useRouter } from "next/router";
import { useAuth } from "./authContext";
import { Spinner } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserData, fetchUserProjects } from "@/reducers/userSlice";

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const router = useRouter();
    const { user, loading } = useAuth();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.data);

    useEffect(() => {
      // Check if userData is empty, and fetch data if needed
      if (!userData && user) {
        // Assuming you have a way to get the userId from your authentication state
        const userUID = user.uid; // Replace with your logic to get the userId
        console.log("Fetching User Data");

        // Dispatch the fetchUserData action
        dispatch(fetchUserData(userUID))
          .then(() => {
            console.log("User Data Successfully Fetched");
          })
          .catch((error) => {
            console.error("Error Fetching User Data:", error);
          });

        // Dispatch the fetchUserData action
        dispatch(fetchUserProjects(userUID))
          .then(() => {
            console.log("User Projects Successfully Fetched");
          })
          .catch((error) => {
            console.error("Error Fetching User Data:", error);
          });
      }
    }, [user]);

    // If user is not authenticated, redirect
    if (!user && !loading) {
      console.log("User not authenticated, redirecting to /signin");
      router.push("/signin");
    } else {
      if (loading) {
        console.log("Loading authentication state, showing loading spinner");
      } else if (!userData && user) {
        console.log("Loading user state, showing loading spinner");
      }
    }

    // Render the WrappedComponent when authenticated
    if (!loading && user && userData) {
      console.log("User authenticated, rendering WrappedComponent");
      return <WrappedComponent {...props} />;
    }

    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  };

  WithAuth.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuth;
};

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

export default withAuth;
