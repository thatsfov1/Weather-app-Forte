import { CloudSun, Heart } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="h-[500px] w-64 sm:bg-[#2E3440] p-4 fixed flex flex-col items-start justify-between ml-3 mt-4 rounded-2xl text-white shadow-lg">
      <div className="space-y-8">
        <Link
          href="/"
          className="flex items-center space-x-2 hover:bg-[#434c5e] p-2 rounded-lg transition-all duration-300"
        >
          <CloudSun size={20} />
          <span>Weather</span>
        </Link>
        <Link
          href="/favourites"
          className="flex items-center space-x-2 hover:bg-[#434c5e] p-2 rounded-lg transition-all duration-300"
        >
          <Heart size={20} />
          <span>Favourites</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
