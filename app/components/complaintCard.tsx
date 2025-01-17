import { getContract, getSignerContract } from "@/utils/contract";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiHeart, BiComment } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import {
  RiShareForwardLine,
  RiCloseFill,
  RiSendPlaneFill,
} from "react-icons/ri";
import ShareDialog from "./share";
import toast from "react-hot-toast";

export default function ComplaintCard() {
  const [complaintData, setComplaintData] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [currentComplaintId, setCurrentComplaintId] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      try {
        const contract = getContract();
        const count = await contract.complaintCount();
        const totalComplaints = Number(count);

        const allComplaints = [];
        for (let id = 1; id <= totalComplaints; id++) {
          const complaint = await contract.getComplaint(id);
          allComplaints.push({ id, ...complaint });
        }

        setComplaintData(allComplaints);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleAddComment = async (id: number) => {
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

  const handleSupportComplaint = async (id: number) => {
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

  return (
    <div className="space-y-3 text-gray-300">
      {complaintData.length > 0 ? (
        [...complaintData]
          .sort((a, b) => b.id - a.id)
          .map((complaint) => (
            <div
              key={complaint.id}
              className="border-2 border-gray-700 rounded-lg shadow p-4"
            >
              <div className="flex items-start space-x-3">
                <button className="h-8 w-8 rounded-full bg-black cursor-pointer">
                  <FaRegUserCircle className="h-full w-full text-gray-400" />
                </button>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-200">
                      @{complaint[0].slice(0, 6)}...{complaint[0].slice(-4)}
                    </span>
                  </div>
                  <Link href={`/posts/${complaint.id}`}>
                    <p className="mt-2">{complaint[1]}</p>
                  </Link>
                  <div className="relative mt-3 flex items-start gap-3">
                    <div>
                      <button
                        onClick={() => {
                          setShareModalOpen(true);
                          setCurrentComplaintId(complaint.id);
                        }}
                        className="flex text-gray-500 hover:text-blue-500"
                      >
                        <RiShareForwardLine className="h-5 w-5" />
                      </button>

                      {isShareModalOpen && (
                        <ShareDialog
                          setOpenModal={setShareModalOpen}
                          id={currentComplaintId}
                        />
                      )}
                    </div>

                    <button
                      onClick={() => handleSupportComplaint(complaint.id)}
                      className="flex text-gray-500 hover:text-red-500"
                    >
                      <BiHeart className="h-5 w-5" />
                    </button>

                    <button
                      onClick={() => {
                        setCommentModalOpen(true);
                        setCurrentComplaintId(complaint.id);
                      }}
                      className="flex text-gray-500 hover:text-blue-500"
                    >
                      <BiComment className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
      ) : (
        <div className="w-full h-full text-center">Loading...</div>
      )}

      {/* Comment Modal */}
      {isCommentModalOpen && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-black/25"
          onClick={() => setCommentModalOpen(false)}
        >
          <div
            className="w-full m-4 bg-black text-white p-5 rounded-lg border-2 border-gray-700 relative"
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
            <div className="flex justify-end">
              <button
                onClick={() => handleAddComment(currentComplaintId)}
                className="p-1 px-2 bg-blue-700 text-gray-200 hover:text-gray-50 rounded-full hover:bg-blue-800 focus:outline-none"
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
