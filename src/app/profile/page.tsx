import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/profile", {
        firstname,
        lastname,
        avatarUrl,
      });
      setFirstName("");
      setLastName("");
      setAvatarUrl("");
      router.push("/addSubscription");
    } catch (e) {
      console.error("Error", e);
    }
  };
  return (
    <div>
      <h1>Create profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">Firstname</label>
        <input
          type="text"
          placeholder="Enter FirstName"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastname">LastName</label>
        <input
          type="text"
          placeholder="Enter LastName"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="  avatarUrl"> AvatarUrl</label>
        <input
          type="text"
          placeholder="Enter   avatarUrl"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
      </form>
    </div>
  );
}
