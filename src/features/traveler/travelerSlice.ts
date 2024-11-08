import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootTravelerState } from "../types/traveler";

export const travelerSlice = createSlice({
  name: "traveler",
  initialState: {
    cash: 100,
    days: 0,
    supplies: 0,
    fatigue: 0,
    disrepair: 0,
    reputation: 100,
    isLowOnCash: false,
  },
  reducers: {
    buy: (state, action) => {
      if (action.payload < 0) {
        toast.error("Invalid Amount");
      } else if (state.cash - action.payload < 0) {
        toast.error("Not enough cash");
      } else {
        state.supplies += 2 * action.payload;
        state.cash -= action.payload;
      }
    },
    gather: (state, action) => {
      if (action.payload < 0) {
        toast.error("Invalid Days");
      } else if (action.payload > 50) {
        toast.error("Exceeded maximum number of gathering days");
      } else if (state.fatigue >= 100) {
        toast.error("Unable to continue gathering");
      } else if (state.fatigue < 100) {
        state.days += action.payload;
        state.supplies += 3 * action.payload;
        state.fatigue += 2 * action.payload;
      }
    },
    sell: (state, action) => {
      if (action.payload < 0) {
        toast.error("Invalid Amount");
      } else if (action.payload > state.supplies) {
        toast.error("Exceeded maximum number of supplies");
      } else if (state.supplies > 0) {
        state.supplies -= action.payload;
        state.cash += 0.5 * action.payload;
      }
    },
    travel: (state, action) => {
      if (action.payload < 0) {
        toast.error("Invalid Days");
      } else if (action.payload > state.supplies - 6 * action.payload) {
        toast.error("Not enough supplies");
      } else if (state.fatigue >= 100) {
        toast.error("Unable to continue traveling");
      } else if (state.fatigue < 100) {
        state.days += action.payload;
        state.supplies -= 6 * action.payload;
        state.fatigue += action.payload;
        state.disrepair += 3 * action.payload;
      }
    },
    rest: (state, action) => {
      if (action.payload < 0) {
        toast.error("Invalid Days");
      } else if (action.payload == 0) {
        toast.error("Invalid number of days");
      } else if (state.supplies < 4 * action.payload) {
        toast.error("Not enough supplies");
      } else if (state.fatigue > 0) {
        state.days += action.payload;
        state.supplies -= 4 * action.payload;
        state.fatigue -= action.payload;
        toast.success("Reducing tiredness....");
      }
    },
    repair: (state, action) => {
      if (action.payload < 0) {
        toast.error("Invalid Days");
      } else if (action.payload == 0) {
        toast.error("Invalid number of days");
      } else if (state.supplies < 8 * action.payload) {
        toast.error("Not enough supplies");
      } else if (state.fatigue + 1 * action.payload > 100) {
        toast.error("Too tired to repair");
      } else if (state.fatigue < 100) {
        state.days += action.payload;
        state.supplies -= 8 * action.payload;
        state.fatigue += 1 * action.payload;
        state.disrepair -= 8 * action.payload;
      }
    },
    steal: (state, action) => {
      state.supplies += 4 * action.payload;
      state.reputation -= 20;
    },
  },
});


export default travelerSlice.reducer;
