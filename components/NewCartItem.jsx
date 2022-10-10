import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCartContext } from "../context/CartContext";

function NewCartItem({ mug }) {
    const { updateCartItemQuantity, onRemove, totalPrice } = useCartContext();

    return (
        <>
            <div className="flex flex-row py-6 sm:py-4 space-x-2 md:space-x-4 text-gray-500">
                <Link href={`/mugs/${mug.slug}`} className="cart-image">
                    <a className="flex-wrap">
                        <div className="flex-0">
                            <div className="aspect-w-1 aspect-h-1 w-16 sm:w-16 rounded-sm md:rounded-md overflow-hidden border border-gray-200">
                                <Image
                                    src={mug.image}
                                    alt=""
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        </div>
                    </a>
                </Link>
                <div className="cart-not-image flex flex-col  pl-4 sm:flex-row justify-between flex-1 text-sm md:text-md space-y-3 sm:space-y-0">
                    <div className="flex-1">
                        <Link href={`/mugs/${mug.slug}`}>
                            <a className="w-max text-sm hover:underline">
                                <p>{mug.title}</p>
                            </a>
                        </Link>
                    </div>
                    <div className="text-left sm:text-center w-full sm:w-24 md:w-28">
                        <em className="sm:hidden inline-block mr-2">Price: </em>
                        ${mug.price}
                    </div>
                    <div className="text-center w-full sm:w-28 md:w-32 flex flex-row sm:flex-col items-center justify-between sm:justify-start gap-4 sm:gap-2">
                        <div className="flex flex-row border border-gray-300 h-max items-center text-center">
                            <button
                                className="border-r border-gray-300 px-3 py-1 text-lg w-auto"
                                onClick={() =>
                                    updateCartItemQuantity(mug.slug, "dec")
                                }
                            >
                                -
                            </button>
                            <button
                                type="number"
                                className="border-r border-gray-300 px-1 py-1 text-center text-md w-10 h-9 focus:outline-none rounded-none"
                            >
                                {mug.quantity}
                            </button>

                            <button
                                className="px-3 py-1 text-lg w-auto"
                                onClick={() =>
                                    updateCartItemQuantity(mug.slug, "inc")
                                }
                            >
                                +
                            </button>
                        </div>
                        <button
                            className="block w-max text-sm  text-orange-700 hover:underline"
                            onClick={() => onRemove(mug)}
                        >
                            Remove x
                        </button>
                    </div>
                    <div className="text-right w-full border-t border-gray-300 sm:border-0 sm:w-20 md:w-24">
                        <strong className="sm:hidden mt-2 inline-block mr-4">
                            Total:
                        </strong>
                        ${mug.price * mug.quantity}
                    </div>
                    <div className="text-right w-full md:w-24 lg:w-[30%] xl:w-[40%] flex-1">
                        <strong className="sm:hidden mt-2 inline-block mr-4">
                            SubTotal:
                        </strong>
                        ${totalPrice}
                        <small className="block">excl. shipping</small>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewCartItem;
