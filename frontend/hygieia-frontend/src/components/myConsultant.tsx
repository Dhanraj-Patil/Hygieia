"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Calendar, CreditCard, Paperclip, Send } from "lucide-react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MessageSquare } from "lucide-react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3003");

export default function MyConsultant({
  consultant,
  setShowSubscriptionDetails,
}) {
  const [newMessage, setNewMessage] = useState("");
  const [attachedMedia, setAttachedMedia] = useState(null);

  const [chat, setChat] = useState([
    {
      user: "",
      text: "",
    },
  ]);

  useEffect(() => {
    socket.on("message", (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("message", { user: "Client", text: newMessage });
      setChat((prev) => [...prev, { user: "You", text: newMessage }]);
      setNewMessage("");
    }
  };

  const handleAttachMedia = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAttachedMedia(file);
    }
  };

  return (
    <Dialog key={consultant.id}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src={consultant.image} alt={consultant.name} />
                <AvatarFallback>{consultant.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{consultant.name}</h3>
                <p className="text-sm text-gray-500">{consultant.specialty}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {consultant.hasNewMessage && (
                <Badge variant="secondary" className="bg-blue-100">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  New Message
                </Badge>
              )}
              <Button variant="outline" size="sm">
                Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] h-[80vh] flex flex-col p-0">
        <div className="flex h-full">
          <div className="w-1/3 border-r overflow-y-auto">
            <DialogHeader className="p-6 border-b">
              <DialogTitle>{consultant.name}</DialogTitle>
              <DialogDescription>{consultant.specialty}</DialogDescription>
            </DialogHeader>
            <div className="p-6">
              <h4 className="font-semibold mb-2">Upcoming Consultations</h4>
              <ul className="space-y-2">
                {consultant.subscription.upcomingSessions.map(
                  (session, index) => (
                    <li key={index} className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                      <span>
                        {session.date} at {session.time}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <Separator />
            <div className="p-6">
              <h4 className="font-semibold mb-2">Subscription Details</h4>
              <p>Plan: {consultant.subscription.plan}</p>
              <p>
                Price: ${consultant.subscription.price} /{" "}
                {consultant.subscription.billingCycle}
              </p>
              <Progress
                value={
                  (consultant.subscription.sessionsCompleted /
                    consultant.subscription.totalSessions) *
                  100
                }
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                {consultant.subscription.sessionsCompleted} of{" "}
                {consultant.subscription.totalSessions} sessions completed
              </p>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => setShowSubscriptionDetails(true)}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                View Full Details
              </Button>
            </div>
          </div>
          <div className="w-2/3 flex flex-col">
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {chat.map((msg) =>
                msg.user == "You" ? (
                  <div className="bg-white p-4 rounded-lg max-w-[70%] ml-auto">
                    <p className="text-sm">{msg.text}</p>
                  </div>
                ) : (
                  <div className="bg-indigo-100 p-4 rounded-lg max-w-[70%]">
                    <p className="text-sm">{msg.text}</p>
                  </div>
                ),
              )}
            </div>
            <div className="border-t p-6">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <label htmlFor="attach-media" className="cursor-pointer">
                  <Paperclip className="h-6 w-6 text-gray-400 hover:text-gray-600" />
                  <input
                    id="attach-media"
                    type="file"
                    className="hidden"
                    onChange={handleAttachMedia}
                    accept="image/*,video/*,audio/*"
                  />
                </label>
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
              {attachedMedia && (
                <div className="text-sm text-gray-500 mt-2">
                  Attached: {attachedMedia.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
