import React, { useState } from "react";
import { RiAddLine, RiCloseLine, RiImageAddLine } from "react-icons/ri";

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

  const [imageUrls, setImageUrls] = useState([""]);
  const [sizeInput, setSizeInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);

    // Update form data with non-empty URLs
    setFormData((prev) => ({
      ...prev,
      images: newImageUrls.filter((url) => url.trim() !== ""),
    }));
  };

  const addImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageField = (index) => {
    if (imageUrls.length > 1) {
      const newImageUrls = imageUrls.filter((_, i) => i !== index);
      setImageUrls(newImageUrls);

      setFormData((prev) => ({
        ...prev,
        images: newImageUrls.filter((url) => url.trim() !== ""),
      }));
    }
  };

  const handleWeightChange = (index, field, value) => {
    const newWeights = [...formData.weights];
    newWeights[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      weights: newWeights,
    }));
  };

  const addWeightField = () => {
    setFormData((prev) => ({
      ...prev,
      weights: [...prev.weights, { weight: "", offerweight: "" }],
    }));
  };

  const removeWeightField = (index) => {
    if (formData.weights.length > 1) {
      setFormData((prev) => ({
        ...prev,
        weights: prev.weights.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSizeChange = (e) => {
    setSizeInput(e.target.value);
  };

  const addSize = () => {
    if (sizeInput.trim() && !formData.sizes.includes(sizeInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, sizeInput.trim()],
      }));
      setSizeInput("");
    }
  };

  const removeSize = (sizeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((size) => size !== sizeToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your Supabase backend
    console.log("Product Data:", formData);
    
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
              className="w-full  text-black placeholder:text-white px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D99B55] focus:border-[#D99B55]"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-6">
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
                <option value="diamond">Diamond</option>
              </select>
            </div>

            {/* Availability */}
            <div className="">
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
              placeholder="Enter short description"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
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
              placeholder="Enter product Brief description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D99B55] focus:border-[#D99B55]"
              required
            />
          </div>

          {/* Image URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Image URLs
              </label>
              {imageUrls.map((url, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="file"
                    placeholder="https://example.com/image.jpg"
                    value={url}
                    onChange={(e) =>
                      handleImageUrlChange(index, e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D99B55] focus:border-[#D99B55]"
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
                Add another image URL
              </button>
            </div>

            {/* Sizes */}
            <div className="">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Sizes
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  placeholder="Add a size (e.g., S, M, L)"
                  value={sizeInput}
                  onChange={handleSizeChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D99B55] focus:border-[#D99B55]"
                />
                <button
                  type="button"
                  onClick={addSize}
                  className="ml-2 px-4 py-2 bg-[#D99B55] text-white rounded-md hover:bg-[#C68A4A]"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.sizes.map((size, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-[#D99B55]/10 text-[#D99B55] rounded-full"
                  >
                    {size}
                    <button
                      type="button"
                      onClick={() => removeSize(size)}
                      className="ml-1 text-[#D99B55] hover:text-[#C68A4A]"
                    >
                      <RiCloseLine className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Weights */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-2">
              Weight Options (in grams)
            </label>
            {formData.weights.map((weight, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3"
              >
                <div>
                  <label className="block text-xs text-gray-900 mb-1">
                    Original Weight
                  </label>
                  <input
                    type="number"
                    placeholder="Original weight"
                    value={weight.weight}
                    onChange={(e) =>
                      handleWeightChange(index, "weight", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D99B55] focus:border-[#D99B55]"
                    required
                  />
                </div>
                <div className="flex items-end">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-900 mb-1">
                      Offer Weight
                    </label>
                    <input
                      type="number"
                      placeholder="Offer weight"
                      value={weight.offerweight}
                      onChange={(e) =>
                        handleWeightChange(index, "offerweight", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D99B55] focus:border-[#D99B55]"
                      required
                    />
                  </div>
                  {formData.weights.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWeightField(index)}
                      className="ml-2 p-2 text-red-500 hover:bg-red-100 rounded-full"
                    >
                      <RiCloseLine className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addWeightField}
              className="mt-2 flex items-center text-[#D99B55] hover:text-[#C68A4A]"
            >
              <RiAddLine className="w-5 h-5 mr-1" />
              Add another weight option
            </button>
          </div>

          {/* Submit Button */}
          <div className="">
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
