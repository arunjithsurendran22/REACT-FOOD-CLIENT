import  { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import api from '../authorization/api'


export function Categories() {
  const [active, setActive] = useState(0);
  const [categories, setCategories] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get("/products/add-on-category/get/list");
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  // Calculate the visible categories based on the active index
  const visibleCategories = categories.slice(active, active + itemsPerPage);

  const next = () => {
    if (active + itemsPerPage >= categories.length) return;
    setActive(active + itemsPerPage);
  };

  const prev = () => {
    if (active === 0) return;
    setActive(active - itemsPerPage);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 0}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-5 w-5" />
      </Button>
      <div className="flex items-center gap-6">
        {visibleCategories.map((category) => (
          <div key={category._id} className="flex flex-col items-center">
            <img
              key={category._id}
              src={category.image}
              alt={category.title}
              className={`w-44 h-40 cursor-pointer rounded-lg ${
                active === category._id ? "border-blue-500 border-2" : ""
              }`}
              onClick={() => setActive(category._id)}
            />
            <p className="text-center p-4 font-bold italic">{category.title}</p>
          </div>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active + itemsPerPage >= categories.length}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
