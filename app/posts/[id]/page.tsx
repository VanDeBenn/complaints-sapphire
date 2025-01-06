"use client";
import React from "react";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import ComplaintPost from "@/app/components/complaintPost";
import CommentsComplaint from "@/app/components/commentsComplaint";
import { usePathname } from "next/navigation";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const pathname = usePathname();
  if (!pathname) {
    return;
  }
  const pathSegments = pathname.split("/");
  const id = pathSegments[2];
  return (
    <>
      <Header />

      <div className="flex flex-col w-full max-w-xl mx-auto p-4 rounded-lg shadow-sm">
        <ComplaintPost id={id} />

        <div className="border-b-2 my-3 border-gray-700"></div>

        <h3 className="font-semibold text-lg ">Comments</h3>
        <CommentsComplaint id={id} />
      </div>

      <Footer />
    </>
  );
}
