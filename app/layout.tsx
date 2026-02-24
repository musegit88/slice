import "./globals.css";
import ToasterProvider from "@/components/providers/toast-provider";
import CartProvider from "@/components/providers/cart-providers";
import localFont from "next/font/local";
import ProvideSession from "@/components/providers/session-provider";

const poppins = localFont({
  src: [
    {
      path: "./fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata = {
  title: "Slice & Spice Pizzeria",
  description:
    "Where passion and pizza come together to create a truly irresistible experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="max-w-7xl mx-auto p-4">
          <ProvideSession>
            <CartProvider>
              <ToasterProvider />
              {children}
            </CartProvider>
          </ProvideSession>
        </main>
      </body>
    </html>
  );
}
