import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RiAddLine, RiCloseLine } from "react-icons/ri";
import useAxios from "../Hooks/useAxios";
import useProducts from "../Hooks/useProducts";
import Swal from "sweetalert2";
import Loading from "../Shared/Loading";


const img_hosting = "f00f7709983a82bfc1ca5153ef794386";
const img_api_key = `https://api.imgbb.com/1/upload?key=${img_hosting}`;

const EditProduct = () => {
  const { id } = useParams();
  const [products, isLoading, refetch] = useProducts();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    shortDescription: "",
    description: "",
    isAvailable: true,
    weight: "",
    images: [],
  });

  const [imageUrls, setImageUrls] = useState([null]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxios();

  // Load product data when component mounts
  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((item) => item._id === id);
      if (product) {
        setFormData({
          name: product.name || "",
          category: product.category || "",
          shortDescription: product.shortDescription || "",
          description: product.description || "",
          isAvailable: product.isAvailable || true,
          weight: product.weight || "",
          images: product.images || [],
        });
        
        // Set existing images
        setExistingImages(product.images || []);
        
        // Set image URLs for editing (first field for new uploads)
        setImageUrls([null]);
        
        setLoading(false);
      }
    }
  }, [products, id]);

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

  const removeExistingImage = (index) => {
    const newExistingImages = [...existingImages];
    newExistingImages.splice(index, 1);
    setExistingImages(newExistingImages);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log("Form submitted with data:", formData);
  console.log("Existing images:", existingImages);
  console.log("New image files:", imageUrls);
  
  try {
    // 1. Upload all new selected files to imgbb
    const uploadedUrls = await Promise.all(
      imageUrls.map(async (file, index) => {
        if (!file) {
          console.log(`Image ${index}: No file selected`);
          return null;
        }
        console.log(`Uploading image ${index}:`, file.name);
        
        const data = new FormData();
        data.append("image", file);
        const res = await fetch(img_api_key, {
          method: "POST",
          body: data,
        });
        const imgData = await res.json();
        const url = imgData?.data?.url || null;
        console.log(`Image ${index} uploaded to:`, url);
        return url;
      })
    );

    const newImageUrls = uploadedUrls.filter(Boolean);
    console.log("New uploaded URLs:", newImageUrls);
    
    // 2. Combine existing images with new uploaded images
    const allImages = [...existingImages, ...newImageUrls];
    console.log("All images after combination:", allImages);

    // 3. Final product payload
    const productData = {
      name: formData.name,
      category: formData.category,
      shortDescription: formData.shortDescription,
      description: formData.description,
      isAvailable: formData.isAvailable,
      weight: formData.weight,
      images: allImages,
    };

    console.log("Sending update payload:", productData);

    // 4. Update product in backend
    const { data } = await axiosSecure.patch(`/products/${id}`, productData);
    console.log("Backend response:", data);

    Swal.fire({
      title: "Product Updated!",
      text: "Your product was successfully updated.",
      icon: "success",
    });
    
    refetch(); // Refresh the products list
  } catch (err) {
    console.error("Error details:", err);
    console.error("Error response:", err.response);
    
    Swal.fire({
      title: "Something Went Wrong",
      text: err.response?.data?.error || "Failed to update product. Please try again.",
      icon: "error",
    });
  }
};

  if (isLoading || loading) {
    return <Loading />;
  }

  if (!formData.name) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-700">The product you're trying to edit doesn't exist.</p>
        </div>
      </div>
    );
  }

  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Edit Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 rounded-lg shadow-md"
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
                <option value="Coins">Coins</option>
                <option value="Gold">Yellow Gold Women</option>
                <option value="Gold">Men’s Yellow Gold</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="isAvailable"
                className="block mb-2 text-sm text-gray-900"
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

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Existing Images (Click to remove)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {existingImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Existing ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                    >
                      <RiCloseLine className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Images */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Add New Images
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
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;