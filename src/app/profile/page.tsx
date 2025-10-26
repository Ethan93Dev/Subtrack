"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserData, ProfileData } from "@/types/types";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Image from "next/image";
import img from "@/images/profile-img.jpeg";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const route = useRouter();

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await axios.get("/api/profile/get");
        setUserData(res.data.userData);
        setProfile(res.data.profile);
      } catch (e) {
        console.error("Error fetching profile:", e);
      } finally {
        setLoading(false);
      }
    };
    getProfileData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-purple-600 text-xl">
        Loading...
      </div>
    );
  }

  if (!userData || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Profile not found
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Nav at top */}
      <Nav />

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full">
          {/* Left side - Profile info */}
          <div className="flex-1 p-10 flex flex-col justify-center space-y-3">
            <h2 className="text-4xl font-bold text-purple-600 mb-4">
              {profile.firstName} {profile.lastName}
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">First Name:</span>{" "}
                {profile.firstName}
              </p>
              <p>
                <span className="font-semibold">Last Name:</span>{" "}
                {profile.lastName}
              </p>
              <p>
                <span className="font-semibold">Username:</span>{" "}
                {userData.username}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {userData.email}
              </p>
              <p>
                <span className="font-semibold">State:</span> {profile.state}
              </p>
              <p>
                <span className="font-semibold">City:</span> {profile.city}
              </p>
              <p>
                <span className="font-semibold">County:</span> {profile.county}
              </p>
              <p>
                <span className="font-semibold">Account Created:</span>{" "}
                {new Date(userData.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Online Status:</span>{" "}
                {userData.isOnline ? "Online" : "Offline"}
              </p>
            </div>
            <button onClick={() => route.push("./editProfile")}>Edit</button>
          </div>

          <div className="flex-1 relative hidden md:block">
            <Image
              src={img}
              alt="Profile illustration"
              fill
              className="object-cover rounded-l-none rounded-r-2xl"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
