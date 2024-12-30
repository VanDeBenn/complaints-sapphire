"use client";
import { getSignerContract } from "@/utils/contract";
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";

export default function ComplaintForm() {
  const [complaint, setComplaint] = useState("");

  const handleAddComplaint = async () => {
    try {
      const signerContract = await getSignerContract();
      if (!signerContract) return;

      const tx = await signerContract.submitComplaint(complaint);
      await tx.wait();
      alert("Complaint submitted successfully!");
      setComplaint("");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint.");
    }
  };

  return (
    <div className="rounded-lg shadow pt-4 px-4 mb-6 border-2 border-gray-700">
      <div className="flex items-start space-x-4">
        <FaRegUserCircle className="h-10 w-10 text-gray-400" />
        <div className="flex-1">
          <textarea
            className="w-full bg-black border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="There is only one word: fight!"
            rows={3}
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              onClick={handleAddComplaint}
              className="p-1 px-2 bg-blue-700 text-gray-200 hover:text-gray-50 rounded-full hover:bg-blue-800 focus:outline-none mb-2"
            >
              <RiSendPlaneFill className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
