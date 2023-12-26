import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/reducers/userSlice';
import { db } from '@/firebase';

const RealtimeListener = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userDocRef = doc(db, 'users', userId);

    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        // Assuming your user data is stored in the 'data' field
        const userData = doc.data().data;
        dispatch(setUserData(userData));
      } else {
        // Handle the case where the user document doesn't exist
        console.error('User document does not exist');
      }
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [dispatch, userId]);

  // Return any additional values or functions your component might need
  return {};
};

export default RealtimeListener;
