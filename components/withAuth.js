import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  fetchUserData,
  clearUserData,
  fetchUserProjects,
} from "@/reducers/userSlice";
import { onSnapshot, doc, collection, query, where } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Spinner } from "@nextui-org/react";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state) => state.user.data);
    const loading = useSelector((state) => state.user.loading);
    const authLoading = useSelector((state) => state.user.authLoading);

    useEffect(() => {
      const checkAuth = async () => {
        console.log("checking auth");
        try {
          // Check if the user is authenticated
          const currentUser = await auth.currentUser;

          if (currentUser) {
            // If user is authenticated, fetch user data if not already in Redux
            if (!user) {
              await dispatch(fetchUserData(currentUser.uid));
              await dispatch(fetchUserProjects(currentUser.uid));
              console.log("fetched data into redux");
            }

            // Set up real-time listener for user data in Firestore
            const userDocRef = doc(db, "users", currentUser.uid);
            const unsubscribeUserData = onSnapshot(userDocRef, (doc) => {
              if (doc.exists()) {
                // Update user data in Redux when Firestore data changes
                dispatch({ type: "user/setUserData", payload: doc.data() });
                console.log("updated user data");
              }
            });
            console.log("setup realtime listener for user data");

            // Set up real-time listener for user projects in Firestore
            const projectsCollection = collection(db, "projects");
            const userProjectsQuery = query(
              projectsCollection,
              where("user", "==", currentUser.uid)
            );
            const unsubscribeUserProjects = onSnapshot(
              userProjectsQuery,
              (snapshot) => {
                const projectsData = snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }));
                // Dispatch an action to update user projects in Redux
                dispatch({
                  type: "user/setUserProjects",
                  payload: projectsData,
                });
                console.log("updated user projects");
              }
            );
            console.log("setup realtime listener for user projects");

            // Cleanup the Firestore listeners on component unmount
            return () => {
              unsubscribeUserData();
              unsubscribeUserProjects();
            };
          } else {
            // If not authenticated, redirect to the login page
            console.log("not authenticated, pushing to signin page");
            router.push("/signin");
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
        }
      };

      // Only check authentication if not already loading
      if (loading === "idle" && authLoading === false) {
        checkAuth();
      }
    }, [authLoading]);

    // Render the wrapped component if the user is authenticated and data is loaded
    return user && loading === "succeeded" ? (
      <WrappedComponent {...props} />
    ) : (
      <div className="h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  };

  return Wrapper;
};

export default withAuth;
