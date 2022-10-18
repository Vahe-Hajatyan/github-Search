import React from "react";
import RepoCart from "../components/RepoCart";
import {
  useLazyGetUserReposQuery,
  useSearchUserQuery,
} from "../store/github/github.api";
import { useDebounce } from "./hooks/debounce";

const HomePage = () => {
  const [search, setSearch] = React.useState("");
  const [dropdown, setDropdown] = React.useState(false);
  const debounce = useDebounce(search);
  const { isLoading, isError, data } = useSearchUserQuery(debounce, {
    skip: debounce.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  React.useEffect(() => {
    setDropdown(debounce.length > 3 && data?.length! > 0);
  }, [debounce, data]);

  const onClickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };
  return (
    <div className="flex justify-center pt-10 mx-auto h-screen">
      <div className="relative w-[560px] sm:w-[95%]">
        {isError && (
          <p className="text-center text-red-600 absolute top-[-30px] left-[200px]">
            Something went wrong
          </p>
        )}
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42] mb-2"
          placeholder="search for github username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {dropdown && (
          <ul className="list-none absolute top-[42px] left-0 overflow-y-scroll right-0 max-h-[200px] shadow-lg bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {data?.map((user) => (
              <li
                onClick={() => onClickHandler(user.login)}
                key={user.id}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className="container">
          {areReposLoading && (
            <p className="text-center">Repos are loading...</p>
          )}
          {repos?.map((repo: any) => (
            <RepoCart {...repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
