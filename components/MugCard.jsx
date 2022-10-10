import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartContext } from "../context/CartContext";
import { fb_base_url, fb_img_token } from "./Layout";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}
const MugCard = ({ mug }) => {
    const [isLoading, setLoading] = useState(true);
    const { cartItems } = useCartContext();

    const isItemInCart = cartItems.find(item => item.slug === mug.slug);

    return (
        <Link href={`/mugs/${mug.slug}`} className="group">
            <a>
                <div className="w-full h-0 aspect-w-1 aspect-h-1  bg-gray-200 rounded-lg overflow-hidden ">
                    <Image
                        alt=""
                        src={mug.image}
                        layout="fill"
                        objectFit="cover"
                        className={cn(
                            "group-hover:opacity-75 duration-700 ease-in-out",
                            isLoading
                                ? "grayscale blur-2xl scale-110"
                                : "grayscale-0 blur-0 scale-100"
                        )}
                        onLoadingComplete={() => setLoading(false)}
                    />
                </div>
                <h3 className="text-md  mt-4 text-gray-600 group-hover:text-amber-400  transition-all duration-500">
                    {mug.title}
                </h3>
                <div className="flex justify-start items-center space-x-4">
                    <p className="mt-2 text-md font-medium text-gray-700 group-hover:text-amber-500  transition-all duration-500">
                        ${mug.price}
                    </p>

                    {isItemInCart && (
                        <Link href={`/cart`}>
                            <button>
                                <p className="mt-2 text-xs  text-orange-600 hover:text-amber-500 hover:underline  transition-all duration-500">
                                    {isItemInCart.quantity} in cart
                                </p>
                            </button>
                        </Link>
                    )}
                </div>
            </a>
        </Link>
    );
};

export default MugCard;
