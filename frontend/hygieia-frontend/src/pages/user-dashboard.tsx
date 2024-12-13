"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Calendar,
  Bell,
  User,
  Search,
  Clock,
  MessageSquare,
  Filter,
  Mail,
  Phone,
  Video,
  Send,
  Award,
  Book,
  DollarSign,
  CreditCard,
  XCircle,
  Paperclip,
  FileText,
  ChevronRight,
  Menu,
  Subscript,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NavBar from "@/components/navbar";
import UpcomingConsultationsCard from "@/components/upcomingConsutationCard";
import ExpertCard from "@/components/expertCard";
import MyConsultant from "@/components/myConsultant";
import Notification from "@/components/notification";
import SubscriptionDetails from "@/components/subscriptionDetails";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

// Mock data for experts (updated with enhanced subscription info)
const initialExperts = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    specialty: "Psychologist",
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=400",
    language: "English",
    country: "USA",
    hasNewMessage: true,
    qualification: "Ph.D. in Clinical Psychology, Harvard University",
    experience: "15 years",
    bio: "Specializing in cognitive behavioral therapy and stress management techniques.",
    subscription: {
      plan: "Premium",
      price: 99.99,
      billingCycle: "monthly",
      features: [
        "Unlimited messaging",
        "4 video sessions per month",
        "Priority support",
      ],
      sessionsCompleted: 2,
      totalSessions: 4,
      upcomingSessions: [
        { date: "2024-03-20", time: "14:00" },
        { date: "2024-03-27", time: "15:30" },
      ],
      completedSessions: [
        {
          date: "2024-03-06",
          time: "14:00",
          brief: "Discussed anxiety management techniques",
        },
        {
          date: "2024-03-13",
          time: "15:30",
          brief: "Explored childhood experiences and their impact",
        },
      ],
      invoices: [
        {
          id: "INV-001",
          date: "2024-03-01",
          amount: 99.99,
          status: "Paid",
          mode: "Credit Card",
        },
        {
          id: "INV-002",
          date: "2024-04-01",
          amount: 99.99,
          status: "Pending",
          mode: "Na",
        },
      ],
      paymentMethod: {
        type: "Credit Card",
        last4: "4242",
        expiryDate: "12/25",
      },
    },
  },
  {
    id: 2,
    name: "Dr. Michael Johnson",
    specialty: "Nutritionist",
    rating: 4.9,
    image: "/placeholder.svg?height=400&width=400",
    language: "English, Spanish",
    country: "Canada",
    hasNewMessage: false,
    qualification: "Ph.D. in Nutritional Sciences, University of Toronto",
    experience: "12 years",
    bio: "Expert in personalized nutrition plans and dietary management for chronic diseases.",
    subscription: {
      plan: "Standard",
      price: 79.99,
      billingCycle: "monthly",
      features: [
        "Weekly messaging",
        "2 video sessions per month",
        "Email support",
      ],
      sessionsCompleted: 1,
      totalSessions: 2,
      upcomingSessions: [{ date: "2024-03-22", time: "10:00" }],
      completedSessions: [
        {
          date: "2024-03-08",
          time: "10:00",
          brief: "Developed a personalized meal plan",
        },
      ],
      invoices: [
        { id: "INV-003", date: "2024-03-01", amount: 79.99, status: "Paid" },
      ],
      paymentMethod: {
        type: "PayPal",
        email: "m.johnson@email.com",
      },
    },
  },
  {
    id: 3,
    name: "Sarah Lee",
    specialty: "Physical Trainer",
    rating: 4.7,
    image: "/placeholder.svg?height=400&width=400",
    language: "English, Mandarin",
    country: "Australia",
    hasNewMessage: true,
    qualification: "Master's in Exercise Science, University of Melbourne",
    experience: "8 years",
    bio: "Specialized in rehabilitation exercises and strength training for all fitness levels.",
    subscription: {
      plan: "Basic",
      price: 59.99,
      billingCycle: "monthly",
      features: [
        "Bi-weekly messaging",
        "1 video session per month",
        "Community forum access",
      ],
      sessionsCompleted: 0,
      totalSessions: 1,
      upcomingSessions: [{ date: "2024-03-25", time: "18:00" }],
      completedSessions: [],
      invoices: [
        { id: "INV-004", date: "2024-03-01", amount: 59.99, status: "Paid" },
      ],
      paymentMethod: {
        type: "Credit Card",
        last4: "1234",
        expiryDate: "03/26",
      },
    },
  },
];

