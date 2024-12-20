import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { Providers } from "./Providers";
import Footer from "@/components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RTNews",
  description: "Do not only read but save for latter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Providers>
            <section className="w-screen h-screen overflow-y-scroll bg-[#F3F2EE]">
              <div className=" px-2 lg:max-w-[1400px] mx-auto flex flex-col min-h-[100vh]">
                {/* title */}
                <header className="w-full py-5 grid place-content-center border-by border-slate-300y ">
                  <h1 className="font-medium text-2xl md:text-[35px] text-slate-800">
                    RayFm News
                  </h1>
                </header>
                {/* main-content */}
                <main className="mt-5y flex-1 overflow-y-scroll">{children}</main>
                <Footer />
              </div>
            </section>
          </Providers>
        </ReactQueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
