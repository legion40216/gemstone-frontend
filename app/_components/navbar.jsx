import Link from "next/link";

import getCategories from "@/app/actions/get-categories";
import getZodiacs from "@/app/actions/get-zodiacs";

import NavMain from "./navbar/nav-main";
import NavActions from "./navbar/nav-actions";

export default async function Navbar() {
  const categories = await getCategories()
  const zodiacs    = await getZodiacs()
  console.log(categories)
  
  return (
    <nav className="container flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="flex gap-4 items-center">
          <Link href="/" className="flex font-bold text-2xl">
            case<span className="text-green-600">cobra</span>
          </Link>
        </div>
        <div className="hidden md:block"> 
          <NavMain
          categories={categories}
          zodiacs={zodiacs}
          />
        </div>
      </div>

      <NavActions 
      categories={categories}
      zodiacs={zodiacs}
      />
    </nav>
  );
}
