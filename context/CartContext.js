import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import getStripePromise from "../lib/getStripePromise";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [qty, setQty] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showAddedItem, setShowAddedItem] = useState(false);

    // const { cartItems, setCartItems } = useCartContext();
    useEffect(() => {
        const localStorageItems = JSON.parse(localStorage.getItem("cartItems"));

        console.log("localStorageItems", localStorageItems);

        if (localStorageItems !== null) {
            if (!cartItems.length) {
                console.log(
                    "ls not empty. cart empty. set ls to cart",
                    localStorageItems
                );
                setCartItems(localStorageItems);
            } else {
                console.log("cart not empty.");
            }
        }
    }, []);

    useEffect(() => {
        let totalPrice = 0;
        let totalItems = 0;
        if (cartItems.length) {
            cartItems.map(item => {
                totalPrice += item.quantity * item.price;
                totalItems += item.quantity;
            });
        }
        setTotalPrice(totalPrice);
        setTotalItems(totalItems);
    }, [cartItems]);

    const incQty = () => {
        setQty(prevQty => prevQty + 1);
    };

    const decQty = () => {
        setQty(prevQty => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    };

    const onAdd = (product, quantity) => {
        // setTotalPrice(
        //     prevTotalPrice => prevTotalPrice + product.price * quantity
        // );
        // setTotalItems(prevTotalItems => prevTotalItems + quantity);

        const isProductInCart = cartItems.find(
            item => item.slug === product.slug
        );

        if (isProductInCart) {
            const updatedCartItems = cartItems.map(item =>
                item?.slug === product.slug
                    ? {
                          ...item,
                          quantity: item.quantity + quantity,
                      }
                    : item
            );
            addItemsToCart(updatedCartItems);
            toast.success(`${qty}x ${product.title} updated to the cart.`);
        } else {
            addItemsToCart([...cartItems, { ...product, quantity }]);

            toast.success(`${qty}x ${product.title} added to the cart.`);
        }

        setTimeout(() => setQty(1), 1000);
        setTimeout(() => setShowAddedItem(true), 1000);
    };

    const onRemove = product => {
        const cartProduct = cartItems.find(item => item.slug === product.slug);

        const newCartItems = cartItems.filter(
            item => item.slug !== product.slug
        );

        addItemsToCart(newCartItems);

        setTotalPrice(
            prevTotalPrice =>
                prevTotalPrice - product.price * cartProduct.quantity
        );
        setTotalItems(prevTotalItems => prevTotalItems - cartProduct.quantity);

        toast.success(`${product.title} removed from the cart.`);
        setShowAddedItem(false);
    };

    const updateCartItemQuantity = (slug, type) => {
        const actionedProduct = cartItems.find(item => item.slug === slug);
        const index = cartItems.findIndex(item => item.slug === slug);

        const newCartItems = cartItems.filter(item => item.slug !== slug);

        if (type === "inc") {
            newCartItems.splice(index, 0, {
                ...actionedProduct,
                quantity: actionedProduct.quantity + 1,
            });
            addItemsToCart(newCartItems);
            setTotalPrice(
                prevTotalPrice => prevTotalPrice + actionedProduct.price
            );
            setTotalItems(prevTotalItems => prevTotalItems + 1);
        } else if (type === "dec") {
            if (actionedProduct.quantity > 1) {
                newCartItems.splice(index, 0, {
                    ...actionedProduct,
                    quantity: actionedProduct.quantity - 1,
                });
                addItemsToCart(newCartItems);
                setTotalPrice(
                    prevTotalPrice => prevTotalPrice - actionedProduct.price
                );
                setTotalItems(prevTotalItems => prevTotalItems - 1);
            }
        }
    };

    const handleStripeCheckout = async () => {
        const stripePromise = await getStripePromise();

        const response = await fetch("/api/stripe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cartItems),
        });

        if (response.statusCode === 500) return;

        const data = await response.json();
        toast.loading("Redirecting...");
        stripePromise.redirectToCheckout({ sessionId: data.id });
    };

    const addItemsToCart = items => {
        setCartItems(items);
        addToLocalStorage(items);
    };

    const addToLocalStorage = items => {
        localStorage.setItem("cartItems", JSON.stringify(items));
    };

    const clearCart = () => {
        localStorage.removeItem("cartItems");
    };

    const isItemInCart = item => {
        return cartItems.find(i => i.slug === item.slug);
    };

    return (
        <CartContext.Provider
            value={{
                qty,
                incQty,
                decQty,
                setQty,
                totalItems,
                totalPrice,
                cartItems,
                showAddedItem,
                setShowAddedItem,
                onAdd,
                onRemove,
                updateCartItemQuantity,
                handleStripeCheckout,
                isItemInCart,
                setCartItems,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);

export default CartProvider;
