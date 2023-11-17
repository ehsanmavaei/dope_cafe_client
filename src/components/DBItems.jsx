import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getAllProducts, getAllProductsList } from "../api";
import { HiCurrencyRupee } from "../assets/icons";
import { DataTable } from "../components";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
import { setAllProducts } from "../context/actions/productActions";
import { setAllProductsList } from "../context/actions/productListActions";
import { useEffect, useState } from "react";
import noimage from "../assets/img/no-image.png";
import TablePagination from "material-table";
import Typography from "@material-ui/core/Typography";


const DBItems = () => {
  const [Category, setCategory] = useState([]);
  const fetchdata = () => {
    getAllProductsList().then((data) => {
      dispatch(setAllProductsList(data));
      setCategory(data);
    });
  };
  const products = useSelector((state) => state.products);
  const [data, setData] = useState(products);

  const dispatch = useDispatch();
  const fruitsList = Category;

  useEffect(() => {
    console.log("there was a chenge in the state");

    getAllProducts().then((data) => {
      dispatch(setAllProducts(data));
      setData(data);
    });
    fetchdata();
    console.log("data was updated");

    return () => {};
  }, []);

  const MyNewTitle = ({ text, variant }) => (
    <Typography
      variant={variant}
      style={{
        fontFamily:"IranYekanMedium",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }}
    >
      {text}
    </Typography>
  );
  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full font-meduim ">
      <DataTable
        columns={[
          {
            title: "تصویر",
            field: "imageURL",
            editable: "never",
            render: (rowData) => (
              <img
                src={rowData.image ? rowData.image : noimage}
                className="w-32 h-16 object-contain rounded-md"
                alt=""
              />
            ),
          },
          {
            title: "نام ",
            field: "product_name",
          },
          {
            title: "مجموعه",
            field: "category",
            editComponent: ({ value, onChange }) => (
              <select onChange={(e) => onChange(e.target.value)}>
                <option selected value={value}>
                  {value}
                </option>
                {fruitsList.map(
                  (item) =>
                    item !== value && (
                      <option key={item._id} value={item.category_name}>
                        {item.category_name}
                      </option>
                    )
                )}
              </select>
            ),
          },
          {
            title: "قیمت",
            field: "price",
            type: "numeric",
            render: (rowData) => (
              <p className="text-xl font-semibold text-textColor flex items-center justify-center ">
                <span className="text-red-400"></span>
                {parseFloat(rowData.price)}
              </p>
            ),
          },
        ]}
        data={products ? products : []}
        cellEditable={{
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise((resolve, reject) => {
              console.log("newValue: " + newValue);
              setTimeout(resolve, 1000);
            });
          },
        }}
        title=<MyNewTitle variant="h6" text="لیست محصولات" />
        actions={[
          // {
          //   icon: "edit",
          //   tooltip: "Edit Data",
          //   onClick: (event, rowData) => {
          //     alert("You want to edit " + rowData._id);
          //   },
          // },
          {
            icon: "delete",
            tooltip: "حذف محصول",
            onClick: (event, rowData) => {
              if (window.confirm("کسرا به چوخ نری!")) {
                deleteAProduct(rowData._id).then((res) => {
                  dispatch(alertSuccess("محصول حذف شد "));
                  setInterval(() => {
                    dispatch(alertNULL());
                  }, 3000);
                  getAllProducts().then((data) => {
                    dispatch(setAllProducts(data));
                  });
                });
              }
            },
          },
        ]}
      />
    </div>
  );
};

export default DBItems;
