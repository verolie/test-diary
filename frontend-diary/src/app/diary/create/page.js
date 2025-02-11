"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../component/navbar/navbar";

const DiaryCreate = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // Simpan file aslinya, bukan blob URL
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async () => {
    const isConfirmed = window.confirm("Are you sure want to insert?");
    if (!isConfirmed) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("detail", detail);
    if (image) formData.append("image", image); // File aslinya, bukan blob

    try {
      const authData = JSON.parse(localStorage.getItem("authData") || "{}");
      const token = authData.token;

      const response = await fetch("http://127.0.0.1:8000/api/diary", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Hapus "Content-Type"
        },
        body: formData,
      });

      if (response.ok) {
        showNotification("Diary successfully created!", "success");
        setTimeout(() => router.push("/diary"), 2000);
      } else {
        showNotification("Failed to create diary!", "error");
      }
    } catch (error) {
      showNotification("An error occurred. Please try again!", "error");
      console.error("Failed to create diary", error);
    }
  };

  const handleLogout = () => {
    Logout();
  };

  return (
    <div className="w-[80%] mt-20 mx-auto p-6 bg-white shadow-md rounded-lg">
      <NavBar onLogout={handleLogout} />
      {notification.message && (
        <div
          className={`absolute top-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white text-center ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      <h1 className="text-xl font-bold mb-4">Create Diary</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Detail</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Image</label>
        <input type="file" onChange={handleImageUpload} className="w-full" />
        {image && (
          <img
            src={image}
            alt="Preview"
            className="mt-4 w-40 h-40 object-cover rounded-md"
          />
        )}
      </div>
      <div className="mt-8 flex justify-end gap-7 pr-8">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DiaryCreate;
