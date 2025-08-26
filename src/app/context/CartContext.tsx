// app/context/CartContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

export interface CartItem {
    id: number;
    name: string;
    quantity: number;
    meta?: Record<string, unknown>;
}

export interface CartContextType {
    cart: CartItem[];
    addToCart: (
        productId: number,
        quantity?: number,
        meta?: Record<string, unknown>
    ) => Promise<void>;
}




const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = async (productId: number, quantity: number = 1, meta: any = {}) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_WC_URL}/wp-json/wc/store/cart/add-item`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: productId,
                quantity,
                variation: [],
                ...meta, // pass bundle composition here!
            }),
            credentials: "include", // keep session cookie
        });

        const data = await res.json();
        setCart(data.items);
    };

    // ✅ Remove item
    const removeFromCart = async (key: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_WC_URL}/wp-json/wc/store/cart/items/${key}`, {
            method: "DELETE",
            credentials: "include",
        });

        const data = await res.json();
        setCart(data.items);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be inside CartProvider");
    return ctx;
};
