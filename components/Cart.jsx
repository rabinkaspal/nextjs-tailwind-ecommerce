import React from "react";
import CartProduct from "./CartProduct";
import { AiOutlineShopping, AiOutlineShoppingCart } from "react-icons/ai";
import { useCartContext } from "../context/CartContext";
import Link from "next/link";

function Cart() {
    const { cartItems, totalPrice, handleStripeCheckout } = useCartContext();

    return (
        <div className="cart">
            {cartItems.length == 0 && (
                <div className="empty-cart py-4 my-8">
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="mt-4 mb-2 text-gray-600 text-xl font-normal">
                            Your cart is currently empty.
                        </h3>
                        <Link href="/">
                            <button className="flex items-center justify-center mt-6 bg-amber-500 py-2 w-full md:w-max md:px-8 md:py-2 text-white text-sm lg:text-md uppercase font-bold hover:bg-amber-600 transition-all duration-300 tracking-wider">
                                <AiOutlineShopping className="inline-block mr-2 text-2xl mb-1" />
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="cart-not-empty">
                    <div className="hidden md:flex flex-row border-b text-gray-500 border-gray-200 py-2 text-sm md:text-md ">
                        <div className="flex-1">Product</div>
                        <div className="text-center w-28">Unit Price</div>
                        <div className="text-center w-32"> Quantity</div>
                        <div className="text-right w-24">Total</div>
                    </div>
                    <div className="cart-product">
                        {cartItems &&
                            cartItems.map(item => (
                                <CartProduct key={item.slug} mug={item} />
                            ))}
                    </div>

                    <div className="text-right py-4 text-gray-500">
                        <p className="w-auto inline-block text-sm mr-3">
                            Subtotal:
                        </p>
                        <p className="w-auto inline-block font-bold text-lg mr-3 text-gray-700">
                            ${totalPrice}
                        </p>
                        <p className="text-xs">
                            GST included. Shipping calculated at checkout.
                        </p>
                    </div>

                    <div className="flex md:justify-end">
                        <button
                            className="flex items-center justify-center mt-6 bg-amber-500 py-2 w-full md:w-max md:px-8 md:py-2 text-white text-sm lg:text-md uppercase font-bold hover:bg-amber-600 transition-all duration-300 tracking-wider"
                            onClick={handleStripeCheckout}
                        >
                            <AiOutlineShoppingCart className="inline-block mr-2 text-2xl mb-1" />
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
