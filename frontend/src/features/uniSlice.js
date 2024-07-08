import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUniversities = createAsyncThunk(
  'universities/fetchUniversities',
  async () => {
    const response = await axios.get('http://universities.hipolabs.com/search?country=Australia');
    return response.data;
  }
);

const uniSlice = createSlice({
  name: 'universities',
  initialState: [],
  reducers: {
    deleteLastUniversity(state) {
      return state.slice(0, -1);
    },
    addFirstUniversityToEnd(state) {
      if (state.length > 0) {
        return [...state, state[0]];
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUniversities.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const { deleteLastUniversity, addFirstUniversityToEnd } = uniSlice.actions;

export default uniSlice.reducer;