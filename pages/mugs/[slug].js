import Image from "next/image";
import React, { useState } from "react";
import { mugsData } from "../../data/mugsData";
import { AiOutlineShopping } from "react-icons/ai";
import RelatedProduct from "../../components/RelatedProduct";
import Link from "next/link";
import { useCartContext } from "../../context/CartContext";
import NewlyAddedItemDropDown from "../../components/NewlyAddedItemDropDown";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

const MugDetails = ({ mug, slug }) => {
    const [isLoading, setLoading] = useState(true);
    const { qty, incQty, decQty, cartItems, onAdd, onRemove } =
        useCartContext();

    const isItemInCart = cartItems.find(item => item.slug === slug);

    const cartProduct = cartItems.find(item => item.slug === slug);

    return (
        <>
            {cartProduct && <NewlyAddedItemDropDown mug={cartProduct} />}
            <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 gap-x-4 lg:gap-x-16">
                <a href="#" className="group">
                    <div className="w-full h-0 aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden ">
                        <Image
                            alt=""
                            src={mug.image}
                            layout="fill"
                            objectFit="cover"
                            priority="true"
                            className={cn(
                                "group-hover:opacity-75 duration-700 ease-in-out",
                                isLoading
                                    ? "grayscale blur-2xl scale-110"
                                    : "grayscale-0 blur-0 scale-100"
                            )}
                            onLoadingComplete={() => setLoading(false)}
                        />
                    </div>
                </a>

                <div className="flex flex-col space-y-3 sm:space-y-5 lg:space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-700">
                        {mug.title}
                    </h3>
                    <p className=" text-2xl font-medium text-gray-900">
                        ${mug.price}
                    </p>
                    <div className="flex flex-row space-x-3 items-center justify-between sm:justify-start sm:gap-4 lg:gap-6">
                        <div className="flex flex-row border border-gray-400 h-max items-center text-center">
                            <button
                                className="border-r border-gray-400 px-4 py-2 text-lg w-auto"
                                onClick={decQty}
                            >
                                -
                            </button>
                            <button
                                type="number"
                                className="border-r border-gray-400 px-2 py-2 text-center text-lg w-12 focus:outline-none rounded-none"
                            >
                                {qty}
                            </button>

                            <button
                                className="px-4 py-2 text-lg w-auto"
                                onClick={incQty}
                            >
                                +
                            </button>
                        </div>
                        <button
                            className="flex items-center bg-amber-500 px-3 md:px-6 lg:px-8 py-3 w-max  text-white text-sm lg:text-md uppercase font-bold hover:bg-amber-600 transition-all duration-300 tracking-wider"
                            onClick={() => onAdd(mug, qty)}
                        >
                            <AiOutlineShopping className="inline-block mr-2 text-2xl mb-1" />
                            Add to Cart
                        </button>
                    </div>

                    {isItemInCart && (
                        <div className="flex space-x-4 items-center py-2">
                            <Link href="/cart">
                                <a>
                                    <p
                                        className="flex items-center justify-center w-max text-sm  text-orange-700"
                                        title={`${isItemInCart.quantity} items in cart`}
                                    >
                                        <AiOutlineShopping className="inline-block text-xl mr-1 mb-1" />
                                        {isItemInCart.quantity}
                                    </p>
                                </a>
                            </Link>
                            <button
                                className="block w-max text-sm  text-orange-700 underline"
                                onClick={() => onRemove(mug)}
                            >
                                Remove from cart x
                            </button>
                        </div>
                    )}

                    <div className="">
                        <h3 className="mt-4 mb-2 text-gray-600 text-xl font-bold">
                            About this product:
                        </h3>
                        <div className="desc text-md font-thin text-gray-600 leading-7 tracking-normal">
                            {mug.desc.split("\n").map((str, i) => (
                                <p className="mb-4" key={i}>
                                    {str}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <RelatedProduct slug={slug} />
        </>
    );
};

export const getStaticPaths = () => {
    const paths = mugsData.map(mug => ({
        params: { slug: mug.slug },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = ({ params }) => {
    const slug = params.slug;

    const mug = mugsData.find(mug => mug.slug === slug);

    return {
        props: {
            mug,
            slug,
        },
    };
};

export default MugDetails;
