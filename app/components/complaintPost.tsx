"use client";

import React, { useEffect, useState } from "react";
import { getContract, getSignerContract } from "@/utils/contract";
import { BiHeart, BiComment } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import {
  RiShareForwardLine,
  RiCloseFill,
  RiSendPlaneFill,
} from "react-icons/ri";
import ShareDialog from "./share";
import toast from "react-hot-toast";

interface ComponentProps {
  id: string;
}

export default function ComplaintPost({ id }: ComponentProps) {
  const [complaintData, setComplaintData] = useState<any>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [isShareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [isCommentModalOpen, setCommentModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fetchComplaint() {
      try {
        const contract = getContract();
        const complaint = await contract.getComplaint(id);
        setComplaintData(complaint);
      } catch (error) {
        console.error("Error fetching complaint data:", error);
      }
    }

    fetchComplaint();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      const signerContract = await getSignerContract();
      if (!signerContract) return;

      const tx = await toast.promise(
        signerContract.addComment(id, newComment),
        {
          loading: "Submitting comment...",
          success: (tx: any) => {
            tx.wait();
            setNewComment("");
            setCommentModalOpen(false);
            return (
              <div className="z-50">
                Comment submitted successfully! Details:{" "}
                <a
                  href={`https://explorer.oasis.io/testnet/sapphire/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 no-underline"
                >
                  Here
                </a>
              </div>
            );
          },
          error: "Failed to submit comment.",
        },
        {
          style: {
            minWidth: "250px",
            background: "#333",
            color: "#fff",
          },
          success: {
            duration: 10000,
            icon: "🔥",
          },
        }
      );
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment.");
    }
  };

  const handleSupportComplaint = async () => {
    try {
      const signerContract = await getSignerContract();
      if (!signerContract) return;

      const tx = await toast.promise(
        signerContract.supportComplaint(id),
        {
          loading: "Support Complaint...",
          success: (tx: any) => {
            tx.wait();
            return (
              <div className="z-50">
                Support Complaint successfully! Details:{" "}
                <a
                  href={`https://explorer.oasis.io/testnet/sapphire/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 no-underline"
                >
                  Here
                </a>
              </div>
            );
          },
          error: "Failed to Support Complaint.",
        },
        {
          style: {
            minWidth: "250px",
            background: "#333",
            color: "#fff",
          },
          success: {
            duration: 10000,
            icon: "🔥",
          },
        }
      );
    } catch (error) {
      console.error("Error supporting complaint:", error);
      alert("Failed to add support.");
    }
  };

  if (!complaintData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-4 text-white">
      {/* Post Info */}
      <div className="flex items-start gap-4">
        <FaRegUserCircle className="text-gray-500 text-4xl" />
        <div className="flex-1">
          <div className="flex flex-col">
            <span className="font-bold text-gray-200">
              @{complaintData[0].slice(0, 6)}...{complaintData[0].slice(-4)}
            </span>
            <p className="text-base leading-relaxed">{complaintData[1]}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 items-center mt-4 text-gray-500 text-sm">
        <button
          onClick={() => setShareModalOpen(true)}
          className="flex text-gray-500 hover:text-blue-500"
        >
          <RiShareForwardLine className="h-5 w-5" />
        </button>

        <button
          onClick={handleSupportComplaint}
          className="flex text-gray-500 hover:text-red-500"
        >
          <BiHeart className="h-5 w-5" />
        </button>

        <button
          onClick={() => setCommentModalOpen(true)}
          className="flex text-gray-500 hover:text-blue-500"
        >
          <BiComment className="h-5 w-5" />
        </button>
      </div>

      {/* Share Dialog */}
      {isShareModalOpen && (
        <ShareDialog setOpenModal={setShareModalOpen} id={id} />
      )}

      {/* Comment Modal */}
      {isCommentModalOpen && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-black/25"
          onClick={() => setCommentModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-black text-white p-5 rounded-lg border border-gray-700 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-2 top-2 text-white hover:text-gray-400"
              onClick={() => setCommentModalOpen(false)}
            >
              <RiCloseFill className="h-6 w-6" />
            </button>

            <textarea
              className="w-full bg-black border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
              placeholder="Your Comment"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handleAddComment}
                className="p-2 px-4 bg-blue-700 text-gray-200 hover:text-white rounded-full hover:bg-blue-800 focus:outline-none"
              >
                <RiSendPlaneFill className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
