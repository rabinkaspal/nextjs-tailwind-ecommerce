import Link from "next/link";
import React from "react";

import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { useCartContext } from "../context/CartContext";

function NavBar() {
    const { totalItems } = useCartContext();
    return (
        <header className="bg-gray-50 shadow-md ">
            <div className="max-w-2xl md:max-w-3xl lg:max-w-7xl container  flex flex-row justify-between py-4 px-4 md:px-8 mx-auto">
                <div className="flex flex-row justify-center align-center ">
                    <Link href="/">
                        <button>
                            <h1 className="flex text-2xl lg:text-3xl font-bold font-sans text-amber-600">
                                cups&mugs
                            </h1>
                        </button>
                    </Link>
                </div>
                <Link href="/cart">
                    <a>
                        <div className="flex flex-row w-8 h-8 items-center text-2xl relative">
                            <AiOutlineShoppingCart />
                            <div className="absolute flex items-center justify-center text-sm bg-amber-600 text-white rounded-full overflow-hidden p-1 w-6 h-6 -top-1 -right-1">
                                {totalItems}
                            </div>
                        </div>
                    </a>
                </Link>
            </div>
        </header>
    );
}

export default NavBar;
