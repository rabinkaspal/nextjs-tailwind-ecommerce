import { useEffect } from "react";
import MugCard from "../components/MugCard";
import { useCartContext } from "../context/CartContext";
import { mugsData } from "../data/mugsData";

export default function Mugs({ checkoutSuccess }) {
    const { clearCart } = useCartContext();

    useEffect(() => {
        if (checkoutSuccess === "true") {
            clearCart();
        }
    }, [checkoutSuccess]);

    return (
        <>
            <h2 className="text-2xl lg:text-4xl  mb-8 font-bold text-gray-600">
                Handmade Ceramic Cups & Mugs
            </h2>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {mugsData.map((mug, i) => (
                    <MugCard key={i} mug={mug} />
                ))}
            </div>
        </>
    );
}

export async function getServerSideProps({ query }) {
    const checkoutSuccess = query.success || "";
    return {
        props: {
            checkoutSuccess,
        },
    };
}
