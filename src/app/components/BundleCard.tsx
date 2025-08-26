"use client";
import React from "react";
import BundleSelector from "./BundleSelector";

interface BundleCardProps {
    name: string;
    price: string;
    size: number;
    flavours: string[];
}

const BundleCard: React.FC<BundleCardProps> = ({ name, price, size, flavours }) => {
    return (
        <div className="border-2 border-red-400 rounded-lg p-6 bg-red-50 text-center">
            <h2 className="text-2xl font-bold mb-2">{name}</h2>
            <div className="text-2xl font-bold text-red-500 mb-4">{price}</div>

            {/* 👇 Selector UI goes here */}
            <BundleSelector size={size} flavours={flavours} />
        </div>
    );
};

export default BundleCard;
