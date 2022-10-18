import { useAppSelector } from "./hooks/redux";
import RepoCart from "../components/RepoCart";

const FavoritesPage = () => {
  const { favorites } = useAppSelector((state) => state.github);

  if (favorites[0] === undefined)
    return (
      <div className="flex justify-center pt-10 mx-auto h-screen">
        <div className="relative w-[480px] sm:w-[79%]">
          <div className="border border-red-500 py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
            <p className="text-center text-red-600">No Items.</p>
          </div>
        </div>
      </div>
    );
  return (
    <div className="flex justify-center pt-10 mx-[10px] h-screen">
      <ul className="list-none">
        {favorites.map((f: any) => (
          <div className="container">{<RepoCart {...f} key={f.id} />}</div>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
