
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMeals from '../../../hooks/useMeals';
import MealsCard from "./MealsCard";

const MealsCategory = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [meals, loading] = useMeals();

  const categories = ["breakfast", "lunch", "snacks", "dinner", 'huda'];

  const filterMealsByCategory = (category) => {
    return meals?.filter((item) => item.category === category);
  };

  if (loading) {
    return <div className="loading loading-ring loading-lg text-info flex items-center justify-center mx-auto"></div>
  }


  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList className="flex items-center justify-center">
        {categories.map((category, index) => (
          <Tab key={index}>{category.charAt(0).toUpperCase() + category.slice(1)}</Tab>
        ))}
      </TabList>

      {categories.map((category, index) => (
        <TabPanel key={index}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {filterMealsByCategory(category).map((item, index) => (
              // <li key={index}>{item.item_name}</li>
              <MealsCard key={index} item={item} />
            ))}
          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default MealsCategory;
