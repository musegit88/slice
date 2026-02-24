import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section className="hidden md:flex md:mb-4">
        <div className="flex-1 py-20 w-full">
          <h1 className="text-6xl lg:text-8xl font-bold leading-[54px] text-primary w-full">
            Where every bite is a <span className="text-secondary">slice </span>
            of perfection
          </h1>
          <p className="my-8 text-primary text-sm">
            Where passion and pizza come together to create a truly irresistible
            experience
          </p>
          <div className="flex items-center gap-x-4">
            <Link
              href={"/menu"}
              className="bg-secondary text-white px-8 py-2 rounded-full"
            >
              Order now
            </Link>
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
              priority
              className="object-contain"
            />
          </Link>
        </div>
      </section>
      {/* Mobile */}
      <section className="md:hidden flex flex-col">
        <Image
          src="/pizza.png"
          alt="pizza_image"
          width={200}
          height={200}
          priority
          className="w-full object-contain"
        />
        <div className=" mb-10 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold leading-[54px] text-primary">
            Where every
            <br /> bite is a <span className="text-secondary">slice</span>
            <br /> of perfection
          </h1>
          <p className="my-4 text-primary text-sm">
            Where passion and pizza come together to create a truly irresistible
            experience
          </p>
          <div className="flex items-center justify-center gap-x-4">
            <Link
              href={"/menu"}
              className="bg-secondary text-white px-8 py-2 rounded-full"
            >
              Order now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