// Mock data for notifications
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

export default function UserDashboard() {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const [client, setClient] = useState({});
  const [expert, setExpert] = useState([]);

  const [selectedExpert, setSelectedExpert] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    language: "all",
    country: "all",
    specialty: "all",
  });
  const [experts, setExperts] = useState(initialExperts);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [Loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstName: "Dhanraj",
    lastName: "Patil",
    email: "dhanraj@example.com",
    phone: "+911234567890",
  });
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [showSubscriptionDetails, setShowSubscriptionDetails] = useState(false);
  const [showExpertDetails, setShowExpertDetails] = useState(false);

  const [myConsultants, setMyConsultants] = useState([]);

  const getData = async () => {
    const accessToken = await getAccessTokenSilently();
    const clientData = await axios.get("http://localhost:3000/user", {
      params: {
        id: user?.email,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setClient(clientData.data);

    const expertsData = await axios.get("http://localhost:3000/expert/all", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setExpert(expertsData.data);

    await axios
      .get(`http://localhost:3002/subscriptions/all/${user.email}`)
      .then((response) => {
        if (response.data) {
          setMyConsultants(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      getData();
    }
  }, [isLoading, isAuthenticated]);

  const handleExpertClick = (expert) => {
    setSelectedExpert(expert);
    setShowExpertDetails(true);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const filteredExperts = initialExperts.filter(
      (expert) =>
        (expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expert.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filters.language === "all" ||
          expert.language.includes(filters.language)) &&
        (filters.country === "all" || expert.country === filters.country) &&
        (filters.specialty === "all" || expert.specialty === filters.specialty),
    );
    setExperts(filteredExperts);
    setLoading(false);
  };

  const handleProfileChange = (field, value) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handleStartVideoCall = () => {
    setIsVideoCallActive(true);
  };

  const handleEndVideoCall = () => {
    setIsVideoCallActive(false);
  };

  const handleConsultantClick = (consultant) => {
    setSelectedConsultant(consultant);
  };

  const handleCancelSubscription = (consultantId) => {
    // In a real application, you would send a request to the backend to cancel the subscription
    console.log("Cancelling subscription for consultant:", consultantId);
    // Update the local state to reflect the cancellation
    setExperts((prevExperts) =>
      prevExperts.map((expert) =>
        expert.id === consultantId
          ? {
              ...expert,
              subscription: { ...expert.subscription, status: "cancelled" },
            }
          : expert,
      ),
    );
  };

  const hasNewNotifications = notifications.length > 0;
  const hasNewMessages = experts.some((expert) => expert.hasNewMessage);

  const upcomingConsultations = experts
    .flatMap((expert) =>
      expert.subscription.upcomingSessions.map((session) => ({
        ...session,
        expertName: expert.name,
        expertId: expert.id,
        expertImage: expert.image,
        expertSpecialty: expert.specialty,
      })),
    )
    .sort(
      (a, b) =>
        new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time),
    );

  const navigate = useNavigate();

  const handleExpertDetails = (email) => {
    navigate(`/details/${email}`);
  };

  return (
    // isAuthenticated ? (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.given_name}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your consultations.
          </p>
        </div>

        {upcomingConsultations.length > 0 && (
          <Card className="mb-8 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upcoming Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex overflow-x-auto space-x-4 pb-2">
                {upcomingConsultations
                  .slice(0, 3)
                  .map((consultation, index) => (
                    <UpcomingConsultationsCard
                      index={index}
                      consultation={consultation}
                    />
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="experts" className="space-y-8">
          <TabsList className="bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger
              value="experts"
              className="data-[state=active]:bg-indigo-100"
            >
              Find Experts
            </TabsTrigger>
            <TabsTrigger
              value="consultants"
              className="relative data-[state=active]:bg-indigo-100"
            >
              My Consultants
              {hasNewMessages && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              )}
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-indigo-100"
            >
              My Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="relative data-[state=active]:bg-indigo-100"
            >
              Notifications
              {hasNewNotifications && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="experts">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Find Experts</CardTitle>
                <CardDescription>
                  Browse and connect with our expert consultants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 space-y-4">
                  <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                    <div className="flex-grow">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="search"
                          placeholder="Search experts..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 w-full"
                        />
                      </div>
                    </div>
                    <Select
                      onValueChange={(value) =>
                        handleFilterChange("language", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Languages</SelectItem>
                        {["English", "Spanish", "French", "Mandarin"].map(
                          (lang) => (
                            <SelectItem key={lang} value={lang}>
                              {lang}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={(value) =>
                        handleFilterChange("country", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        {["USA", "Canada", "Australia", "UK"].map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={(value) =>
                        handleFilterChange("specialty", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Specialties</SelectItem>
                        {[
                          "Psychologist",
                          "Nutritionist",
                          "Physical Trainer",
                        ].map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={handleSearch}
                    disabled={Loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    {Loading ? "Searching..." : "Search Experts"}
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {expert.map((expert) => (
                    <Card
                      key={expert.firstName}
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <Avatar className="h-16 w-16 mr-4">
                            <AvatarImage
                              src={expert.image}
                              alt={expert.firstName}
                            />
                            <AvatarFallback>
                              {expert.firstName[0]}
                              {expert.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {expert.firstName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {expert.expertType}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center mb-2">
                          <Star className="h-5 w-5 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">
                            {/* {expert.rating} */}5
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mb-4">
                          <Badge variant="secondary">{expert.languages}</Badge>
                          <Badge variant="outline">{expert.country}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {expert.qualification}
                        </p>
                        <Button
                          className="w-full"
                          onClick={() => handleExpertDetails(expert.email)}
                        >
                          View Profile
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  {experts.map((expert) => (
                    <ExpertCard
                      key={expert.name}
                      expert={expert}
                      handleExpertClick={handleExpertClick}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultants">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">My Consultants</CardTitle>
                <CardDescription>
                  View and manage your consultants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {experts.map((consultant) => (
                    <MyConsultant
                      consultant={consultant}
                      setShowSubscriptionDetails={setShowSubscriptionDetails}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">My Profile</CardTitle>
                <CardDescription>
                  View and edit your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src="/placeholder.svg?height=96&width=96"
                        alt={`${user?.given_name} ${user?.family_name}`}
                      />
                      <AvatarFallback>
                        {user?.given_name[0]}
                        {user?.family_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button>Change Avatar</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        value={user?.given_name}
                        onChange={(e) =>
                          handleProfileChange("firstName", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        value={user?.family_name}
                        onChange={(e) =>
                          handleProfileChange("lastName", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={client.email}
                        onChange={(e) =>
                          handleProfileChange("email", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={client.phone}
                        onChange={(e) =>
                          handleProfileChange("phone", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <Button className="w-full md:w-auto">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>
                  Stay updated with your latest activities and reminders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <Notification notification={notification} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog
        open={showSubscriptionDetails}
        onOpenChange={setShowSubscriptionDetails}
      >
        <SubscriptionDetails
          selectedExpert={selectedExpert}
          handleCancelSubscription={handleCancelSubscription}
        />
      </Dialog>

      <Dialog open={isVideoCallActive} onOpenChange={setIsVideoCallActive}>
        <DialogContent className="sm:max-w-[900px] h-[80vh] p-0">
          <div className="relative h-full bg-gray-900 rounded-lg overflow-hidden">
            <video className="w-full h-full object-cover" autoPlay muted loop>
              <source src="/placeholder-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleEndVideoCall}
              >
                End Call
              </Button>
              <div className="flex space-x-2">
                <Button variant="secondary" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showExpertDetails} onOpenChange={setShowExpertDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>1Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={selectedExpert?.image}
                  alt={selectedExpert?.name}
                />
                <AvatarFallback>{selectedExpert?.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">
                  {selectedExpert?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedExpert?.specialty}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold">Qualifications</h4>
              <p>{selectedExpert?.qualification}</p>
            </div>
            <div>
              <h4 className="font-semibold">Experience</h4>
              <p>{selectedExpert?.experience}</p>
            </div>
            <div>
              <h4 className="font-semibold">Bio</h4>
              <p>{selectedExpert?.bio}</p>
            </div>
            <div>
              <h4 className="font-semibold">Languages</h4>
              <p>{selectedExpert?.language}</p>
            </div>
            <div>
              <h4 className="font-semibold">Rating</h4>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span>{selectedExpert?.rating}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowExpertDetails(false)}>Close</Button>
            <Button
              onClick={() => {
                /* Logic to book a consultation */
              }}
            >
              Book Consultation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    // ) : loginWithRedirect()
  );
}
