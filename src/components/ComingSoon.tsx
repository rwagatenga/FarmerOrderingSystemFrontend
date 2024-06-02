// src/components/ComingSoon.js

import { TypeAnimation } from "react-type-animation";
import "@/assets/coming-soon.css"; // Create this file for custom styles

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {" "}
      {/* bg-gradient-to-b from-gray-400 via-dark-700 to-gray-800">*/}
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">
          Exciting Things Will be Continued Later!
        </h1>
        <TypeAnimation
          sequence={[
            "We are working hard to bring you something awesome soon.",
            "Because of shortage of time, I couldn't implemented most awesome features including this page",
            8000,
          ]}
          wrapper="span"
          speed={10}
          style={{
            fontSize: "2em",
            display: "inline-block",
            color: "gray-400",
          }}
          repeat={Infinity}
        />

        <div className="animate-bounce mt-8 justify-center">
          <svg
            className="w-8 h-8 text-white mt-12 align-middle justify-center text-center"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
