"use client";
import {
  getContract,
  getSignerContract,
  connectWallet,
} from "@/utils/contract";
import React, { useEffect, useState } from "react";
import { BiHeart, BiComment } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import {
  RiShareForwardLine,
  RiCloseFill,
  RiSendPlaneFill,
} from "react-icons/ri";

interface ComponentProps {
  id: any;
}

export default function ComplaintPost({ id }: ComponentProps) {
  const [complaintData, setComplaintData] = useState<any>();
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const contract = getContract();
        const complaint = await contract.getComplaint(id);
        setComplaintData(complaint);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  const handleAddComment = async () => {
    try {
      const signerContract = await getSignerContract();
      const tx = await signerContract.addComment(id, newComment);
      await tx.wait();
      setNewComment("");
      alert("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment.");
    }
  };

  const handleSupportComplaint = async () => {
    try {
      const signerContract = await getSignerContract();
      const tx = await signerContract.supportComplaint(id);
      await tx.wait();
      alert("Support added successfully!");
    } catch (error) {
      console.error("Error supporting complaint:", error);
      alert("Failed to add support.");
    }
  };

  if (!complaintData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Post Info */}
      <div className="flex items-start gap-4">
        <FaRegUserCircle className="text-gray-500 text-4xl" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-gray-200">
                @{complaintData[0].slice(0, 6)}...{complaintData[0].slice(-4)}
              </span>
              <div className="text-base leading-relaxed">
                {complaintData[1]}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}

      {/* Actions */}
      <div className="flex gap-3 items-center mt-4 text-gray-500 text-sm">
        <button className="flex text-gray-500 hover:text-blue-500">
          <RiShareForwardLine className="h-5 w-5" />
        </button>
        <button
          onClick={handleSupportComplaint}
          className="flex text-gray-500 hover:text-red-500"
        >
          <BiHeart className="h-5 w-5" />
        </button>
        <button
          className="flex text-gray-500 hover:text-blue-500"
          onClick={() => {
            const modal = document.getElementById(
              `my_modal_${id}`
            ) as HTMLDialogElement;
            modal?.showModal();
          }}
        >
          <BiComment className="h-5 w-5" />
        </button>

        <dialog
          id={`my_modal_${id}`}
          className="modal rounded-lg border-2 border-gray-700"
        >
          <div className="modal-box bg-black text-white p-5">
            <form method="dialog">
              <button className="absolute right-2 top-2">
                <RiCloseFill />
              </button>
            </form>
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <textarea
                  className="w-full bg-black border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Your Comment"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleAddComment}
                    className="p-1 px-2 bg-blue-700 text-gray-200 hover:text-gray-50 rounded-full hover:bg-blue-800 focus:outline-none"
                  >
                    <RiSendPlaneFill className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
