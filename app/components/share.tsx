import React, { useState } from "react";
import {
  FacebookIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  VKIcon,
  LineIcon,
} from "react-share";

import {
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  VKShareButton,
  LineShareButton,
} from "react-share";

import { LuCopy, LuCopyCheck } from "react-icons/lu";

interface ComponentProps {
  setOpenModal: (open: boolean) => void;
  id: string;
}

export default function ShareDialog({ setOpenModal, id }: ComponentProps) {
  const [Copied, setCopied] = useState(`http://localhost:3000/posts/${id}`);
  const [isCopied, setIsCopied] = useState(false);

  const copiedToClipboard = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(Copied);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="border-2 border-gray-700 rounded-lg p-3 text-white modal-box relative bg-gray-900/40">
        <button
          onClick={() => setOpenModal(false)}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold">Share Post</h3>

        {/* Social Media Share Buttons */}
        <div className="mt-4 flex gap-3">
          <WhatsappShareButton url={`http://localhost:3000/posts/${id}`}>
            <WhatsappIcon className="w-10 h-10 rounded-full" />
          </WhatsappShareButton>

          <FacebookShareButton url={`http://localhost:3000/posts/${id}`}>
            <FacebookIcon className="w-10 h-10 rounded-full" />
          </FacebookShareButton>

          <TwitterShareButton url={`http://localhost:3000/posts/${id}`}>
            <TwitterIcon className="w-10 h-10 rounded-full" />
          </TwitterShareButton>

          <TelegramShareButton url={`http://localhost:3000/posts/${id}`}>
            <TelegramIcon className="w-10 h-10 rounded-full" />
          </TelegramShareButton>

          <RedditShareButton url={`http://localhost:3000/posts/${id}`}>
            <RedditIcon className="w-10 h-10 rounded-full" />
          </RedditShareButton>

          <EmailShareButton url={`http://localhost:3000/posts/${id}`}>
            <EmailIcon className="w-10 h-10 rounded-full" />
          </EmailShareButton>

          <VKShareButton url={`http://localhost:3000/posts/${id}`}>
            <VKIcon className="w-10 h-10 rounded-full" />
          </VKShareButton>

          <LineShareButton url={`http://localhost:3000/posts/${id}`}>
            <LineIcon className="w-10 h-10 rounded-full" />
          </LineShareButton>
        </div>

        {/* Copy URL */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={Copied}
            onChange={(e) => setCopied(e.target.value)}
            className="input input-bordered w-full text-black px-2"
          />
          <button
            onClick={copiedToClipboard}
            className="btn btn-outline flex items-center gap-2"
          >
            {isCopied ? (
              <>
                <LuCopyCheck className="text-lg" />
                Copied
              </>
            ) : (
              <>
                <LuCopy className="text-lg" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
