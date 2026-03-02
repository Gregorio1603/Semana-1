import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Habit = {
  _id: string;
  name: string;
  description?: string;
  targetDays: number;
  streak: number;
  lastCompletedAt?: string | null;
};

type HabitsState = {
  items: Habit[];
  loading: boolean;
  error: string | null;
};

const initialState: HabitsState = {
  items: [],
  loading: false,
  error: null,
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export const fetchHabits = createAsyncThunk<Habit[]>(
  'habits/fetchAll',
  async () => {
    const res = await fetch(`${API_BASE}/api/habits`, {
      headers: { 'x-user-id': '000000000000000000000001' },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Error ${res.status} al obtener hábitos`);
    return res.json();
  }
);

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action: PayloadAction<Habit[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error al cargar hábitos';
      });
  },
});

export default habitsSlice.reducer;