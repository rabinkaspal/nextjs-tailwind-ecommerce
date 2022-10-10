import Link from "next/link";
import React, { useEffect } from "react";
import { AiOutlineShoppingCart, AiOutlineShopping } from "react-icons/ai";
import { useCartContext } from "../context/CartContext";
import NewCartItem from "./NewCartItem";

const NewlyAddedItemDropDown = ({ mug }) => {
    const { cartItems, showAddedItem, setShowAddedItem } = useCartContext();

    useEffect(() => {
        const onScroll = e => {
            setShowAddedItem(false);
        };
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        cartItems.length > 0 && (
            <div
                className={`itemToCart fixed bg-gray-100 border-b border-gray-200 w-full left-0 top-0 z-50 pt-2 pb-14 sm:pb-16 xl:pb-10 transition-all duration-700 ${
                    showAddedItem ? "translate-y-0" : "-translate-y-[100%]"
                }  `}
            >
                <div className="px-4 md:px-8">
                    <div className="hidden md:flex flex-row border-b text-gray-500 border-gray-200 py-2 text-sm md:text-md ">
                        <div className="w-20">Just Added</div>
                        <div className="flex-1 pl-4">Product</div>
                        <div className="text-center w-28">Unit Price</div>
                        <div className="text-center w-32">Quantity</div>
                        <div className="text-right w-24">Total</div>
                        <div className="text-right flex-1 w-24 lg:w-[30%]  xl:w-[40%]">
                            SubTotal
                        </div>
                    </div>
                    <NewCartItem mug={mug} />
                    <div className="flex space-x-4 px-4 md:px-8 justify-between sm:justify-end pt-4 absolute right-0 bottom-4 w-full md:w-max items-center tansition-all duration-500 ease-in-out">
                        <button
                            className="flex items-center justify-center border-2 border-amber-500 hover:border-amber-600 px-3 md:px-6 lg:px-8 py-2  w-full sm:w-max  text-amber-500 hover:text-white text-xs sm:text-sm lg:text-md uppercase font-bold hover:bg-amber-600 transition-all duration-300 tracking-wider"
                            onClick={() => setShowAddedItem(false)}
                        >
                            <AiOutlineShopping className="inline-block mr-2  text-lg sm:text-2xl mb-1" />{" "}
                            Keep Shopping
                        </button>
                        <Link href="/cart">
                            <button className="flex  items-center justify-center bg-amber-500 border-2 border-amber-500 hover:border-amber-600 px-3 md:px-6 lg:px-8 py-2 w-full sm:w-max  text-white text-xs sm:text-sm lg:text-md uppercase font-bold hover:bg-amber-600 transition-all duration-300 tracking-wider">
                                <AiOutlineShoppingCart className="inline-block mr-2 text-lg sm:text-2xl mb-1" />
                                Go to Cart
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    );
};

export default NewlyAddedItemDropDown;
