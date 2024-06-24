import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-900 text-white h-full ">
      <div className="max-w-screen-xl px-4  flex h-full items-center justify-center w-full mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-7xl mb-8">
            Collaborate in real-time sessions.
            <span className="sm:block mt-2"> Increase productivity. </span>
          </h1>

          <p className="mx-auto max-w-xl sm:text-xl/relaxed mb-10">
            HackChat makes it easy for you and your team to work together
            through real-time chats and audio and video calls, with special
            features to code easier and faster!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
