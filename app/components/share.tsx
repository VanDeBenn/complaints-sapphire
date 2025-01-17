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
  const [Copied, setCopied] = useState(
    `https://complaintsss.vercel.app/posts/${id}`
  );
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
          <WhatsappShareButton
            url={`https://complaintsss.vercel.app/posts/${id}`}
          >
            <WhatsappIcon className="w-10 h-10 rounded-full" />
          </WhatsappShareButton>

          <FacebookShareButton
            url={`https://complaintsss.vercel.app/posts/${id}`}
          >
            <FacebookIcon className="w-10 h-10 rounded-full" />
          </FacebookShareButton>

          <TwitterShareButton
            url={`https://complaintsss.vercel.app/posts/${id}`}
          >
            <TwitterIcon className="w-10 h-10 rounded-full" />
          </TwitterShareButton>

          <TelegramShareButton
            url={`https://complaintsss.vercel.app/posts/${id}`}
          >
            <TelegramIcon className="w-10 h-10 rounded-full" />
          </TelegramShareButton>

          <RedditShareButton
            url={`https://complaintsss.vercel.app/posts/${id}`}
          >
            <RedditIcon className="w-10 h-10 rounded-full" />
          </RedditShareButton>

          <EmailShareButton url={`https://complaintsss.vercel.app/posts/${id}`}>
            <EmailIcon className="w-10 h-10 rounded-full" />
          </EmailShareButton>

          <VKShareButton url={`https://complaintsss.vercel.app/posts/${id}`}>
            <VKIcon className="w-10 h-10 rounded-full" />
          </VKShareButton>

          <LineShareButton url={`https://complaintsss.vercel.app/posts/${id}`}>
            <LineIcon className="w-10 h-10 rounded-full" />
          </LineShareButton>
        </div>

        {/* Copy URL */}
        <div className="mt-4 flex items-center gap-2">
          <input
            disabled={true}
            type="text"
            defaultValue={Copied}
            className="w-full text-black px-2"
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
