import React from "react";
import Cart from "../../components/Cart";

function CartPage() {
    return (
        <>
            <h2 className="text-2xl lg:text-4xl  mb-3 font-bold text-gray-600">
                Your Cart
            </h2>
            <Cart />
        </>
    );
}

export default CartPage;
