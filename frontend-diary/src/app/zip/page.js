"use client";

import React, { useState, useEffect } from "react";
import Logout from "../utils/logout";
import NavBar from "../component/navbar/navbar";

const ZipCodeSearch = () => {
  const [zipCode, setZipCode] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (zipCode.length === 7 && /^\d{7}$/.test(zipCode)) {
      handleAutoFill();
    }
  }, [zipCode]);

  const handleAutoFill = async () => {
    if (zipCode.length !== 7 || !/^\d{7}$/.test(zipCode)) {
      setError("ZIP Code must be exactly 7 digits.");
      return;
    }

    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status === 200 && data.results) {
        const formattedAddresses = data.results.map((result) => ({
          zipcode: result.zipcode,
          address1: result.address1,
          address2: result.address2,
          address3: result.address3,
        }));

        setAddresses(formattedAddresses);
        setError("");
      } else {
        setAddresses([]);
        setError(data.message || "No data found for this ZIP code.");
      }
    } catch (err) {
      setAddresses([]);
      setError("Failed to fetch data. Please try again.");
    }
  };

  const handleZipChange = (e) => {
    const value = e.target.value;

    if (/^\d{0,7}$/.test(value)) {
      setZipCode(value);
      setError("");
      setAddresses([]); // Hapus data alamat saat ZIP Code berubah
    } else {
      setError("ZIP Code must be 7 digits and contain only numbers.");
    }
  };

  const handleDeleteAddress = (index) => {
    setAddresses((prevAddresses) =>
      prevAddresses.filter((_, i) => i !== index)
    );
  };
  const handleLogout = () => {
    Logout();
  };

  return (
    <div className="p-6 mt-20 w-4/5 mx-auto border rounded-lg shadow-md bg-white">
      <NavBar onLogout={handleLogout} />
      {isEditing ? (
        <div>
          <label className="block text-sm font-bold">ZIP Code</label>
          <input
            type="text"
            value={zipCode}
            onChange={handleZipChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter ZIP code"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            onClick={() => {
              setIsEditing(true);
              handleAutoFill(); // Panggil fungsi pencarian
            }}
            className="mt-3 px-4 py-2 bg-green-500 text-white rounded"
          >
            Edit
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold">ZIP Code Data</h2>
          {addresses.length > 0 ? (
            <ul className="mt-3">
              {addresses.map((addr, index) => (
                <li
                  key={index}
                  className="p-2 border-b flex justify-between items-center"
                >
                  <span>
                    {addr.zipcode} - {addr.address1}, {addr.address2},{" "}
                    {addr.address3}
                  </span>
                  <button
                    onClick={() => handleDeleteAddress(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-gray-500">No data available</p>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-3 px-4 py-2 bg-green-500 text-white rounded"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ZipCodeSearch;
