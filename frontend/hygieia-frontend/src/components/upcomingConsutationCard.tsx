"use client";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { redirect, redirectDocument } from "react-router-dom";

export default function UpcomingConsultationsCard({ consultation, index }) {
  const handleJoin = () => {
    window.location.href = "https://meet.google.com/bmm-nqbo-tbd";
  };

  return (
    <div
      key={index}
      className="flex-none w-64 bg-gray-50 rounded-lg p-3 border border-gray-200"
    >
      <div className="flex items-center mb-2">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage
            src={consultation.expertImage}
            alt={consultation.expertName}
          />
          <AvatarFallback>{consultation.expertName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm">{consultation.expertName}</p>
          <p className="text-xs text-gray-500">
            {consultation.expertSpecialty}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span>
          {consultation.date} at {consultation.time}
        </span>
        <Button size="sm" variant="outline" onClick={handleJoin}>
          Join
        </Button>
      </div>
    </div>
  );
}
