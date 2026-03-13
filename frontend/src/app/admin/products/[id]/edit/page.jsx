"use client";
import ProductForm from "@/components/admin/ProductForm";
import { useParams } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();
  return <ProductForm id={id} />;
}
