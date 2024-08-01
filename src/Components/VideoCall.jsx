import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "../styles/VideoCall.css";
import {
  CallEnd,
  Videocam,
  KeyboardVoiceRounded,
  Call,
} from "@mui/icons-material";

export default function VideoCall() {
  //   let [actiontype, setaction] = useState("");
  let video_offer;
  let client_ice_candidate;
  let first_answer = true;
  let first_offer = true;
  let stream;
  let p2pconnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  });

  async function setUserMedia() {
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      // audio: true,
    });

    let myvideo_element = document.querySelector(".myvideo");
    myvideo_element.srcObject = stream;

    myvideo_element.addEventListener("loadedmetadata", () => {
      myvideo_element.play();
    });

    return stream;
  }

  useEffect(() => {
    async function setStream() {
      stream = await setUserMedia();
      p2pconnection.addTrack(stream.getVideoTracks()[0], stream);
      // p2pconnection.addTrack(stream.getAudioTracks()[0], stream);
      console.log("p2pconnection is intiliased with tracks and media...");
    }
    setStream();
  }, []);

  console.log("rendered!!!");

  let socket = io("http://localhost:9000", {
    auth: {
      mobile: "7073430939",
    },
  });

  async function setupConnectionOffer(stream) {
    p2pconnection.onicecandidateerror = (event) => {
      console.log("Error in icecandidate", event);
    };

    // create a video-offer
    let video_offer = await p2pconnection.createOffer();

    // if found our icecandidate then report to server this is always called after setting local desc
    p2pconnection.onicecandidate = (event) => {
      if (event.candidate) {
        // console.log("Ice candidate found and here it is ", event.candidate);
        console.log(
          "We found the ice candidate sending complete offer to server.."
        );
        socket.emit("video-offer", {
          videooffer: video_offer,
          icecandidate: event.candidate,
        });
      }
    };

    await p2pconnection.setLocalDescription(video_offer);
    console.log("local desc is set...!");
  }

  async function setupConnectionAnswer(vid_offer) {
    first_answer = false;
    // error in finding me
    p2pconnection.onicecandidateerror = (event) => {
      console.log("Error in icecandidate", event);
    };

    // create a video-offer
    await p2pconnection.setRemoteDescription(vid_offer.videooffer);
    await p2pconnection.addIceCandidate(video_offer.icecandidate);

    let video_answer = await p2pconnection.createAnswer();

    // if found our icecandidate then report to server
    p2pconnection.onicecandidate = (event) => {
      if (event.candidate) {
        // console.log("Ice candidate found and here it is ", event.candidate);
        console.log(
          "We found the ice candidate sending complete answer  to server.."
        );
        socket.emit("video-answer", {
          videoanswer: video_answer,
          icecandidate: event.candidate,
        });
      }
    };

    await p2pconnection.setLocalDescription(video_answer);
    console.log("local desc is set...!");
  }

  //got the offer from the other clients
  socket.on("offers", async (vid_offers) => {
    console.log("We got video_offers from server..");
    video_offer = vid_offers;
    if (first_answer) {
      await setupConnectionAnswer(video_offer);
      console.log("offer accepted!!");
    }
  });

  socket.on("video-answer", async (video_answer) => {
    console.log("we got the video_answer from server.. : ");
    if (first_offer === true) {
      first_offer = false;
      await p2pconnection.setRemoteDescription(video_answer.videoanswer);
      await p2pconnection.addIceCandidate(video_answer.icecandidate);
      console.log("remote desc added!!");
      return;
    } else {
      await p2pconnection.addIceCandidate(video_answer.icecandidate);
    }
  });

  p2pconnection.addEventListener("track", (event) => {
    console.log("new track is added to the connection line!!");
    let myfriend_element = document.querySelector(".friend-video");
    let alternate = document.querySelector(".alternate");
    alternate.style.display = "none";
    myfriend_element.style.display = "inline";
    myfriend_element.srcObject = event.streams[0];

    myfriend_element.addEventListener("loadedmetadata", () => {
      myfriend_element.play();
    });
  });

  async function globalsetup(actiontype) {
    let stream = await setUserMedia();
    if (actiontype === "offer") setupConnectionOffer(stream);
    else {
      setupConnectionAnswer(stream);
    }
  }

  // user's video call initilisation
  useEffect(() => {
    // globalsetup();
  }, []);
  return (
    <div className="w-screen h-screen relative flex flex-col justify-end items-center bg-[#1e1d1d]">
      <video className="hidden friend-video w-screen h-screen object-cover absolute"></video>
      <div className="alternate absolute w-screen h-screen flex justify-center items-center">
        <div className="call-container rounded-full border-white border flex justify-center items-center">
          <div className="w-28 h-28 rounded-full bg-green-700 text-white font-bold flex justify-center items-center">
            <Call
              className="call-icon"
              style={{ width: "56px", height: "56px" }}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-5 pb-5">
        <button
          onClick={() => {
            globalsetup("offer");
          }}
          className="bg-[white] w-12 h-12 rounded-full z-20 flex justify-center items-center text-black"
        >
          <Videocam />
        </button>

        <button
          onClick={() => {
            globalsetup("offer");
          }}
          className="bg-[red] w-12 h-12 rounded-full z-20 flex justify-center items-center text-white"
        >
          <CallEnd />
        </button>

        <button
          onClick={() => {
            console.log("clicked on it!!");
          }}
          className="bg-[white] w-12 h-12 rounded-full z-20 flex justify-center items-center text-black"
        >
          <KeyboardVoiceRounded />
        </button>
      </div>

      <video className=" w-[200px] h-[200px] bottom-2 right-2 myvideo object-cover absolute"></video>
    </div>
  );
}
