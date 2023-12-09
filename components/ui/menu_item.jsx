import Image from "next/image";
import React from "react";

const items = [
  {
    name: "Veggie",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "/pizza.png",
  },
  {
    name: "Super Seafood",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "/pizza.png",
  },
  {
    name: "Double Pepporani",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "/pizza.png",
  },
  {
    name: "Hawaiian",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "/pizza.png",
  },
  {
    name: "Chicken & Pineapple",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "/pizza.png",
  },
  {
    name: "Magherita",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "/pizza.png",
  },
];

const MenuItem = () => {
  return (
    <>
      {items.map((item) => (
        <div
          key={item.name}
          className="bg-base p-4 rounded-md text-center hover:shadow-md transition"
        >
          <div className="relative block mx-auto w-40 h-40">
            <Image
              src={item.image}
              fill
              alt="veggi_pizza"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-semibold text-2xl text-primary">
            {item.name}
          </span>
          <p className="text-sm mb-4">{item.description}</p>
          <button className="bg-secondary text-white px-5 py-2 rounded-full w-full">
            Order Online $8
          </button>
        </div>
      ))}
    </>
  );
};

export default MenuItem;
