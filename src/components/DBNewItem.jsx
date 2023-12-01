import React, { useState, useEffect } from "react";
import { statuses } from "../utils/styles";
import { uploadIMG } from "../api/index";
import { Spinner } from "../components";
import { FaCloudUploadAlt, MdDelete } from "../assets/icons";
import { ToastContainer, toast } from "react-toastify";
import { getAllProductsList } from "../api";
import { setAllProductsList } from "../context/actions/productListActions";


import { useDispatch, useSelector } from "react-redux";
import {
  alertDanger,
  alertNULL,
  alertSuccess,
} from "../context/actions/alertActions";
import { motion } from "framer-motion";
import { buttonClcik } from "../animations";
import { addNewProduct, getAllProducts, deleteIMG } from "../api";
import { setAllProducts } from "../context/actions/productActions";

const DBNewItem = () => {
  const fetchdata = () => {
    getAllProductsList().then((data) => {
      dispatch(setAllProductsList(data));
      setCategoryList(data);
    });
  };
  const list = useSelector((state) => state.productsList);
  console.log(list);
  useEffect(() => {
    fetchdata()
    return () => {};
  }, []);

  let value = "example/data";
  let encodedValue = encodeURIComponent(value);
  console.log(encodedValue);
  let a = decodeURIComponent(encodedValue);
  console.log(a);
  const [itemName, setItemName] = useState("");
  const [categoryList, setCategoryList] = useState("")
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);
  const [imagePublicId, setImagePublicId] = useState("");

  const [image, setImage] = useState([]);

  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setisLoading(true);
    const imageFile = e.target.files;

    uploadIMG(imageFile, setProgress)
      .then((res) => {
        setisLoading(false);
        setImage(res.data.result.secure_url);
        setImagePublicId(res.data.result.public_id);
        toast.success(res.data.message);

        setImageDownloadURL(res.data.result.secure_url);
      })
      .catch((error) => {
        toast.warning(error);
      });

 
  };

  const deleteImageFromCloudinary = () => {
    setisLoading(true);
    deleteIMG(imagePublicId)
      .then((res) => {
        setisLoading(false);
        setImageDownloadURL(null);
        toast.info(res.data.message);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });


  };

  const submitNewData = () => {
    const data = {
      product_name: itemName,
      category: category,
      price: price,
      image: imageDownloadURL,
      imageid: imagePublicId,
    };
    if(itemName===''){
    toast.warning('لطفا نام رو وارد کن')

    }if (category===null) {
    toast.warning('لطفا یک مجموعه انتخاب کن')
      
    }if (price==='') {
      toast.warning('لطفا قیمت رو وارد کن')

    }else{
      console.log(data);
      addNewProduct(data).then((res) => {
        // dispatch(alertSuccess("New Item added"));
        // setTimeout(() => {
        //   dispatch(alertNULL());
        // }, 3000);
        setImageDownloadURL(null);
        setItemName("");
        setPrice("");
        setCategory(null);
        setImagePublicId('')
      });
      toast.success("در سرور ذخیره شد")
      getAllProducts().then((res) => {
        console.log(res);
        dispatch(setAllProducts(res));
      });
    }
  
  };

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
        <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
          <InputValueField
            type="text"
            placeHolder={"نام "}
            stateFunc={setItemName}
            stateValue={itemName}
          />

          <div className="w-full flex items-center justify-around gap-3 flex-wrap">
            {categoryList &&
              categoryList?.map((data) => (
                <p
                  key={data._id}
                  onClick={() => setCategory(data.category_name)}
                  className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                    data.category_name === category
                      ? "bg-red-400 text-primary"
                      : "bg-transparent"
                  }`}
                >
                  {data.category_name}
                </p>
              ))}
          </div>
          <InputValueField
            type="number"
            placeHolder={"قیمت"}
            stateFunc={setPrice}
            stateValue={price}
          />

          <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
            {isLoading ? (
              <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
                <Spinner />
                {Math.round(progress > 0) && (
                  <div className=" w-full flex flex-col items-center justify-center gap-2">
                    <div className="flex justify-between w-full">
                      <span className="text-base font-medium text-textColor">
                        Progress
                      </span>
                      <span className="text-sm font-medium text-textColor">
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
                {!imageDownloadURL ? (
                  <>
                    <label>
                      <div className=" flex flex-col items-center justify-center h-full w-full cursor-pointer">
                        <div className="flex flex-col justify-center items-center cursor-pointer">
                          <p className="font-bold text-4xl">
                            <FaCloudUploadAlt className="-rotate-0" />
                          </p>
                          <p className="text-lg text-textColor">
                            برای بارگذاری عکس کلیک کن
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        name="upload-image"
                        accept="image/*"
                        onChange={uploadImage}
                        className=" w-0 h-0"
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div className="relative w-full h-full overflow-hidden rounded-md">
                      <motion.img
                        whileHover={{ scale: 1.15 }}
                        src={imageDownloadURL}
                        className=" w-full h-full object-cover"
                      />

                      <motion.button
                        {...buttonClcik}
                        type="button"
                        className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                        onClick={() =>
                          deleteImageFromCloudinary(imageDownloadURL)
                        }
                      >
                        <MdDelete className="-rotate-0" />
                      </motion.button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <motion.button
            onClick={submitNewData}
            {...buttonClcik}
            className="w-9/12 py-2 rounded-md bg-red-400 text-primary hover:bg-red-500 cursor-pointer"
          >
          ذخیره
          </motion.button>
        </div>
      </div>
    </>
  );
};

export const InputValueField = ({
  type,
  placeHolder,
  stateValue,
  stateFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  );
};

export default DBNewItem;
