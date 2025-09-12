import React, { useState } from "react";
import { RiAddLine, RiCloseLine } from "react-icons/ri";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";

const img_hosting = "f00f7709983a82bfc1ca5153ef794386";
const img_api_key = `https://api.imgbb.com/1/upload?key=${img_hosting}`;

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    shortDescription: "",
    description: "",
    isAvailable: true,
    images: [],
    weights: [{ weight: "", offerweight: "" }],
    sizes: [],
  });

  const [imageUrls, setImageUrls] = useState([null]);
  const [sizeInput, setSizeInput] = useState("");

  const axiosSecure = useAxios();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUrlChange = (index, file) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = file;
    setImageUrls(newImageUrls);
  };

  const addImageField = () => {
    setImageUrls([...imageUrls, null]);
  };

  const removeImageField = (index) => {
    if (imageUrls.length > 1) {
      const newImageUrls = imageUrls.filter((_, i) => i !== index);
      setImageUrls(newImageUrls);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const frm = e.target;
    const name = frm.name.value;
    const category = frm.category.value;
    const shortDescription = frm.shortDescription.value;
    const description = frm.description.value;
    const isAvailable = frm.isAvailable.value === "true";
    const weight = frm.weight.value;

    try {
      // 1. Upload all selected files to imgbb
      const uploadedUrls = await Promise.all(
        imageUrls.map(async (file) => {
          if (!file) return null;
          const data = new FormData();
          data.append("image", file);
          const res = await fetch(img_api_key, {
            method: "POST",
            body: data,
          });
          const imgData = await res.json();
          return imgData?.data?.url || null;
        })
      );

      const cleanUrls = uploadedUrls.filter(Boolean);

      // 2. Final product payload
      const productData = {
        name,
        category,
        shortDescription,
        description,
        isAvailable,
        weight,
        images: cleanUrls, // ✅ imgbb URLs, not File objects
      };
     console.log(productData);
      // 3. Save product in backend
      const { data } = await axiosSecure.post("/products", productData);

      Swal.fire({
        title: "Product Added!",
        text: "Your product was successfully added.",
        icon: "success",
      });
      console.log("Saved Product:", data.data);
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Something Went Wrong",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Add New Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 rounded-lg shadow-md "
        >
          {/* Product Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              placeholder="Enter product name"
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D99B55] focus:border-[#D99B55]"
              required
            />
          </div>

                    {/* Weight */}
          <div className="mb-6">
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Product Weight (in grams)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Enter product weight"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D99B55] focus:border-[#D99B55]"
              required
            />
          </div>
          </div>

          {/* Category & Availability */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D99B55] focus:border-[#D99B55]"
                required
              >
                <option value="">Select a category</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Platinum">Platinum</option>
                <option value="Diamond">Diamond</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="isAvailable"
                className="block mb-2 text-sm text-gray-900 "
              >
                Product Availability
              </label>
              <select
                id="isAvailable"
                name="isAvailable"
                value={formData.isAvailable ? "true" : "false"}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "isAvailable",
                      value: e.target.value === "true",
                    },
                  })
                }
                className="block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#D99B55] focus:ring-[#D99B55] sm:text-sm"
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div className="mb-6">
            <label
              htmlFor="shortDescription"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Short Description
            </label>
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              placeholder="Enter short description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D99B55] focus:border-[#D99B55]"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Full Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Enter product description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D99B55] focus:border-[#D99B55]"
              required
            />
          </div>

          {/* Images */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Product Images
            </label>
            {imageUrls.map((url, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUrlChange(index, e.target.files[0])}
                  className="flex-1 px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-[#D99B55] focus:border-[#D99B55]"
                />
                {imageUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="ml-2 p-2 text-red-500 hover:bg-red-100 rounded-full"
                  >
                    <RiCloseLine className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="mt-2 flex items-center text-[#D99B55] hover:text-[#C68A4A]"
            >
              <RiAddLine className="w-5 h-5 mr-1" />
              Add another image
            </button>
          </div>



          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#D99B55] hover:bg-[#C68A4A] text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
