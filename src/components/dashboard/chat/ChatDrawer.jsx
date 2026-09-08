import React, { useState } from "react";
import { X, ChevronLeft, Send } from "lucide-react";
import { teamsData } from "../../../data/teamsData";

export default function ChatDrawer({ isOpen, onClose }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages(user.chatHistory || []);
  };

  const handleBackToList = () => {
    setSelectedUser(null);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: inputMessage,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
  };

  return (
    <>
      {/* Invisible Click Outside Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-transparent" onClick={onClose} />
      )}

      {/* Frosted Glass Drawer Container */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-80 sm:w-96 bg-white/40 backdrop-blur-xl border-l border-white/50 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/30 bg-white/20">
          {selectedUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleBackToList}
                className="grid h-8 w-8 place-items-center rounded-full text-gray-700 hover:bg-white/40 transition"
              >
                <ChevronLeft size={20} />
              </button>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  To:{" "}
                  <span className="text-indigo-600">{selectedUser.name}</span>
                </h3>
                <p className="text-[10px] text-gray-600">{selectedUser.role}</p>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-extrabold text-gray-900">
                Team Chat
              </h2>
              <p className="text-xs text-gray-600">
                Select an employee to start messaging
              </p>
            </div>
          )}

          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full text-gray-600 hover:bg-white/40 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body: Team List or Active Chat */}
        {!selectedUser ? (
          /* Employee / Team List */
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {teamsData.map((team) => (
              <div key={team.teamName}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3 px-1">
                  {team.teamName}
                </h3>
                <div className="space-y-1">
                  {team.members.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => handleUserSelect(member)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-2xl transition bg-white/20 border border-white/30 hover:bg-white/50 hover:shadow-sm text-left group"
                    >
                      <div className="relative">
                        <div
                          className={`grid h-10 w-10 place-items-center rounded-full font-bold text-xs shadow-sm ring-2 ring-white/80 ${member.avatarBg}`}
                        >
                          {member.initials}
                        </div>
                        {member.online && (
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-gray-900 group-hover:text-indigo-600 transition">
                          {member.name}
                        </p>
                        <p className="text-[10px] text-gray-600 truncate">
                          {member.role}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Chat Box View */
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => {
                const isMe = msg.sender === "me";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    {!isMe && (
                      <div className="relative mb-1">
                        <div
                          className={`grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold ${selectedUser.avatarBg}`}
                        >
                          {selectedUser.initials}
                        </div>
                        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-xs font-medium leading-relaxed shadow-sm ${
                        isMe
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white/70 backdrop-blur-md text-gray-900 border border-white/60 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {isMe && (
                      <div className="relative mb-1">
                        <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-tr from-amber-200 via-orange-300 to-rose-300 text-[10px] font-bold text-gray-800">
                          HP
                        </div>
                        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Input Box */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-white/30 border-t border-white/30"
            >
              <div className="flex items-center gap-2 rounded-2xl bg-white/70 border border-white/60 p-1.5 focus-within:ring-2 focus-within:ring-blue-300 shadow-sm transition">
                <textarea
                  rows="2"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent px-2 py-1 text-xs outline-none resize-none placeholder:text-gray-500 text-gray-900"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition self-end"
                >
                  <Send size={12} />
                  SEND
                </button>
              </div>
            </form>
          </div>
        )}
      </aside>
    </>
  );
}
