// userSlice.js
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
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

// Async thunk for fetching audio file data
export const fetchAudioFile = createAsyncThunk(
  "user/fetchAudioFile",
  async (audioFileId) => {
    const audioFileRef = doc(db, "audio files", audioFileId);
    const snapshot = await getDoc(audioFileRef);

    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      throw new Error("Audio file not found");
    }
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
    auth: null,
    authLoading: true,
    userLoading: "idle",
    projectsLoading: "idle",
    error: null,
    audio: { audioPlayerVisible: false, audioFile: null, autoPlay: false },
    audioPlayerVisible: false, // New state to track if audio player should be visible
    audioFile: null, // New state to track the audio file
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    setUserProjects: (state, action) => {
      state.projects = action.payload;
    },
    setAuthData: (state, action) => {
      state.auth = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    setAudioPlayerVisible: (state, action) => {
      state.audio.audioPlayerVisible = action.payload;
    }, // New reducer to update audio player visibility
    setAudioFile: (state, action) => {
      state.audio.audioFile = action.payload;
    }, // New reducer to update audio file
    setAutoPlay: (state, action) => {
      state.audio.autoPlay = action.payload;
    }, // New reducer to update auto play
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.userLoading = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userLoading = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.userLoading = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserProjects.pending, (state) => {
        state.projectsLoading = "loading";
      })
      .addCase(fetchUserProjects.fulfilled, (state, action) => {
        state.projectsLoading = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchUserProjects.rejected, (state, action) => {
        state.projectsLoading = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAudioFile.pending, (state) => {
        state.audioLoading = "loading";
      })
      .addCase(fetchAudioFile.fulfilled, (state, action) => {
        state.audioLoading = "succeeded";
        state.audio.audioFile = action.payload;
      })
      .addCase(fetchAudioFile.rejected, (state, action) => {
        state.audioLoading = "failed";
        state.error = action.error.message;
      })
      // Add a case to handle clearing user data
      .addCase(clearUserData.fulfilled, (state, action) => {
        state.auth = null;
        state.data = null;
        state.projects = null;
        state.userLoading = "idle";
        state.projectsLoading = "idle";
        state.authLoading = true;
        state.audio = null;
      });
  },
});

export const {
  setUserData,
  setAuthData,
  setAuthLoading,
  setAudioPlayerVisible,
  setAudioFile,
  setAutoPlay,
} = userSlice.actions;
export default userSlice.reducer;
