"use client";
import { getContract } from "@/utils/contract";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

interface ComponentProps {
  id: any;
}

export default function CommentsComplaint({ id }: ComponentProps) {
  const [commentsData, setCommentsData] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      try {
        const contract = getContract();
        const comments = await contract.getComments(id);
        setCommentsData(comments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="mt-4 flex flex-col gap-4">
      {commentsData && commentsData.length > 0 ? (
        commentsData.map((comment: any, index: number) => (
          <div key={index} className="flex items-start gap-4 pb-4 ">
            <FaRegUserCircle className="text-gray-500 text-3xl" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-200">
                  @{comment[0].slice(0, 6)}...{comment[0].slice(-4)}
                </span>
              </div>
              <p className="text-gray-400 mt-1">{comment[1]}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="">No comments yet</div>
      )}
    </div>
  );
}
