import React, { useEffect, useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsCopy, BsShare } from "react-icons/bs";
import { messages } from "../data/data";
import { message as antdMessage } from "antd";
import { Tooltip } from "antd";

export default function InputForm() {
  const [senderName, setSenderName] = useState("");
  const [name, setName] = useState("");
  const [wordCount, setWordCount] = useState();
  const [emotion, setEmotion] = useState("");
  const [message, setMessage] = useState(
    "Your Personlaized Message will show up once you click on the Generate Message button!"
  );
  const [typedMessage, setTypedMessage] = useState("");

  const [greeting, setGreeting] = useState(""); // Default greeting
  const [isTyping, setIsTyping] = useState(false);
  const [messageCompleted, setMessageCompleted] = useState(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const [typeEffect] = useTypewriter({
    words: ["Emotional", "Touching", "Funny", "Heartfelt", "Inspirational"],
    loop: {},
    typeSpeed: 200,
    deleteSpeed: 80,
  });

  // Function to simulate typing effect
  const simulateTyping = (message) => {
    setTypedMessage("");
    setIsTyping(true); // Disable form while typing
    setMessageCompleted(false); // Reset completion state

    let index = 0;
    let newMessage = "";

    const typingInterval = setInterval(() => {
      newMessage += message[index];
      setTypedMessage(newMessage);

      index++;

      if (index >= message.length) {
        clearInterval(typingInterval);
        setIsTyping(false); // Re-enable form after typing completes
        setMessageCompleted(true); // Show "Copy" and "Share" buttons
      }
    }, 50);
  };

  const generateMessage = () => {
    console.log("Sender Name:", senderName);
    console.log("Recipient Name:", name);

    const filteredMessages = messages.filter(
      (msg) => msg.wordCount === wordCount && msg.emotion === emotion
    );

    const selectedMessage = filteredMessages.length
      ? filteredMessages[Math.floor(Math.random() * filteredMessages.length)]
      : { text: "Happy Mother's Day!" };

    let personalizedMessage = selectedMessage.text;

    if (name.trim()) {
      personalizedMessage = `Dear ${name}, ${personalizedMessage}`;
    }

    if (senderName && senderName.trim()) {
      personalizedMessage += `Love, ${senderName}.`;
    }

    console.log("Generated Message:", personalizedMessage); // Debugging output

    setMessage(personalizedMessage);
    simulateTyping(personalizedMessage);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
  };

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      <div
        className="flex flex-col gap-4 md:w-full lg:w-1/2 w-full bg-white justify-center"
        style={{ padding: "20px" }}
      >
        <div className="">
          <h1 className="text-[25px] lg:text-[40px] text-start">{greeting}</h1>
          <p className="text-[18px] lg:text-[22px]">
            Write {typeEffect} messages to your mother on this special day.
          </p>
        </div>
        <div className="flex flex-col md:w-[80%] w-full justify-center gap-8 items-center">
          <input
            type="text"
            placeholder="Enter your name"
            value={senderName} // Corrected this
            onChange={(e) => setSenderName(e.target.value)}
            className="border border-gray-300 rounded-lg w-full"
            style={{ padding: "13px 15px " }}
            disabled={isTyping}
          />
          <input
            type="text"
            placeholder="Enter recipient's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg w-full"
            style={{ padding: "13px 15px " }}
            disabled={isTyping}
          />
          <select
            value={wordCount}
            onChange={(e) => setWordCount(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded-lg w-full"
            style={{ padding: "13px 15px " }}
            disabled={isTyping}
          >
            <option>Select a word count</option>
            <option value={50}>50 Words</option>
            <option value={100}>100 Words</option>
            <option value={150}>150 Words</option>
            <option value={200}>200 Words</option>
            <option value={250}>250 Words</option>
            <option value={300}>300 Words</option>
          </select>
          <select
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full"
            style={{ padding: "13px 15px " }}
            disabled={isTyping}
          >
            <option>Select an emotion</option>
            <option value="touching">Touching</option>
            <option value="funny">Funny</option>
            <option value="inspirational">Inspirational</option>
            <option value="heartfelt">Heartfelt</option>
          </select>
          <button
            onClick={generateMessage}
            className="bg-[#ff8906] text-white py-2 px-4 rounded-lg w-full cursor-pointer"
            style={{ padding: "8px 16px " }}
            disabled={isTyping}
          >
            Generate Message
          </button>
          <div className="">
            <p className="text-[16px] lg:text-[20px]">Follow me on</p>
            <div className="flex flex-row gap-3 items-center justify-center">
              <a
                href="https://www.instagram.com/erinthebrand?igsh=MXd3N3J4M2VzcWVkMg%3D%3D&utm_source=qr"
                target="_blank"
              >
                <FaInstagram size={23} />
              </a>
              <a href="https://x.com/erinthebrand?s=21" target="_blank">
                <FaXTwitter size={23} />
              </a>
              <a href="https://linkedin.com/in/feyijimierinle" target="_blank">
                <FaLinkedin size={23} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-[#1b1b1b] md:w-full lg:w-1/2 w-full flex flex-col gap-7 h-screen"
        style={{ padding: "20px 40px" }}
      >
        <h2 className="text-[20px] lg:text-[40px] text-white">
          Generated Mother's Day Message
        </h2>
        <p className="text-[20px] font-normal text-white">{typedMessage}</p>

        {messageCompleted && (
          <div
            className="flex gap-4 justify-center"
            style={{ marginTop: "10px" }}
          >
            <Tooltip title="Copied to clipboard!" trigger="click">
              <button
                onClick={copyToClipboard}
                className="flex gap-1.5 items-center bg-gray-300 text-gray-800 py-2 px-4 rounded-lg cursor-pointer"
                style={{ padding: "8px 16px " }}
              >
                <BsCopy />
                Copy
              </button>
            </Tooltip>

            <button
              onClick={shareOnWhatsApp}
              className="flex gap-1.5 items-center bg-green-500 text-white py-2 px-4 rounded-lg cursor-pointer"
              style={{ padding: "8px 16px" }}
            >
              <BsShare />
              Share
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
