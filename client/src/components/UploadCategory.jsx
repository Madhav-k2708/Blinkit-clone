import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const UploadCategory = ({ close, fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.addCategory,
        data: data,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(response.data.message);
        close();
        fetchData()        
      }
    } catch (error) {
      AxiosToastError(error)
 
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const resposne = await uploadImage(file);
    const { data: imageResponse } = resposne;

    setData((prev) => {
      return {
        ...prev,
        image: imageResponse.data.url,
      };
    });

  };


  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center ">
      <div className="bg-white w-full max-w-4xl p-4 rounded ">
        <div className="flex items-center justify-between ">
          <h1 className="font-semibold">Add Category</h1>
          <button onClick={close} className="ml-auto w-fit block ">
            <IoClose size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="my-3 grid gap-2 ">
          <div className=" grid gap-1">
            <label htmlFor="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter Category Name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="bg-blue-50 p-2 border outline-none border-primary-200 rounded focus-within:border-primary-200"
            />
          </div>
          <div className="grid gap-1 ">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center ">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 rounded flex items-center justify-center">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="category"
                    className="w-full h-full object-scale-down "
                  />
                ) : (
                  <p className=" text-sm text-neutral-500">No Image</p>
                )}
              </div>
              <label htmlFor="UploadImage">
                <div
                  role="button"
                  className={`
                ${
                  !data.name
                    ? "bg-gray-400"
                    : " border-primary-200 hover:bg-primary-200"
                }
                px-4 py-2 rounded cursor-pointer border font-medium
                `}
                >
                  Upload Image
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="UploadImage"
                  className="hidden "
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className={` ${
              data.name && data.image
                ? "bg-primary-200 hover:bg-primary-100 "
                : "bg-gray-300"
            } py-2 font-semibold  `}
          >
            Add Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategory;
