import { useEffect } from 'react';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthData, setAuthLoading } from '@/reducers/userSlice';

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.user.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log('Auth state:', authUser);

      // Check if the Redux user state is already populated
      if (!reduxUser && authUser) {
        // Dispatch actions to update Redux state
        dispatch(setAuthData(authUser));
        console.log("auth data updated")
      }

      // Regardless of whether Redux state is populated or not, set loading state
      dispatch(setAuthLoading(false));
    });

    return () => {
      console.log('Cleaning up AuthContext');
      unsubscribe();
    };
  }, [dispatch, reduxUser]);

  return children;
};
