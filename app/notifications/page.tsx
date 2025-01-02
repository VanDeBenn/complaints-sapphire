"use client";
// pages/notifications.js
import React from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FaRegUserCircle } from "react-icons/fa";

const notifications = [
  {
    id: 1,
    user: "John Doe",
    avatar: "https://via.placeholder.com/40",
    message: "liked your tweet",
    time: "2h ago",
  },
  {
    id: 2,
    user: "Jane Smith",
    avatar: "https://via.placeholder.com/40",
    message: "commented on your tweet",
    time: "5h ago",
  },
  {
    id: 3,
    user: "Alice Johnson",
    avatar: "https://via.placeholder.com/40",
    message: "started following you",
    time: "1d ago",
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
                    <span className="font-semibold">{notification.user}</span>{" "}
                    {notification.message}.
                  </p>
                  <p className="text-sm text-gray-500">{notification.time}</p>
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
