import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* HERO / SLIDER SECTION (50vh) */}
      <section className="min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
        <div className="text-center max-w-3xl px-4">
          <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm mb-4">
            ✨ Modern Complaint Management Platform
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-6">
            Your Voice Matters
          </h1>

          <p className="text-gray-600 mb-8">
            A transparent, efficient, and modern platform for citizens to
            report issues and track their resolution in real-time.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700"
            >
              Register as Citizen
            </Link>
            <Link
              to="/login"
              className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50"
            >
              Officer Login
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES (3 CARDS) */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Submit with Media",
              desc: "Submit complaints with photos, videos, and exact GPS location.",
            },
            {
              title: "Real-time Tracking",
              desc: "Monitor complaint status with live updates and remarks.",
            },
            {
              title: "Quick Resolution",
              desc: "Get timely responses from relevant departments.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-purple-600 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="mb-12 opacity-90">
            Simple, fast, and transparent process
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {["Register", "Submit", "Track", "Resolve"].map((step, i) => (
              <div key={i}>
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white text-purple-600 flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <h4 className="font-semibold">{step}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS (BACKEND READY) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Total Complaints", value: "1,234" },
            { label: "Resolved", value: "856" },
            { label: "In Progress", value: "245" },
            { label: "Districts", value: "5" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-3xl font-bold text-purple-600">
                {stat.value}
              </h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="mb-8 opacity-90">
          Join thousands of citizens working together to improve communities.
        </p>
        <Link
          to="/register"
          className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold"
        >
          Get Started Now
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default Home;
