import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goTOProducts, setGoToProducts] = useState(false);
  const router = useRouter();
  async function saveProduct(e) {
    e.preventDefault();
    const data = { title, description, price };
    if(_id){
      // update
      await axios.put('/api/products', {...data, _id});
    }
    else{
      // create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goTOProducts) {
    router.push("/products");
  }
  // Images
  function uploadImages(e){

  }
  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Product Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <lable>
        Photos
      </lable>
      <div className="mb-2">
        <label className="w-24 h-24 text-center flex flex-col items-center justify-center text-sm bg-gray-200 rounded-lg text-gray-500 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          <div>Upload</div>
          <input type="file" onChange={uploadImages} className="hidden"/>
        </label>
        {!images?.length && (
          <div>No Images has been Uploaded</div>
        )}
      </div>
      <label>Description</label>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button className="btn-primary">Save</button>
    </form>
  );
}
