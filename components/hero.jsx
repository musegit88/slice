import Image from "next/image";
import React from "react";
import ArrowTop from "./ui/icons/arrow-top";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section className="hidden md:flex md:mb-4">
        <div className="flex-1 py-20">
          <h1 className="text-5xl lg:text-7xl font-bold leading-[54px] text-primary">
            Where every
            <br /> bite is a <span className="text-secondary">slice</span>
            <br /> of perfection
          </h1>
          <p className="my-12 text-primary">
            Where passion and pizza come together to create a truly irresistible
            experience
          </p>
          <div className="flex items-center gap-x-4">
            <button className="bg-secondary text-white px-8 py-2 rounded-full">
              Order now
            </button>
            <button className="flex items-center justify-center gap-x-2 border border-primary px-4 py-2 rounded-full">
              <span className="text-secondary">Learn more</span>
              <ArrowTop />
            </button>
          </div>
        </div>
        <div className="relative flex-1">
          <Link
            title="Image By svstudioart"
            href="https://www.freepik.com/free-ai-image/tasty-top-view-sliced-pizza-italian-traditional-round-pizza_40583114.htm#query=pizza%20png&position=4&from_view=keyword&track=ais&uuid=abebeaa1-477e-4a1e-ba19-0b00557362b7"
          >
            <Image
              src={"/pizza.png"}
              alt="pizza_image"
              fill
              className="object-contain"
            />
          </Link>
        </div>
      </section>
      {/* Mobile */}
      <section className="md:hidden flex flex-col">
        <div>
          <img src="/pizza.png" alt="pizza_image" />
        </div>
        <div className="flex-1 pb-20 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold leading-[54px] text-primary">
            Where every
            <br /> bite is a <span className="text-secondary">slice</span>
            <br /> of perfection
          </h1>
          <p className="my-12 text-primary">
            Where passion and pizza come together to create a truly irresistible
            experience
          </p>
          <div className="flex items-center justify-center gap-x-4">
            <button className="bg-secondary text-white px-8 py-2 rounded-full">
              Order now
            </button>
            <button className="flex items-center justify-center gap-x-2 border border-primary px-4 py-2 rounded-full">
              <span className="text-secondary">Learn more</span>
              <ArrowTop />
            </button>
          </div>
        </div>
      </section>
      {/* Mobile End*/}
    </>
  );
};

export default Hero;
// Love at first bite:
