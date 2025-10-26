import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Image from "next/image";
import img from "@/images/main-img.jpeg";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <main className="flex flex-1">
        {/* Left Section — Soft Beige */}
        <section className="flex-1 flex flex-col justify-center items-center bg-[#f5f0e6] p-10 shadow-xl z-10">
          <div className="max-w-lg text-center">
            <h1 className="text-6xl font-extrabold text-black mb-6">
              Welcome to Subtrack
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Subtrack helps you manage all your subscriptions in one place.
              Never miss a payment, track recurring costs, and gain full
              visibility into where your money goes.
            </p>
            <a
              href="/dashboard"
              className="mt-4 inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-green-800 transition-colors font-semibold shadow-md"
            >
              Add Subscriptions
            </a>
          </div>
        </section>

        {/* Right Section — Image */}
        <section className="flex-1 relative hidden md:block">
          <Image
            src={img}
            alt="Subscription management dashboard illustration"
            fill
            className="object-cover"
            priority
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
