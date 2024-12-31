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

export default function ComplaintCard() {
  const [complaintData, setComplaintData] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [complaintId, setComplaintId] = useState<any>();

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

  const handleSupportComplaint = async (id: number) => {
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

  return (
    <div className="space-y-6 text-gray-300">
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
                          setModalOpen(true);
                          setComplaintId(complaint.id);
                        }}
                        className="flex text-gray-500 hover:text-blue-500"
                      >
                        <RiShareForwardLine className="h-5 w-5" />
                      </button>

                      {/* ShareDialog Component */}
                      {isModalOpen && (
                        <ShareDialog
                          setOpenModal={setModalOpen}
                          id={complaintId}
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
                      className="flex text-gray-500 hover:text-blue-500"
                      onClick={() => {
                        const modal = document.getElementById(
                          `my_modal_${complaint.id}`
                        ) as HTMLDialogElement;
                        modal?.showModal();
                      }}
                    >
                      <BiComment className="h-5 w-5" />
                    </button>

                    <dialog
                      id={`my_modal_${complaint.id}`}
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
                                onClick={() => handleAddComment(complaint.id)}
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
              </div>
            </div>
          ))
      ) : (
        <div>Loading complaints...</div>
      )}
    </div>
  );
}
