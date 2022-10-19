import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LS_FAV_KEY = "rfk";
const LS_URL_KEY = "ruk";

interface GithubState {
  favorites: [{}];
  url: String[];
}

const initialState: GithubState = {
  favorites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[{}]"),
  url: JSON.parse(localStorage.getItem(LS_URL_KEY) ?? "[]"),
};

export const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    addFavorites(state, action: PayloadAction<any>) {
      state.favorites.push(action.payload);
      state.url.push(action.payload.html_url);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
      localStorage.setItem(LS_URL_KEY, JSON.stringify(state.url));
    },
    removeFavorites(state: any, action: PayloadAction<any>) {
      state.url = state.url.filter((f: any) => f !== action.payload);
      state.favorites = state.favorites.filter(
        (f: any) => f.html_url !== action.payload
      );
      localStorage.setItem(LS_URL_KEY, JSON.stringify(state.url));
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
    },
  },
});

export const githubReducer = githubSlice.reducer;
export const githubAction = githubSlice.actions;
