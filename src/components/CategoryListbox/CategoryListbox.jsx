import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const CategoryListbox = ({ options, name, handleCategory }) => {

  const capitalizeFirstLetter = (string) => {
    if (typeof string === 'string') {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string;
  };
  
  return (
    <div className="mt-5 mb-10 w-48 text-right relative">
      <Menu>
        <MenuButton className="inline-flex items-center w-full gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          {name}
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="absolute right-0 w-52 mt-2 origin-top-right rounded-xl border border-white/5 bg-black/80 p-1 text-sm text-white shadow-lg focus:outline-none z-50"
        >
          {options.map((option, index) => 
            <MenuItem key={index} onClick={() => handleCategory(option)}>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10" 
              >
              {capitalizeFirstLetter(option)}
              </button>
            </MenuItem>
          )}
          {/* <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Lunch
            </button>
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Snacks
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Dinner
            </button>
          </MenuItem> */}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default CategoryListbox;
