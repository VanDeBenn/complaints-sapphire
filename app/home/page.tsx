"use client";
import React from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import ComplaintForm from "../components/complaintForm";
import ComplaintCard from "../components/complaintCard";

export default function Page() {
  function openFaucet() {
    window.open("https://faucet.testnet.oasis.io/", "_blank");
  }

  return (
    <>
      <div className="min-h-screen">
        <Header />

        <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <ComplaintForm />
          <ComplaintCard />
        </div>
      </div>

      <Footer />
    </>
  );
}
