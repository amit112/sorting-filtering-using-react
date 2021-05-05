import React, { useEffect, useState } from "react";
import { Furniture } from "./furniture";
import api from "../../services/api-service";
import "./furnitures.css";

export const Furnitures = () => {
  const sortOptions = [
    {
      name: "Rating",
      key: "rating",
    },
    {
      name: "Price",
      key: "price",
    },
  ];
  const [furnitures, setFurnitures] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    getFurnitures();
  }, []);

  const getFurnitures = () => {
    api
      .get("9f7a13ec-2c96-4601-825c-45d3e841bd5b")
      .then((response) => {
        console.log(response);
        setFurnitures(response.data.data);
        setFilterData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsDataLoaded(true));
  };

  const handleSearch = (searchValue, _furnitures) => {
    const furnitures = [..._furnitures].filter((item) =>
      item?.productName
        ?.toString()
        ?.toLowerCase()
        ?.includes(searchValue?.toLowerCase())
    );
    setFilterData(furnitures);
  };

  const handleSorting = (sortKeyName, _furnitures) => {
    if (!sortKeyName) {
      return;
    }
    const furnitures = [..._furnitures].sort(
      (a, b) => a[sortKeyName] - b[sortKeyName]
    );
    setFilterData(furnitures);
  };

  return (
    <>
      {isDataLoaded && (
        <>
          <div className="furniture-filter">
            <input
              type="text"
              className="furniture-search"
              onChange={(e) => handleSearch(e.currentTarget.value, furnitures)}
              placeholder="Search"
            ></input>
            <div className="furniture-filter-sort">
              <label>Sort By</label>
              <select
                onChange={(e) =>
                  handleSorting(e.currentTarget.value, furnitures)
                }
              >
                <option value={""}>-Select-</option>
                {sortOptions.map((item) => {
                  return <option value={item?.key}> {item?.name}</option>;
                })}
              </select>
            </div>
          </div>
          <div>
            {filterData?.length ? (
              <div className="main-container">
                {filterData.map((item, index) => (
                  <Furniture key={`furniture${index}`} item={item} />
                ))}
              </div>
            ) : (
              <div className="main-container">
                <span>No data found!</span>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
