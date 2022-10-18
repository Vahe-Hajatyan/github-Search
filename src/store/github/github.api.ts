import { IRepo, IUser, serverResponse } from "./../../moduls/moduls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const githubApi = createApi({
  reducerPath: "github/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com",
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUser: build.query<IUser[], string>({
      query: (search: string) => ({
        url: `search/users`,
        params: {
          q: search,
          per_page: 10,
        },
      }),
      transformResponse: (response: serverResponse<IUser>) => response.items,
    }),
    getUserRepos: build.query<IRepo[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`,
      }),
    }),
  }),
});

export const { useSearchUserQuery, useLazyGetUserReposQuery } = githubApi;
