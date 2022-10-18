import React, { useState } from "react";
import { useAction } from "../pages/hooks/actions";
import { useAppSelector } from "../pages/hooks/redux";

const RepoCart = (props: any) => {
  const { addFavorites, removeFavorites } = useAction();

  const { url } = useAppSelector((state) => state.github);
  const [isFav, setIsFav] = useState(url.includes(props.html_url));

  const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavorites(props);
    setIsFav(true);
  };
  const removeToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavorites(props.html_url);
    setIsFav(false);
  };

  return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={props.html_url} target="_blank" rel="noreferrer">
        <img
          src={props.owner.avatar_url}
          alt="avatar"
          className="w-[50px] rounded-full h-auto inline-block mr-5 mb-2"
        />
        <h2 className="text-lg font-bold inline-block">{props.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{props.forks}</span>
          Watchers: <span className="font-bold mr-2">{props.watchers}</span>
          Language: <span className="font-bold">{props.language}</span>
        </p>
        <p className="text-sm font-thin mb-2">{props.description}</p>

        {!isFav ? (
          <button
            className="py-2 px-4 bg-yellow-400 mr-2 rounded hover:shadow-sm transition-all"
            onClick={addToFavorite}
          >
            Add
          </button>
        ) : (
          <button
            className="py-2 px-4 bg-red-400 rounded hover:shadow-sm transition-all"
            onClick={removeToFavorite}
          >
            Remove
          </button>
        )}
      </a>
    </div>
  );
};

export default RepoCart;
