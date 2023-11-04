import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const fetchNote = createAsyncThunk('note/fetchBNote', async () => {
  const response = await fetch('https://pianoroll.ai/random_notes')
  const data  = await response.json()
  return data
})

const noteSlice = createSlice({
  name: 'note',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNote.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchNote.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchNote.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export { fetchNote }
export const noteReducer = noteSlice.reducer
