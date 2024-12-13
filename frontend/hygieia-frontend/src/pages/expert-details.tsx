"use client";

import NavBar from "@/components/navbar";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Star,
  StarIcon,
  Book,
  DollarSign,
  MapPinIcon,
  BookOpenIcon,
  BriefcaseIcon,
  GlobeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "../config/axios";
import { useParams } from "react-router-dom";

export default function ExpertDetails() {
  const { id } = useParams();
  const expert = {
    id: 1,
    name: "Dr. Emily Johnson",
    specialty: "Cognitive Behavioral Therapy",
    rating: 4.9,
    image: "/placeholder.svg?height=400&width=400",
    bio: "Dr. Emily Johnson is a licensed clinical psychologist with over 15 years of experience specializing in Cognitive Behavioral Therapy. She has helped numerous clients overcome anxiety, depression, and stress-related issues. Dr. Johnson is known for her compassionate approach and evidence-based techniques.",
    country: "United States",
    languages: ["English", "French", "Spanish"],
    qualification: "Ph.D. in Clinical Psychology, Harvard University",
    experience: "15+ years in private practice",
    certifications: [
      "Board Certified in Cognitive Behavioral Therapy",
      "Certified in EMDR Therapy",
      "Mindfulness-Based Stress Reduction (MBSR) Certified Teacher",
    ],
    packages: [
      {
        name: "Diamond Package",
        sessions: 8,
        price: 1200,
        description: "Comprehensive therapy program with premium features",
        features: [
          "8 one-hour therapy sessions",
          "24/7 emergency support",
          "Personalized treatment plan",
          "Weekly progress reports",
        ],
      },
      {
        name: "Gold Package",
        sessions: 6,
        price: 800,
        description: "Intensive therapy program for significant progress",
        features: [
          "6 one-hour therapy sessions",
          "Email support between sessions",
          "Customized homework assignments",
          "Monthly progress evaluation",
        ],
      },
      {
        name: "Silver Package",
        sessions: 4,
        price: 500,
        description: "Standard therapy program for steady improvement",
        features: [
          "4 one-hour therapy sessions",
          "Email support (response within 48 hours)",
          "Basic treatment plan",
          "End-of-program progress report",
        ],
      },
      {
        name: "Single Session",
        sessions: 1,
        price: 150,
        description: "One-time consultation or follow-up session",
        features: [
          "1 one-hour therapy session",
          "Session summary and recommendations",
          "Option to book follow-up sessions",
        ],
      },
    ],
    feedback: [
      {
        id: 1,
        user: "Sarah M.",
        rating: 5,
        comment:
          "Dr. Johnson has been instrumental in helping me manage my anxiety. Her techniques are practical and effective.",
        date: "2023-06-15",
      },
      {
        id: 2,
        user: "Michael K.",
        rating: 5,
        comment:
          "I've seen significant improvement in my depression symptoms thanks to Dr. Johnson's guidance. Highly recommended!",
        date: "2023-07-02",
      },
      {
        id: 3,
        user: "Lisa R.",
        rating: 4,
        comment:
          "Dr. Johnson is very professional and knowledgeable. Her CBT approach has given me valuable tools to cope with stress.",
        date: "2023-07-20",
      },
    ],
  };

  const { isLoading, getAccessTokenSilently, isAuthenticated, user } =
    useAuth0();
  const [expertData, setExpertData] = useState({});
  const [packages, setPackages] = useState([]);

  const getData = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.get("http://localhost:3000/expert", {
      params: {
        id: id,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setExpertData(response.data);

    const packageData = await axios.get(`http://localhost:3001/package/${id}`, {
      params: {
        id: user?.email,
      },
    });

    setPackages(packageData.data);
    console.log(user.email);
  };

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) {
      getData();
    }
  }, [isLoading, isAuthenticated, setPackages]);

  const handleSubscribe = async (pkg) => {
    const booking = {
      expertId: id,
      expertType: expertData.expertType,
      clientId: user.email,
      packageName: pkg.packageName,
    };

    await axios
      .post("http://localhost:3002/subscripton", booking)
      .then((response) => {
        if (response.data.status == "OK") window.alert("Subscribed");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Expert Details
          </h1>
          <p className="text-gray-600">Get to know your experts well.</p>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={expertData?.image} alt={expertData.name} />
                <AvatarFallback>{expert.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">
                  {expertData.firstName} {expertData.lastName}
                </CardTitle>
                <p className="text-gray-500">{expert.specialty}</p>
                <div className="flex items-center mt-2">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="font-medium">5</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-10">
              <h3 className="text-lg font-semibold mb-2">Expert Information</h3>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Bio</h3>
                  <p>{expertData.bio}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                  <span>{expertData.country}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GlobeIcon className="h-5 w-5 text-gray-400" />
                  <div className="flex flex-wrap gap-2">
                    {/* {expertData.languages.map((lang, index) => (
                      <Badge key={index} variant="secondary">
                        {lang}
                      </Badge>
                    ))} */}
                    {expertData.languages}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpenIcon className="h-5 w-5 text-gray-400" />
                  <span>{expertData.qualification}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                  <span>{expertData.workExp}+ years of work experience.</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Certifications</h3>
                  <ul className="list-disc list-inside">
                    {expertData.certification
                      ? expertData.certification.map((cert, index) => (
                          <li key={index} className="text-gray-600">
                            {cert}
                          </li>
                        ))
                      : "Pshychology HON"}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-6 mb-10">
              <h3 className="text-lg font-semibold mb-2">Packages</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {packages.map((pkg, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {pkg.packageName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <Book className="inline h-4 w-4 mr-1" /> {pkg.sessions}{" "}
                        sessions
                      </p>
                      <p>
                        <DollarSign className="inline h-4 w-4 mr-1" /> Rs.{" "}
                        {pkg.price}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {pkg.description}
                      </p>
                      <Button
                        className="w-full mt-4"
                        onClick={() => handleSubscribe(pkg)}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                Past Consultation Feedbacks
              </h3>
              <div className="space-y-4">
                {expert.feedback.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{item.user}</span>
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                          <span>{item.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{item.comment}</p>
                      <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <Button className="mt-6 w-full">Book Consultation</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
