import NavCategories from "./nav-main/nav-categories";
import NavZodiacs from "./nav-main/nav-zodiacs";

export default function NavMain({ 
  categories, 
  zodiacs
}) {
  return (
  <div className=" flex flex-col gap-4 md:flex-row ">
   <NavCategories 
   data={categories}
   />
   <NavZodiacs 
   data={zodiacs}
   />
   </div>
  )
}