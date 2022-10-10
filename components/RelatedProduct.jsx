import React from "react";
import MugCard from "../components/MugCard";
import { useCartContext } from "../context/CartContext";
import { mugsData } from "../data/mugsData";

function RelatedProduct({ slug }) {
    const { cartItems, isItemInCart } = useCartContext();

    const nonCartItems = mugsData.filter(mug => !isItemInCart(mug));

    return (
        <div className="py-12 my-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl md:text-center mb-8 font-bold text-gray-600">
                You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {nonCartItems.slice(0, 4).map((mug, i) => (
                    <MugCard key={i} mug={mug} />
                ))}
            </div>
        </div>
    );
}

export default RelatedProduct;
