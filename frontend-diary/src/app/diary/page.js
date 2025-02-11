"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DataTable from "../component/dataTable/dataTable";
import SearchBar from "../component/searchBar/searchBar";
import ButtonSubmit from "../component/buttonSubmit/buttonSubmit";
import NavBar from "../component/navbar/navbar";
import Logout from "../utils/logout";

const fetchDiaryData = async () => {
  try {
    const authData = JSON.parse(localStorage.getItem("authData") || "{}");
    const token = authData.token;
    const response = await fetch("http://127.0.0.1:8000/api/diary", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching diary data:", error);
    return [];
  }
};

function Diary() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const diaryData = await fetchDiaryData();
    setData(diaryData.data);
  };

  const handleSearch = () => {
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setData(filteredData);
  };

  const handleEdit = (item) => {
    router.push(`/diary/detail/${item.id}`);
  };

  const handleDelete = async (item) => {
    const isConfirmed = window.confirm("Are you sure want to delete?");
    if (!isConfirmed) return;

    try {
      const authData = JSON.parse(localStorage.getItem("authData") || "{}");
      const token = authData.token; // Ambil token dari localStorage
      const response = await fetch(
        `http://127.0.0.1:8000/api/diary/${item.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setNotification({
          message: "Diary successfully deleted!",
          type: "success",
        });
        setTimeout(() => {
          setNotification({ message: "", type: "" });
          fetchData();
        }, 2000);
      } else {
        throw new Error("Failed to delete diary");
      }
    } catch (error) {
      setNotification({
        message: "An error occurred. Please try again!",
        type: "error",
      });
      console.error("Error deleting diary:", error);
    }
  };

  const handleCreate = () => {
    router.push("/diary/create");
  };
  const handleLogout = () => {
    Logout();
  };

  return (
    <div className="p-4 mt-14">
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

      <h1 className="text-xl font-bold mb-4">Diary List</h1>
      <div className="flex mb-4 gap-2">
        <SearchBar
          stateInput={search}
          handleOnChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          handleIcon={handleSearch}
        />
        <ButtonSubmit color="primary" onClick={handleCreate}>
          Create
        </ButtonSubmit>
      </div>
      <DataTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default Diary;
