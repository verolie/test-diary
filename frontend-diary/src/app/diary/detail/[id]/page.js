"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import NavBar from "../../../component/navbar/navbar";

const DiaryUpdate = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id; // Ambil ID dari URL

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Fetch diary data saat halaman dimuat
  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const authData = JSON.parse(localStorage.getItem("authData") || "{}");
        const token = authData.token;

        const response = await fetch(`http://127.0.0.1:8000/api/diary/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTitle(data.data.title);
          setDate(data.data.date);
          setDetail(data.data.detail);

          // Pastikan hanya menyimpan gambar jika valid
          if (data.data.image && typeof data.data.image === "string") {
            setPreviewImage(data.data.image);
          } else {
            setPreviewImage(""); // Reset jika tidak ada gambar
          }
        }
      } catch (error) {
        console.error("Failed to fetch diary", error);
      }
    };

    if (id) fetchDiary();
  }, [id]);

  // Handle Image Upload
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Preview sebelum upload
    }
  };

  // Function untuk menampilkan notifikasi sementara
  const showNotification = (message, type) => {
    setNotification({ message, type });

    // Hilangkan notifikasi setelah 3 detik
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  // Handle Submit Update
  const handleSubmit = async () => {
    const isConfirmed = window.confirm("Are you sure want to update?");
    if (!isConfirmed) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("detail", detail);
    if (image) formData.append("image", image); // Kirim image jika diubah

    try {
      const authData = JSON.parse(localStorage.getItem("authData") || "{}");
      const token = authData.token;

      const response = await fetch(`http://127.0.0.1:8000/api/diary/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        showNotification("Diary successfully updated!", "success");
        setTimeout(() => router.push("/diary"), 2000); // Redirect setelah sukses
      } else {
        showNotification("Failed to update diary!", "error");
      }
    } catch (error) {
      showNotification("An error occurred. Please try again!", "error");
      console.error("Failed to update diary", error);
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

      <h1 className="text-xl font-bold mb-4">Update Diary</h1>

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
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="mt-4 w-40 h-40 object-cover rounded-md"
            onError={(e) => (e.target.style.display = "none")} // Hilangkan gambar jika error
          />
        )}
      </div>

      <div className="mt-8 flex justify-end gap-7 pr-8">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default DiaryUpdate;
