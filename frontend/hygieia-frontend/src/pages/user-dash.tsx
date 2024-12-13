'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Calendar, Bell, User, Search, Star, Clock, MessageSquare, Filter, Mail, Phone, Video, Send, Award, Book, DollarSign, CreditCard, XCircle, Paperclip, FileText, ChevronRight, Menu } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

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
      features: ["Unlimited messaging", "4 video sessions per month", "Priority support"],
      sessionsCompleted: 2,
      totalSessions: 4,
      upcomingSessions: [
        { date: "2024-03-20", time: "14:00" },
        { date: "2024-03-27", time: "15:30" }
      ],
      completedSessions: [
        { date: "2024-03-06", time: "14:00", brief: "Discussed anxiety management techniques" },
        { date: "2024-03-13", time: "15:30", brief: "Explored childhood experiences and their impact" }
      ],
      invoices: [
        { id: "INV-001", date: "2024-03-01", amount: 99.99, status: "Paid" },
        { id: "INV-002", date: "2024-04-01", amount: 99.99, status: "Pending" }
      ],
      paymentMethod: {
        type: "Credit Card",
        last4: "4242",
        expiryDate: "12/25"
      }
    }
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
      features: ["Weekly messaging", "2 video sessions per month", "Email support"],
      sessionsCompleted: 1,
      totalSessions: 2,
      upcomingSessions: [
        { date: "2024-03-22", time: "10:00" }
      ],
      completedSessions: [
        { date: "2024-03-08", time: "10:00", brief: "Developed a personalized meal plan" }
      ],
      invoices: [
        { id: "INV-003", date: "2024-03-01", amount: 79.99, status: "Paid" }
      ],
      paymentMethod: {
        type: "PayPal",
        email: "m.johnson@email.com"
      }
    }
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
      features: ["Bi-weekly messaging", "1 video session per month", "Community forum access"],
      sessionsCompleted: 0,
      totalSessions: 1,
      upcomingSessions: [
        { date: "2024-03-25", time: "18:00" }
      ],
      completedSessions: [],
      invoices: [
        { id: "INV-004", date: "2024-03-01", amount: 59.99, status: "Paid" }
      ],
      paymentMethod: {
        type: "Credit Card",
        last4: "1234",
        expiryDate: "03/26"
      }
    }
  }
]

// Mock data for notifications
const initialNotifications = [
  { id: 1, message: "Your consultation with Dr. Jane Smith is in 1 hour", type: "reminder" },
  { id: 2, message: "New message from Dr. Michael Johnson", type: "message" },
  { id: 3, message: "Your consultation with Sarah Lee has been rescheduled", type: "alert" },
]

