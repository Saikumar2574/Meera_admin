import { Send } from "lucide-react";
import React from "react";

function Conversation() {
  return (
    <div className="flex-1 flex flex-col border rounded-lg">
      <div className="p-8">
        <h5 className="text-2xl font-semibold tracking-widest">Hey There,</h5>
        <h5 className="text-2xl font-semibold tracking-widest">
          How Can I Help You Today.
        </h5>
      </div>

      {/* Input with Send Icon */}
      <div className="mt-auto flex flex-col gap-2">
        <span className="text-sm ml-auto ">
          Select the text and add to 'Action List'.
        </span>
        <div className="flex items-center border rounded-lg overflow-hidden bg-gray-200">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-3  focus:outline-none bg-gray-200 text-black"
          />
          <button className="py-0.5 px-2">
            <Send size={40} className="bg-black p-2 rounded-lg" color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
