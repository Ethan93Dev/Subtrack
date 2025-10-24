import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Dashboard from "./dashboard/page";
import { FaClock, FaDollarSign, FaTasks } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <main className="flex-1 p-8 max-w-5xl mx-auto">
        {/* Hero / Intro Section */}
        <section className="text-center my-12">
          <h1 className="text-5xl font-bold text-purple-600 mb-4">
            Welcome to Subtrack
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Subtrack helps you manage all your subscriptions in one place. Never
            miss a payment, track recurring costs, and get full visibility of
            where your money goes.
          </p>
          <a
            href="/dashboard"
            className="mt-6 inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Add subscriptions
          </a>
        </section>

        {/* Why I Built This */}
        <section className="my-16 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-purple-500">
            Why I Built Subtrack
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Managing multiple subscriptions can be overwhelming. I created
            Subtrack to help people stay organized, save money, and take control
            of their finances. Whether it’s streaming services, software tools,
            or memberships, Subtrack gives you an easy way to monitor all of
            them in one dashboard.
          </p>
        </section>

        {/* Features */}
        <section className="my-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow">
            <FaTasks className="text-purple-600 mx-auto mb-4 text-4xl" />
            <h3 className="text-xl font-semibold mb-2">Organize</h3>
            <p className="text-gray-700">
              Keep all your subscriptions in one place. No more lost receipts or
              forgotten accounts.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow">
            <FaDollarSign className="text-purple-600 mx-auto mb-4 text-4xl" />
            <h3 className="text-xl font-semibold mb-2">Track Costs</h3>
            <p className="text-gray-700">
              See exactly how much you spend monthly and yearly on your
              subscriptions.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow">
            <FaClock className="text-purple-600 mx-auto mb-4 text-4xl" />
            <h3 className="text-xl font-semibold mb-2">Never Miss a Payment</h3>
            <p className="text-gray-700">
              Get reminders for upcoming payments and avoid late fees.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="my-16 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-purple-500">
            Ready to take control of your subscriptions?
          </h2>
          <a
            href="/profile"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Create your profile
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
