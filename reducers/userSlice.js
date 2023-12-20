// userSlice.js
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";

// Async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (uid) => {
    const userRef = doc(db, "users", uid);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      throw new Error("User data not found");
    }
  }
);

// Async thunk for fetching user data
export const fetchUserProjects = createAsyncThunk(
  "user/fetchUserProjects",
  async (uid) => {
    const projectsCollection = collection(db, "projects");
    const userProjectsQuery = query(
      projectsCollection,
      where("user", "==", uid)
    );

    const projectsSnapshot = await getDocs(userProjectsQuery);
    const projectsData = projectsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return projectsData;
  }
);

// Async thunk for fetching user data
export const clearUserData = createAsyncThunk("user/clearUserData", () => {
  return null;
});

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    projects: null,
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserProjects.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchUserProjects.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchUserProjects.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      // Add a case to handle clearing user data
      .addCase(clearUserData.fulfilled, (state, action) => {
        state.data = null;
      });
  },
});

export default userSlice.reducer;
