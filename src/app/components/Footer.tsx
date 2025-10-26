import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-4 mt-auto">
      <div className="max-w-6xl mx-auto text-center">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
}
