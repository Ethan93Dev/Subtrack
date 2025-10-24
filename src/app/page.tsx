import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <main className="flex-1 p-8 max-w-4xl mx-auto">
        {/* Hero / Intro Section */}
        <section className="text-center my-12">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">
            Welcome to Subtrack
          </h1>
          <p className="text-gray-700 text-lg">
            Subtrack helps you manage all your subscriptions in one place. Keep
            track of recurring payments, never miss a due date, and get a clear
            picture of where your money is going.
          </p>
        </section>

        {/* Why I Made This */}
        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-4 text-purple-500">
            Why I Built Subtrack
          </h2>
          <p className="text-gray-700 mb-2">
            Managing multiple subscriptions can get overwhelming. I created
            Subtrack to help people stay organized, save money, and take control
            of their finances.
          </p>
          <p className="text-gray-700">
            Whether it’s streaming services, software tools, or memberships,
            Subtrack gives you an easy way to monitor all of them in one
            dashboard.
          </p>
        </section>

        {/* Call to Action */}
        <section className="my-12 text-center">
          <p className="text-gray-700 mb-4">
            Get started by creating your profile and adding your subscriptions
            today!
          </p>
          <a
            href="/dashboard"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Add subscriptions
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
