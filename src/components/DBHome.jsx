import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getAllProductsList } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import { setAllProductsList } from "../context/actions/productListActions";

import { CChart } from "@coreui/react-chartjs";

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const productsList = useSelector((state) => state.productsList);

  const dispatch = useDispatch();

  //write the code to loop through productList
  //and populate the chart with data
  let labels = [];
  let length = [];
  if (productsList && productsList.length > 0) {
    for (let i = 0; i < productsList.length; i++) {
      labels[i] = productsList[i].category_name;
    }
  } else {
  }
  //loop trough the products and store the lenght of each category in leng varaiable
  if (products) {
    for (let j = 0; j < labels.length; j++) {
      length[j] = 0;
    }
    for (let k = 0; k < products.length; k++) {
      for (let l = 0; l < labels.length; l++) {
        if (products[k].category === labels[l]) {
          length[l] += 1;
        }
      }
    }
  } else {
  }

  //generate an array of color with the the lenght of label variable
  let colors = ["#f87979"];
  for (let m = 0; m < labels.length; m++) {
    colors[m] = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
    if (!productsList) {
      getAllProductsList().then((data) => {
        dispatch(setAllProductsList(data));
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="flex items-center justify-center">
          <div className="w-340 md:w-508">
            <CChart
              type="bar"
              data={{
                labels: labels,
                datasets: [
                  {
                    label: "تعداد در این مجموعه ",
                    backgroundColor: "#f87979",
                    data: length,
                  },
                ],
              }}
              labels="months"
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-275 md:w-460">
            <CChart
              type="doughnut"
              data={{
                labels: labels,
                datasets: [
                  {
                    backgroundColor: colors,
                    data: length,
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBHome;
