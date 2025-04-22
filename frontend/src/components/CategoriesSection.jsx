import { Link } from "react-router-dom";
import { categories } from "../assets/assets";

function CategoriesSection() {
  return (
    <div className="py-10">
      <div className={`grid grid-cols-auto gap-8`}>
        {
          categories.map((category, index) => (
            <Link to={`/products/${category.path}`} key={index} onClick={() => { scrollTo(0, 0); }} style={{ backgroundColor: category.bgColor }}
              className={`rounded-md p-5 tetx-center `}>
              <img src={category.image} alt="category-image" className="transition-all duration-300 group-hover:scale-110" />
              <p className="text-center text-sm font-semibold text-gray-800">{category.text}</p>
            </Link>
          ))
        }
      </div>
    </div >
  );
}

export default CategoriesSection;