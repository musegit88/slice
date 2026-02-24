import Hero from "@/components/hero";
import HomeMenu from "@/components/home-menu";
import { Suspense } from "react";
import { MenuSkeleton } from "../(routes)/menu/page";

export default async function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<MenuSkeleton />}>
        <HomeMenu />
      </Suspense>
    </>
  );
}
