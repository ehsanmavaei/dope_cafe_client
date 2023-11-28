import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAProduct,
  getAllProducts,
  getAllProductsList,
  updateIMG,
} from "../api";

import { DataTable } from "../components";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
import { setAllProducts } from "../context/actions/productActions";
import { setAllProductsList } from "../context/actions/productListActions";
import { useEffect, useState } from "react";
import noimage from "../assets/img/no-image.png";

import Typography from "@material-ui/core/Typography";

import { Spinner } from "../components";

const DBItems = () => {
  const [isLoading, setisLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [PictureId, setPictureId] = useState("");
  const [progress, setProgress] = useState("0");
  const [oldimage, setOldimage] = useState("null");
  const [newPhoto, setNewPhoto] = useState(null);
  const [photoToUpload, setPhotoToUpload] = useState(null);
  const [activebutton, setActivebutton] = useState(false);
  const [url, setUrl] = useState(null);
  const [invoke, setInvoke] = useState(0);
  console.log("the progress values is ", progress);

  const handleInputChange = (event) => {
    setActivebutton(true);
    setNewPhoto(URL.createObjectURL(event.target.files[0]));
    setPhotoToUpload(event.target.files);
    setUrl(event.target.files);
  };
  const getRidOfTheFile = (event) => {
    setShowModal(false);

    URL.revokeObjectURL(url[0]);
    setShowModal(false);
    setNewPhoto(null);
  };
  const fetchdata = () => {
    getAllProductsList().then((data) => {
      dispatch(setAllProductsList(data));
      setCategory(data);
    });
  };

  const [Category, setCategory] = useState([]);

  const products = useSelector((state) => state.products);
  const [data, setData] = useState(products);

  const dispatch = useDispatch();
  const fruitsList = Category;

  useEffect(() => {
    console.log("useeffect was called ");
    getAllProducts().then((data) => {
      dispatch(setAllProducts(data));
      setData(data);
    });
    fetchdata();

    return () => {};
  }, [invoke]);

  const uploadImage = (e) => {
    setisLoading(true);

    const imageFile = photoToUpload;
    setActivebutton(false);
    updateIMG(imageFile, PictureId, setProgress)
      .then((res) => {
        setInvoke((prvious) => prvious + 1);

        setShowModal(false);
        getRidOfTheFile();
        setProgress();
        dispatch(alertSuccess("مبارکه"));
        setisLoading(false);

        setInterval(() => {
          dispatch(alertNULL());
        }, 8000);
      })
      .catch((error) => {
        dispatch(alertSuccess(error));
      });
  };
  const MyNewTitle = ({ text, variant }) => (
    <Typography
      variant={variant}
      style={{
        fontFamily: "IranYekanMedium",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {text}
    </Typography>
  );
  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full font-meduim ">
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[600px] my-6 mx-auto max-w-4xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">تغییر تصویر</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="w-full  h-52 bg-card backdrop-blur-md h-270 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
                  {isLoading ? (
                    <div className="w-full h-full flex flex-col   items-center justify-around px-24">
                      <Spinner />
                      {Math.round(progress > 0) && (
                        <div className=" w-full   flex flex-col items-center h-full  justify-center gap-2">
                          <div className="flex justify-between w-full">
                            <span className="text-base font-medium text-textColor ">
                              Progress
                            </span>
                            <span className="text-sm font-medium  text-textColor">
                              {Math.round(progress) > 0 && (
                                <>{`${Math.round(progress)}%`}</>
                              )}
                            </span>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                              style={{
                                width: `${Math.round(progress)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <label>
                        <div className=" flex flex-col items-center justify-center h-270  w-full cursor-pointer">
                          <div className="flex flex-col justify-center items-center cursor-pointer">
                            <p className="font-bold text-4xl">
                              <span className="-rotate-0" />
                            </p>

                            <img src={oldimage} alt="" className=" w-20" />
                            <p className="text-lg text-textColor">
                              برای بارگذاری عکس کلیک کن
                            </p>
                            <div className="w-20 h-20 ">
                              {newPhoto ? (
                                <img
                                  src={newPhoto}
                                  alt="Image_Photo"
                                  className=" object-fill h-20"
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                        <input
                          type="file"
                          name="upload-image"
                          accept="image/*"
                          className=" w-0 h-0 form-control"
                          onChange={handleInputChange}
                        />
                      </label>
                    </>
                  )}
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={getRidOfTheFile}
                  >
                    بیخیال
                  </button>
                  <button
                    className={`bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${
                      activebutton ? "" : "cursor-not-allowed opacity-50"
                    }`}
                    type="button"
                    onClick={uploadImage}
                    {...(activebutton ? "disabled" : "")}
                  >
                    ذخیره در سرور
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
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
          {
            icon: "add",
            tooltip: "Edit Data",
            onClick: (event, rowData) => {
              // alert("You want to edit " + rowData._id);
              setShowModal(true);
              setPictureId(rowData._id);
              setOldimage(rowData.image);
            },
          },
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
