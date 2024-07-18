import React from "react";
import image from "../Assets/Oval.png";
import video_call from "../Assets/Video_Call.svg";
import audio_call from "../Assets/Call.svg";
import "../syles/Chat.css";
import { AttachFile, Send, InsertEmoticon } from "@mui/icons-material";

export default function Chat() {
  return (
    <div className="h-screen max-sm:hidden">
      <div className="profile_details flex h-20  bg-[#F6F6F6] items-center px-4 gap-3">
        <img className="h-10 w-10 rounded-full" src={image} alt="" />

        <div className="h-20 flex flex-col justify-center">
          <div className="font-myfont font-[600]">Elisa Das</div>
          <div className="font-myfont text-[#8E8E93]">
            Tap here to get contact info
          </div>
        </div>

        <div className="flex grow gap-4 pr-3 justify-end items-center h-20">
          <img src={video_call} className="w-[24px]" alt="" />
          <img src={audio_call} className="w-[20px]" alt="" />
        </div>
      </div>

      {/* chat container */}
      <div className="h-[calc(100%_-_130px)] chat-container py-3 px-3 overflow-hidden overflow-y-scroll">
        {/* my chat section */}
        <div className="my-chat flex justify-end items-center mb-3">
          <div className="bg-[#DCF7C5] max-w-80 rounded-lg py-1 px-2">
            <div className="font-myfont">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
              voluptatem architecto, quis earum dicta reprehenderit fugit
            </div>
            <div className="text-[12px] font-myfont text-[#000000] opacity-60 flex justify-end">
              17:47
            </div>
          </div>
        </div>
        {/* my chat ended */}

        {/* friends_chat */}
        <div className="my-chat flex  items-center mb-3">
          <div className="bg-[#FAFAFA] max-w-80 rounded-lg py-1 px-2">
            <div className="font-myfont">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
              voluptatem architecto, quis earum dicta reprehenderit fugit
            </div>
            <div className="text-[12px] font-myfont text-[#000000] opacity-60 flex justify-end">
              17:47
            </div>
          </div>
        </div>
        {/* friends chat ended */}
        {/* friends_chat */}
        <div className="my-chat flex  items-center mb-3">
          <div className="bg-[#FAFAFA] max-w-80 rounded-lg py-1 px-2">
            <div className="font-myfont">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
              voluptatem architecto, quis earum dicta reprehenderit fugit
            </div>
            <div className="text-[12px] font-myfont text-[#000000] opacity-60 flex justify-end">
              17:47
            </div>
          </div>
        </div>
        {/* friends chat ended */}
        {/* friends_chat */}
        <div className="my-chat flex  items-center mb-3">
          <div className="bg-[#FAFAFA] max-w-80 rounded-lg py-1 px-2">
            <div className="font-myfont">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
              voluptatem architecto, quis earum dicta reprehenderit fugit
            </div>
            <div className="text-[12px] font-myfont text-[#000000] opacity-60 flex justify-end">
              17:47
            </div>
          </div>
        </div>
        {/* friends chat ended */}
        {/* friends_chat */}
        <div className="my-chat flex  items-center mb-3">
          <div className="bg-[#FAFAFA] max-w-80 rounded-lg py-1 px-2">
            <div className="font-myfont">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
              voluptatem architecto, quis earum dicta reprehenderit fugit
            </div>
            <div className="text-[12px] font-myfont text-[#000000] opacity-60 flex justify-end">
              17:47
            </div>
          </div>
        </div>
        {/* friends chat ended */}
        {/* friends_chat */}
        <div className="my-chat flex  items-center mb-3">
          <div className="bg-[#FAFAFA] max-w-80 rounded-lg py-1 px-2">
            <div className="font-myfont">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
              voluptatem architecto, quis earum dicta reprehenderit fugit
            </div>
            <div className="text-[12px] font-myfont text-[#000000] opacity-60 flex justify-end">
              17:47
            </div>
          </div>
        </div>
        {/* friends chat ended */}
        {/* friends_chat */}
        <div className="my-chat flex  items-center mb-3">
          <div className="bg-[#FAFAFA] max-w-80 rounded-lg py-1 px-2">
            <div className="font-myfont">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
              voluptatem architecto, quis earum dicta reprehenderit fugit
            </div>
            <div className="text-[12px] font-myfont text-[#000000] opacity-60 flex justify-end">
              17:47
            </div>
          </div>
        </div>
        {/* friends chat ended */}
        {/* friends_chat */}
        <div className="my-chat flex  items-center mb-3">
          <div className="bg-[#FAFAFA] max-w-80 rounded-lg py-1 px-2">
            <div className="font-myfont">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
              voluptatem architecto, quis earum dicta reprehenderit fugit
            </div>
            <div className="text-[12px] font-myfont text-[#000000] opacity-60 flex justify-end">
              17:47
            </div>
          </div>
        </div>
        {/* friends chat ended */}
      </div>
      {/* footer section */}
      <div className="flex h-[50px] items-center px-3 py-1 gap-3">
        <div className="smiley">
          <InsertEmoticon />
        </div>
        <div className="attach-files rotate-45">
          <AttachFile />
        </div>
        <input
          type="text"
          className="grow h-full font-myfont placeholder:focus:outline-none px-2 outline-none"
          placeholder="Type a message"
        />
        <div className="send_icon">
          <Send />
        </div>
      </div>
    </div>
  );
}