export default function UserDash() {
  const [selectedExpert, setSelectedExpert] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    language: "all",
    country: "all",
    specialty: "all"
  })
  const [experts, setExperts] = useState(initialExperts)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [isLoading, setIsLoading] = useState(false)
  const [userProfile, setUserProfile] = useState({
    firstName: "Dhanraj",
    lastName: "Patil",
    email: "dhanraj@example.com",
    phone: "+911234567890"
  })
  const [newMessage, setNewMessage] = useState("")
  const [isVideoCallActive, setIsVideoCallActive] = useState(false)
  const [selectedConsultant, setSelectedConsultant] = useState(null)
  const [attachedMedia, setAttachedMedia] = useState(null)
  const [showSubscriptionDetails, setShowSubscriptionDetails] = useState(false)
  const [showExpertDetails, setShowExpertDetails] = useState(false)

  const handleExpertClick = (expert) => {
    setSelectedExpert(expert)
    setShowExpertDetails(true)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }))
  }

  const handleSearch = async () => {
    setIsLoading(true)
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const filteredExperts = initialExperts.filter(expert => 
      (expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       expert.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filters.language === "all" || expert.language.includes(filters.language)) &&
      (filters.country === "all" || expert.country === filters.country) &&
      (filters.specialty === "all" || expert.specialty === filters.specialty)
    )
    setExperts(filteredExperts)
    setIsLoading(false)
  }

  const handleProfileChange = (field, value) => {
    setUserProfile(prevProfile => ({
      ...prevProfile,
      [field]: value
    }))
  }

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" || attachedMedia) {
      // In a real application, you would send this message and media to the backend
      console.log("Sending message:", newMessage)
      console.log("Attached media:", attachedMedia)
      setNewMessage("")
      setAttachedMedia(null)
    }
  }

  const handleStartVideoCall = () => {
    setIsVideoCallActive(true)
  }

  const handleEndVideoCall = () => {
    setIsVideoCallActive(false)
  }

  const handleConsultantClick = (consultant) => {
    setSelectedConsultant(consultant)
  }

  const handleCancelSubscription = (consultantId) => {
    // In a real application, you would send a request to the backend to cancel the subscription
    console.log("Cancelling subscription for consultant:", consultantId)
    // Update the local state to reflect the cancellation
    setExperts(prevExperts => prevExperts.map(expert => 
      expert.id === consultantId 
        ? { ...expert, subscription: { ...expert.subscription, status: 'cancelled' } }
        : expert
    ))
  }

  const handleAttachMedia = (event) => {
    const file = event.target.files[0]
    if (file) {
      setAttachedMedia(file)
    }
  }

  const hasNewNotifications = notifications.length > 0
  const hasNewMessages = experts.some(expert => expert.hasNewMessage)

  const upcomingConsultations = experts.flatMap(expert => 
    expert.subscription.upcomingSessions.map(session => ({
      ...session,
      expertName: expert.name,
      expertId: expert.id,
      expertImage: expert.image,
      expertSpecialty: expert.specialty
    }))
  ).sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time))

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-indigo-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">ConsultEase</span>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Dashboard</Button>
            <Button variant="ghost">Find Experts</Button>
            <Button variant="ghost">My Consultants</Button>
            <Button variant="ghost">Profile</Button>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {hasNewNotifications && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              )}
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
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
                  <SheetDescription>
                    Navigate through ConsultEase
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-2">
                  <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                  <Button variant="ghost" className="w-full justify-start">Find Experts</Button>
                  <Button variant="ghost" className="w-full justify-start">My Consultants</Button>
                  <Button variant="ghost" className="w-full justify-start">Profile</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userProfile.firstName}!</h1>
          <p className="text-gray-600">Here's what's happening with your consultations.</p>
        </div>

        {upcomingConsultations.length > 0 && (
          <Card className="mb-8 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upcoming Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex overflow-x-auto space-x-4 pb-2">
                {upcomingConsultations.slice(0, 3).map((consultation, index) => (
                  <div key={index} className="flex-none w-64 bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center mb-2">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={consultation.expertImage} alt={consultation.expertName} />
                        <AvatarFallback>{consultation.expertName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{consultation.expertName}</p>
                        <p className="text-xs text-gray-500">{consultation.expertSpecialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>{consultation.date} at {consultation.time}</span>
                      <Button size="sm" variant="outline">Join</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="experts" className="space-y-8">
          <TabsList className="bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="experts" className="data-[state=active]:bg-indigo-100">Find Experts</TabsTrigger>
            <TabsTrigger value="consultants" className="relative data-[state=active]:bg-indigo-100">
              My Consultants
              {hasNewMessages && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              )}
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-indigo-100">My Profile</TabsTrigger>
            <TabsTrigger value="notifications" className="relative data-[state=active]:bg-indigo-100">
              Notifications
              {hasNewNotifications && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="experts">
            <Card>
              <CardHeader>
                <CardTitle>Find Experts</CardTitle>
                <CardDescription>Browse and connect with our expert consultants</CardDescription>
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
                    <Select onValueChange={(value) => handleFilterChange("language", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Languages</SelectItem>
                        {["English", "Spanish", "French", "Mandarin"].map(lang => (
                          <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => handleFilterChange("country", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        {["USA", "Canada", "Australia", "UK"].map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => handleFilterChange("specialty", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Specialties</SelectItem>
                        {["Psychologist", "Nutritionist", "Physical Trainer"].map(specialty => (
                          <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSearch} disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700">
                    {isLoading ? "Searching..." : "Search Experts"}
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {experts.map((expert) => (
                    <Card key={expert.id} className="cursor-pointer hover:shadow-lg transition-shadow">
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
                        <Button className="w-full" onClick={() => handleExpertClick(expert)}>View Profile</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultants">
            <Card>
              <CardHeader>
                <CardTitle>My Consultants</CardTitle>
                <CardDescription>View and manage your consultants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {experts.map((consultant) => (
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
                              <Button variant="outline" size="sm">Contact</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[900px] h-[80vh] flex flex-col p-0">
                        <div className="flex h-full">
                          <div className="w-1/3 border-r overflow-y-auto">
                            <DialogHeader className="p-6 border-b">
                              <DialogTitle>{consultant.name}</DialogTitle>
                              <DialogDescription>
                                {consultant.specialty}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="p-6">
                              <h4 className="font-semibold mb-2">Upcoming Consultations</h4>
                              <ul className="space-y-2">
                                {consultant.subscription.upcomingSessions.map((session, index) => (
                                  <li key={index} className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                                    <span>{session.date} at {session.time}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <Separator />
                            <div className="p-6">
                              <h4 className="font-semibold mb-2">Subscription Details</h4>
                              <p>Plan: {consultant.subscription.plan}</p>
                              <p>Price: ${consultant.subscription.price} / {consultant.subscription.billingCycle}</p>
                              <Progress 
                                value={(consultant.subscription.sessionsCompleted / consultant.subscription.totalSessions) * 100} 
                                className="mt-2" 
                              />
                              <p className="text-sm text-gray-500 mt-1">
                                {consultant.subscription.sessionsCompleted} of {consultant.subscription.totalSessions} sessions completed
                              </p>
                              <Button variant="outline" className="mt-4 w-full" onClick={() => setShowSubscriptionDetails(true)}>
                                <CreditCard className="h-4 w-4 mr-2" />
                                View Full Details
                              </Button>
                            </div>
                          </div>
                          <div className="w-2/3 flex flex-col">
                            <div className="flex-grow overflow-y-auto p-6 space-y-4">
                              {/* Chat messages would go here */}
                              <div className="bg-indigo-100 p-4 rounded-lg max-w-[70%]">
                                <p className="text-sm">Hello! How can I help you today?</p>
                              </div>
                              <div className="bg-white p-4 rounded-lg max-w-[70%] ml-auto">
                                <p className="text-sm">Hi, I have a question about our last session.</p>
                              </div>
                            </div>
                            <div className="border-t p-6">
                              <div className="flex space-x-2">
                                <Input
                                  type="text"
                                  placeholder="Type your message..."
                                  value={newMessage}
                                  onChange={(e) => setNewMessage(e.target.value)}
                                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>View and edit your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt={`${userProfile.firstName} ${userProfile.lastName}`} />
                      <AvatarFallback>{userProfile.firstName[0]}{userProfile.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <Button>Change Avatar</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <Input
                        id="firstName"
                        value={userProfile.firstName}
                        onChange={(e) => handleProfileChange('firstName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <Input
                        id="lastName"
                        value={userProfile.lastName}
                        onChange={(e) => handleProfileChange('lastName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input
                        id="email"
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <Input
                        id="phone"
                        type="tel"
                        value={userProfile.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
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
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Stay updated with your latest activities and reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <Card key={notification.id}>
                      <CardContent className="flex items-center p-4">
                        {notification.type === 'reminder' && <Clock className="h-5 w-5 text-blue-500 mr-4" />}
                        {notification.type === 'message' && <MessageSquare className="h-5 w-5 text-green-500 mr-4" />}
                        {notification.type === 'alert' && <Bell className="h-5 w-5 text-red-500 mr-4" />}
                        <p>{notification.message}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showSubscriptionDetails} onOpenChange={setShowSubscriptionDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Subscription Details</DialogTitle>
            <DialogDescription>
              Detailed information about your current subscription
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Plan Details</h4>
              <p>Plan: {selectedExpert?.subscription.plan}</p>
              <p>Price: ${selectedExpert?.subscription.price} / {selectedExpert?.subscription.billingCycle}</p>
              <p>Sessions: {selectedExpert?.subscription.sessionsCompleted} of {selectedExpert?.subscription.totalSessions} completed</p>
            </div>
            <div>
              <h4 className="font-semibold">Features</h4>
              <ul className="list-disc list-inside">
                {selectedExpert?.subscription.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Payment Method</h4>
              <p>Type: {selectedExpert?.subscription.paymentMethod.type}</p>
              <p>Card ending in: {selectedExpert?.subscription.paymentMethod.last4}</p>
              <p>Expiry: {selectedExpert?.subscription.paymentMethod.expiryDate}</p>
            </div>
            <div>
              <h4 className="font-semibold">Invoices</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedExpert?.subscription.invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>${invoice.amount}</TableCell>
                      <TableCell>{invoice.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <h4 className="font-semibold">Completed Sessions</h4>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {selectedExpert?.subscription.completedSessions.map((session, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium">{session.date} at {session.time}</p>
                    <p className="text-sm text-gray-500">{session.brief}</p>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleCancelSubscription(selectedExpert?.id)}>
              <XCircle className="h-4 w-4 mr-2" />
              Cancel Subscription
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Download Invoices
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isVideoCallActive} onOpenChange={setIsVideoCallActive}>
        <DialogContent className="sm:max-w-[900px] h-[80vh] p-0">
          <div className="relative h-full bg-gray-900 rounded-lg overflow-hidden">
            <video className="w-full h-full object-cover" autoPlay muted loop>
              <source src="/placeholder-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <Button variant="secondary" size="sm" onClick={handleEndVideoCall}>
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
            <DialogTitle>Expert Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={selectedExpert?.image} alt={selectedExpert?.name} />
                <AvatarFallback>{selectedExpert?.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{selectedExpert?.name}</h3>
                <p className="text-sm text-gray-500">{selectedExpert?.specialty}</p>
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
            <Button onClick={() => {/* Logic to book a consultation */}}>Book Consultation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}