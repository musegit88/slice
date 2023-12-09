import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ToasterProvider from "@/components/providers/toast-provider";
import Provider from "@/components/providers/session-provider";

const open_asans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Slice & Spice Pizzeria",
  description:
    "Where passion and pizza come together to create a truly irresistible experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={open_asans.className}>
        <main className="max-w-7xl mx-auto p-4">
          <Provider>
            <ToasterProvider />
            {children}
          </Provider>
        </main>
      </body>
    </html>
  );
}
