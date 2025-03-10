import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((res) => {
      setProductInfo(res.data);
    });
  }, [id]);
  function deleteProduct(){
    axios.delete("/api/products?id=" + id).then(() => {
        goBack();
    });
  }
  function goBack() {
    router.push("/products");
  }
  return (
    <Layout>
      <h1 className="text-center">Do you really want to delete &nbsp;"{productInfo?.title}"" ?</h1>
      <div className="flex gap-2 justify-center">
        <button
        className="btn-red" 
        onClick={deleteProduct}>
            Yes
        </button>
        <button 
        onClick={goBack} 
        className="btn-default">
            No
        </button>
      </div>
    </Layout>
  );
}
