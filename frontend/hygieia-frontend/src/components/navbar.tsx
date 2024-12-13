"use client";

import { useEffect, useState } from "react";
import { Calendar, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavBar() {
  const { user, logout, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  const [client, setClient] = useState({});

  const initialNotifications = [
    {
      id: 1,
      message: "Your consultation with Dr. Jane Smith is in 1 hour",
      type: "reminder",
    },
    { id: 2, message: "New message from Dr. Michael Johnson", type: "message" },
    {
      id: 3,
      message: "Your consultation with Sarah Lee has been rescheduled",
      type: "alert",
    },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const hasNewNotifications = notifications.length > 0;

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Calendar className="h-8 w-8 text-indigo-600 mr-2" />
          <span className="text-xl font-bold text-gray-900">Hygieia</span>
        </div>
        {/* <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Dashboard</Button>
            <Button variant="ghost">Find Experts</Button>
            <Button variant="ghost">My Consultants</Button>
            <Button variant="ghost">Profile</Button>
          </nav> */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {hasNewNotifications && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            )}
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              {user?.given_name[0]}
              {user?.family_name[0]}
            </AvatarFallback>
          </Avatar>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Navigate through Hygieia</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Find Experts
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  My Consultants
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Profile
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
