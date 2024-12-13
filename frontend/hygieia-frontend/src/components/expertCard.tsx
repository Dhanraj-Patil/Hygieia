"use client";

import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Star } from "lucide-react";
import { Badge } from "./ui/badge";

export default function ExpertCard({ expert, handleExpertClick }) {
  return (
    <Card
      key={expert.id}
      className="cursor-pointer hover:shadow-lg transition-shadow"
    >
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage src={expert.image} alt={expert.name} />
            <AvatarFallback>{expert.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{expert.name}</h3>
            <p className="text-sm text-gray-500">{expert.specialty}</p>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <Star className="h-5 w-5 text-yellow-400 mr-1" />
          <span className="text-sm font-medium">{expert.rating}</span>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Badge variant="secondary">{expert.language}</Badge>
          <Badge variant="outline">{expert.country}</Badge>
        </div>
        <p className="text-sm text-gray-600 mb-4">{expert.qualification}</p>
        <Button className="w-full" onClick={() => handleExpertClick(expert)}>
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}
