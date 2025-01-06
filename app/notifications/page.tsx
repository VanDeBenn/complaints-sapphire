"use client";
// pages/notifications.js
import React from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FaRegUserCircle } from "react-icons/fa";

const notifications = [
  {
    id: 1,
    user: "0x99...sV",
    message: "Support your complaint",
  },
  {
    id: 2,
    user: "0x11...op",
    message: "commented on your complaint",
  },
  {
    id: 3,
    user: "0x4g...US",
    message: "Give your 1 TEST",
  },
];

export default function Page() {
  return (
    <>
      <Header />
      <div className="min-h-screen text-gray-800">
        <div className="max-w-3xl mx-auto p-4 text-white">
          {/* Header */}
          <h1 className="text-xl font-bold">Notifications</h1>
          <div className="mt-4 border-b-2"></div>

          {/* Notification List */}
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-center p-2">
                {/* Avatar */}
                <FaRegUserCircle className="text-3xl" />

                {/* Content */}
                <div className="ml-4">
                  <p className="">
                    <span className="font-semibold">{notification.user}</span>
                  </p>
                  {notification.message}.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
