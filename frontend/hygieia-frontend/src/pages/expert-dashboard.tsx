"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MessageCircle,
  Package,
  Settings,
  Star,
  Users,
  Send,
  Paperclip,
  Bell,
  Check,
  X,
} from "lucide-react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "../config/axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:3003", {
  withCredentials: false,
});

export function ExpertDashboard() {
  const { user, logout, isLoading, getAccessTokenSilently, isAuthenticated } =
    useAuth0();
  const [expert, setExpert] = useState({});
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [packages, setPackages] = useState([
    {
      name: "Diamond",
      sessions: 10,
      price: 1000,
      description: "Comprehensive therapy package",
    },
    {
      name: "Gold",
      sessions: 5,
      price: 600,
      description: "Intensive therapy package",
    },
    {
      name: "Silver",
      sessions: 3,
      price: 400,
      description: "Starter therapy package",
    },
    {
      name: "Single Session",
      sessions: 1,
      price: 150,
      description: "One-time consultation",
    },
  ]);

  const [expertPackages, setExpertPackages] = useState([]);

  const getData = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.get("http://localhost:3000/expert", {
      params: {
        id: user?.email,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setExpert(response.data);

    const packageData = await axios.get(
      `http://localhost:3001/package/${user.email}`,
      {
        params: {
          id: user?.email,
        },
      },
    );
    setExpertPackages(packageData.data);
  };

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      getData();
      setNewPackage({
        ...newPackage,
        expertId: user.email,
      });
    }
  }, [isLoading, isAuthenticated]);

  const [activeClients] = useState([
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
    "Charlie Davis",
  ]);

  const [newPackage, setNewPackage] = useState({
    expertId: user?.email,
    packageName: "",
    sessions: 0,
    price: 0,
    description: "",
  });
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{
    [key: string]: Array<{
      sender: string;
      message: string;
      timestamp: string;
      attachment?: string;
    }>;
  }>({
    "John Doe": [
      {
        sender: "John Doe",
        message: "Hello, I have a question about my upcoming session.",
        timestamp: "10:30 AM",
      },
      {
        sender: "Expert",
        message: "Of course, how can I help you?",
        timestamp: "10:32 AM",
      },
    ],
    "Jane Smith": [
      {
        sender: "Jane Smith",
        message: "I need to reschedule my appointment.",
        timestamp: "2:15 PM",
      },
      {
        sender: "Expert",
        message: "Sure, let me check my availability. When would you prefer?",
        timestamp: "2:18 PM",
      },
    ],
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const fileInputRef = useRef(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "new_booking",
      message: "New booking request from John Doe",
      read: false,
      appointment: {
        id: 1,
        client: "John Doe",
        date: "2023-06-20",
        time: "10:00 AM",
        type: "Video Call",
      },
    },
    {
      id: 2,
      type: "upcoming",
      message: "Consultation with Jane Smith in 1 hour",
      read: false,
    },
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      client: "John Doe",
      date: "2023-06-15",
      time: "10:00 AM",
      type: "Video Call",
      status: "Confirmed",
    },
    {
      id: 2,
      client: "Jane Smith",
      date: "2023-06-15",
      time: "2:00 PM",
      type: "Audio Call",
      status: "Confirmed",
    },
    {
      id: 3,
      client: "Alice Johnson",
      date: "2023-06-16",
      time: "11:00 AM",
      type: "Video Call",
      status: "Pending",
    },
    {
      id: 4,
      client: "Bob Brown",
      date: "2023-06-17",
      time: "3:00 PM",
      type: "Video Call",
      status: "Confirmed",
    },
    {
      id: 5,
      client: "Charlie Davis",
      date: "2023-06-18",
      time: "9:00 AM",
      type: "Audio Call",
      status: "Pending",
    },
    {
      id: 6,
      client: "Eva Wilson",
      date: "2023-06-20",
      time: "1:00 PM",
      type: "In-Person",
      status: "Confirmed",
    },
    {
      id: 7,
      client: "Frank Miller",
      date: "2023-06-22",
      time: "11:30 AM",
      type: "Video Call",
      status: "Confirmed",
    },
    {
      id: 8,
      client: "Grace Lee",
      date: "2023-06-25",
      time: "4:00 PM",
      type: "Audio Call",
      status: "Pending",
    },
    {
      id: 9,
      client: "Henry Taylor",
      date: "2023-06-28",
      time: "10:00 AM",
      type: "Video Call",
      status: "Confirmed",
    },
    {
      id: 10,
      client: "Ivy Chen",
      date: "2023-06-30",
      time: "2:30 PM",
      type: "In-Person",
      status: "Pending",
    },
  ]);
  const [filteredAppointments, setFilteredAppointments] =
    useState(appointments);
  const [itemsPerPage] = useState(5);

  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      client: "John Doe",
      package: "Gold",
      sessionsLeft: 3,
      startDate: "2023-06-01",
      endDate: "2023-08-31",
    },
    {
      id: 2,
      client: "Jane Smith",
      package: "Silver",
      sessionsLeft: 2,
      startDate: "2023-06-10",
      endDate: "2023-07-31",
    },
  ]);
  const [newAppointment, setNewAppointment] = useState({
    client: "",
    date: "",
    time: "",
    type: "",
  });

  const handleAddPackage = async () => {
    await axios
      .post(`http://localhost:3001/package`, newPackage)
      .then((response) => {
        if (response.data.status == "OK") {
          setPackages([...packages, newPackage]);
          setNewPackage({
            expertId: user.email,
            packageName: "",
            sessions: 0,
            price: 0,
            description: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file && selectedClient) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const newMessage = {
          sender: "Expert",
          message: `Sent an attachment: ${file.name}`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          attachment: e.target.result as string,
        };

        setChatHistory((prev) => ({
          ...prev,
          [selectedClient]: [...(prev[selectedClient] || []), newMessage],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif,
      ),
    );
  };

  const handleBookingResponse = (notificationId: number, accepted: boolean) => {
    const notification = notifications.find((n) => n.id === notificationId);
    if (notification && notification.type === "new_booking") {
      if (accepted) {
        setAppointments([
          ...appointments,
          { ...notification.appointment, status: "Confirmed" },
        ]);
      }
      setNotifications(notifications.filter((n) => n.id !== notificationId));
    }
  };

  const handleAddAppointment = () => {
    // Check for clashing appointments
    const clash = appointments.find(
      (app) =>
        app.date === newAppointment.date && app.time === newAppointment.time,
    );
    if (clash) {
      alert(
        "This time slot is already booked. Please choose a different time.",
      );
      return;
    }

    const newId = Math.max(...appointments.map((a) => a.id)) + 1;
    setAppointments([
      ...appointments,
      { ...newAppointment, id: newId, status: "Confirmed" },
    ]);
    setNewAppointment({ client: "", date: "", time: "", type: "" });
  };

  const handleEditAppointment = (appointment) => {
    setAppointments(
      appointments.map((a) => (a.id === appointment.id ? appointment : a)),
    );
    setSelectedAppointment(null);
  };

  const getWeekAppointments = () => {
    const startDate = startOfWeek(date || new Date());
    return Array.from({ length: 7 }, (_, i) => {
      const day = addDays(startDate, i);
      return {
        date: day,
        appointments: appointments.filter((appt) =>
          isSameDay(new Date(appt.date), day),
        ),
      };
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    filterAppointments(newAppointment.date);
    // Simulating a new booking notification
    const timer = setTimeout(() => {
      setNotifications((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "new_booking",
          message: "New booking request from Alice Johnson",
          read: false,
          appointment: {
            id: 4,
            client: "Alice Johnson",
            date: "2023-06-21",
            time: "3:00 PM",
            type: "Video Call",
          },
        },
      ]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [newAppointment.date, appointments]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAppointments.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const filterAppointments = (selectedDate) => {
    let filtered = appointments;
    if (selectedDate) {
      filtered = appointments.filter((app) => app.date === selectedDate);
    }
    filtered.sort((a, b) => {
      if (a.date !== b.date) {
        return new Date(a.date) - new Date(b.date);
      }
      return a.time.localeCompare(b.time);
    });
    setFilteredAppointments(filtered);
    setCurrentPage(1);
  };

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
  // return () => socket.disconnect();
  //
  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      socket.emit("message", { user: "Expert", text: chatMessage });
      setChat((prev) => [...prev, { user: "You", text: chatMessage }]);
      setChatMessage("");
    }
  };

  const handleJoin = () => {
    window.location.href = "https://meet.google.com/bmm-nqbo-tbd";
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {notifications.some((n) => !n.read) && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                )}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Notifications</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[300px]">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 ${notif.read ? "opacity-50" : ""}`}
                  >
                    <p>{notif.message}</p>
                    {notif.type === "new_booking" && (
                      <div className="mt-2 flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleBookingResponse(notif.id, true)}
                        >
                          <Check className="mr-2 h-4 w-4" /> Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleBookingResponse(notif.id, false)}
                        >
                          <X className="mr-2 h-4 w-4" /> Reject
                        </Button>
                      </div>
                    )}
                    {!notif.read && (
                      <Button
                        variant="link"
                        onClick={() => markNotificationAsRead(notif.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </DialogContent>
          </Dialog>
          <Avatar>
            <AvatarImage
              alt={`${user?.given_name} ${user?.family_name}`}
              src="/placeholder.svg"
            />
            <AvatarFallback
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              {user?.given_name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Dr. {user?.given_name}</p>
            <p className="text-xs text-muted-foreground">{expert.expertType}</p>
          </div>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Appointments
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{appointments.length}</div>
                <p className="text-xs text-muted-foreground">
                  {appointments.filter((a) => a.status === "Confirmed").length}{" "}
                  confirmed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Subscriptions
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{subscriptions.length}</div>
                <p className="text-xs text-muted-foreground">
                  Across {subscriptions.length} clients
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Appointments
                </CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    appointments.filter((a) => new Date(a.date) > new Date())
                      .length
                  }
                </div>
                <p className="text-xs text-muted-foreground">Next 7 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Unread Messages
                </CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Object.values(chatHistory).reduce(
                    (acc, messages) =>
                      acc +
                      messages.filter((m) => m.sender !== "Expert").length,
                    0,
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all chats
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {appointments
                    .filter((a) => new Date(a.date) > new Date())
                    .slice(0, 5)
                    .map((appointment, index) => (
                      <div key={index} className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>
                            {appointment.client[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {appointment.client}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.date} at {appointment.time} -{" "}
                            {appointment.type}
                          </p>
                        </div>
                        <div className="ml-auto font-medium">
                          <Badge>{appointment.status}</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Your schedule for the month</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  components={{
                    day: ({ day, date }) => {
                      const appointmentsOnDay = appointments.filter((a) =>
                        isSameDay(new Date(a.date), date),
                      );
                      return (
                        <div className="relative">
                          <div>{format(date, "d")}</div>
                          {appointmentsOnDay.length > 0 && (
                            <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                      );
                    },
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Appointments</CardTitle>
              <CardDescription>
                View, add, and edit your appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Add New Appointment
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      value={newAppointment.client}
                      onValueChange={(value) =>
                        setNewAppointment({ ...newAppointment, client: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Client" />
                      </SelectTrigger>
                      <SelectContent>
                        {activeClients.map((client) => (
                          <SelectItem key={client} value={client}>
                            {client}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) =>
                        setNewAppointment({
                          ...newAppointment,
                          date: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) =>
                        setNewAppointment({
                          ...newAppointment,
                          time: e.target.value,
                        })
                      }
                    />
                    <Select
                      value={newAppointment.type}
                      onValueChange={(value) =>
                        setNewAppointment({ ...newAppointment, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Appointment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Video Call">Video Call</SelectItem>
                        <SelectItem value="Audio Call">Audio Call</SelectItem>
                        <SelectItem value="In-Person">In-Person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="mt-2" onClick={handleAddAppointment}>
                    Add Appointment
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Upcoming Appointments
                  </h3>
                  {/* <Input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  className="mb-4"
                /> */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentItems.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>{appointment.client}</TableCell>
                          <TableCell>{appointment.date}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>{appointment.type}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                appointment.status === "Confirmed"
                                  ? "default"
                                  : "secondary"
                              }
                              onClick={handleJoin}
                            >
                              {appointment.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      variant="outline"
                      size="sm"
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                      Previous
                    </Button>
                    <span>
                      Page {currentPage} of{" "}
                      {Math.ceil(filteredAppointments.length / itemsPerPage)}
                    </span>
                    <Button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(filteredAppointments.length / itemsPerPage)
                      }
                      variant="outline"
                      size="sm"
                    >
                      Next
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="subscriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Subscriptions</CardTitle>
              <CardDescription>
                Manage your clients' subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Sessions Left</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>{sub.client}</TableCell>
                      <TableCell>{sub.package}</TableCell>
                      <TableCell>{sub.sessionsLeft}</TableCell>
                      <TableCell>{sub.startDate}</TableCell>
                      <TableCell>{sub.endDate}</TableCell>
                      <TableCell>
                        <Button size="sm">Manage</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="packages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Packages</CardTitle>
              <CardDescription>
                Manage your consultation packages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expertPackages.map((pkg, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{pkg.packageName}</CardTitle>
                      <CardDescription>{pkg.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Sessions: {pkg.sessions}</p>
                      <p>Price: Rs. {pkg.price}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">Edit</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add New Package</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Package</DialogTitle>
                    <DialogDescription>
                      Create a new consultation package. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newPackage.packageName}
                        onChange={(e) =>
                          setNewPackage({
                            ...newPackage,
                            packageName: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sessions" className="text-right">
                        Sessions
                      </Label>
                      <Input
                        id="sessions"
                        type="number"
                        value={newPackage.sessions}
                        onChange={(e) =>
                          setNewPackage({
                            ...newPackage,
                            sessions: parseInt(e.target.value),
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Price
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        value={newPackage.price}
                        onChange={(e) =>
                          setNewPackage({
                            ...newPackage,
                            price: parseInt(e.target.value),
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newPackage.description}
                        onChange={(e) =>
                          setNewPackage({
                            ...newPackage,
                            description: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddPackage}>
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="chat" className="space-y-4">
          <Card className="flex h-[600px]">
            <div className="w-1/3 border-r">
              <CardHeader>
                <CardTitle>Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  {Object.keys(chatHistory).map((client) => (
                    <div
                      key={client}
                      className={`flex items-center space-x-4 p-4 cursor-pointer ${
                        selectedClient === client ? "bg-secondary" : ""
                      }`}
                      onClick={() => setSelectedClient(client)}
                    >
                      <Avatar>
                        <AvatarFallback>{client[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{client}</p>
                        <p className="text-sm text-muted-foreground">
                          {chatHistory[client][
                            chatHistory[client].length - 1
                          ].message.substring(0, 20)}
                          ...
                        </p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </div>
            <div className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle>{selectedClient || "Select a client"}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <ScrollArea className="h-[400px] pr-4">
                  {selectedClient &&
                    chat.map((msg, index) => (
                      <div
                        key={index}
                        className={`mb-4 ${
                          msg.user === "You" ? "text-right" : "text-left"
                        }`}
                      >
                        <div
                          className={`inline-block p-2 rounded-lg ${
                            msg.user === "You"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          {msg.attachment && (
                            <div className="mt-2">
                              <a
                                href={msg.attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                              >
                                View Attachment
                              </a>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {/* {msg.timestamp} */}
                        </p>
                      </div>
                    ))}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    id="message"
                    placeholder="Type your message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Paperclip className="h-4 w-4" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder={`Dr ${user?.given_name} ${user?.family_name}`}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input
                      id="specialty"
                      placeholder={`${expert.expertType}`}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="languages">Languages</Label>
                    <Select defaultValue="english">
                      <SelectTrigger id="languages">
                        <SelectValue placeholder="Select languages" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
