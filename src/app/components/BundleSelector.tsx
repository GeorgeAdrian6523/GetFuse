"use client";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";


interface BundleSelectorProps {
    size: number; // total allowed quantity (e.g., 30 brews in Medium)
    flavours: string[];
}

const BundleSelector: React.FC<BundleSelectorProps> = ({ size, flavours }) => {
    const { addToCart } = useCart();

    const [quantities, setQuantities] = useState<{ [key: string]: number }>(
        Object.fromEntries(flavours.map((flavour) => [flavour, 0]))
    );

    const totalSelected = Object.values(quantities).reduce((a, b) => a + b, 0);

    const handleChange = (flavour: string, value: number) => {
        setQuantities((prev) => ({
            ...prev,
            [flavour]: value,
        }));
    };

    const handleAddToCart = () => {
        if (totalSelected !== size) {
            alert(`Please select exactly ${size} items.`);
            return;
        }
        console.log("Bundle added to cart:", quantities);

    };

    return (
        <div className="space-y-4">
            <p className="text-gray-700">
                Select exactly <span className="font-bold">{size}</span> items
            </p>

            {flavours.map((flavour) => (
                <div key={flavour} className="flex items-center justify-between">
                    <label className="font-medium text-gray-800">{flavour}</label>
                    <input
                        type="number"
                        min={0}
                        max={size}
                        value={quantities[flavour]}
                        onChange={(e) => handleChange(flavour, parseInt(e.target.value) || 0)}
                        className="w-20 border rounded-md px-2 py-1 text-center"
                    />
                </div>
            ))}

            <p className={`text-sm ${totalSelected === size ? "text-green-600" : "text-red-600"}`}>
                Selected: {totalSelected}/{size}
            </p>

            <button
                onClick={handleAddToCart}
                disabled={totalSelected !== size}
                className={`w-full py-2 rounded-lg font-medium transition ${totalSelected === size
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
            >
                🛒 Tilføj til kurv
            </button>
        </div>
    );
};

export default BundleSelector;
