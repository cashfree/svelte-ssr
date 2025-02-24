import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCardNumberComplete: false,
  isCardHolderNameComplete: false,
  isCardExpiryComplete: false,
  isCardCvvComplete: false,
  isComplete: false,
  save: null,
  cardNumber: null,
  theme: "light",
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    cardNumberComplete: (state, action) => {
      state.isCardNumberComplete = action.payload;
    },
    cardHolderNameComplete: (state, action) => {
      state.isCardHolderNameComplete = action.payload;
    },
    cardExpiryComplete: (state, action) => {
      state.isCardExpiryComplete = action.payload;
    },
    cardCvvComplete: (state, action) => {
      state.isCardCvvComplete = action.payload;
    },
    isComplete: (state, action) => {
      state.isComplete = action.payload;
    },
    cardNumber: (state, action) => {
      state.card = action.payload;
    },
    save: (state, action) => {
      state.save = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

// Export actions
export const {
  cardNumberComplete,
  cardHolderNameComplete,
  cardExpiryComplete,
  cardCvvComplete,
  isComplete,
  save,
  cardNumber,
  setTheme,
} = cardSlice.actions;

// Export reducer
export default cardSlice.reducer;
