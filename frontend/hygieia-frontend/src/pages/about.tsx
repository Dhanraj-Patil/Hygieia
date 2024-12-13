import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarIcon, MapPinIcon, GlobeIcon, BookOpenIcon, BriefcaseIcon, CheckCircleIcon } from "lucide-react"

interface Expert {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  bio: string;
  country: string;
  languages: string[];
  qualification: string;
  experience: string;
  certifications: string[];
  packages: {
    name: string;
    price: number;
    description: string;
    features: string[];
  }[];
  feedback: {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

const dummyExpert: Expert = {
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
    "Mindfulness-Based Stress Reduction (MBSR) Certified Teacher"
  ],
  packages: [
    {
      name: "Diamond Package",
      price: 1200,
      description: "Comprehensive therapy program with premium features",
      features: [
        "8 one-hour therapy sessions",
        "24/7 emergency support",
        "Personalized treatment plan",
        "Weekly progress reports"
      ]
    },
    {
      name: "Gold Package",
      price: 800,
      description: "Intensive therapy program for significant progress",
      features: [
        "6 one-hour therapy sessions",
        "Email support between sessions",
        "Customized homework assignments",
        "Monthly progress evaluation"
      ]
    },
    {
      name: "Silver Package",
      price: 500,
      description: "Standard therapy program for steady improvement",
      features: [
        "4 one-hour therapy sessions",
        "Email support (response within 48 hours)",
        "Basic treatment plan",
        "End-of-program progress report"
      ]
    },
    {
      name: "Single Session",
      price: 150,
      description: "One-time consultation or follow-up session",
      features: [
        "1 one-hour therapy session",
        "Session summary and recommendations",
        "Option to book follow-up sessions"
      ]
    }
  ],
  feedback: [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      comment: "Dr. Johnson has been instrumental in helping me manage my anxiety. Her techniques are practical and effective.",
      date: "2023-06-15"
    },
    {
      id: 2,
      user: "Michael K.",
      rating: 5,
      comment: "I've seen significant improvement in my depression symptoms thanks to Dr. Johnson's guidance. Highly recommended!",
      date: "2023-07-02"
    },
    {
      id: 3,
      user: "Lisa R.",
      rating: 4,
      comment: "Dr. Johnson is very professional and knowledgeable. Her CBT approach has given me valuable tools to cope with stress.",
      date: "2023-07-20"
    }
  ]
};

export default function About() {
  const [selectedPackage, setSelectedPackage] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={dummyExpert.image} alt={dummyExpert.name} />
                <AvatarFallback>{dummyExpert.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{dummyExpert.name}</CardTitle>
                <p className="text-gray-500">{dummyExpert.specialty}</p>
                <div className="flex items-center mt-2">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="font-medium">{dummyExpert.rating}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="about" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="packages">Packages</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Bio</h3>
                    <p>{dummyExpert.bio}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                    <span>{dummyExpert.country}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GlobeIcon className="h-5 w-5 text-gray-400" />
                    <div className="flex flex-wrap gap-2">
                      {dummyExpert.languages.map((lang, index) => (
                        <Badge key={index} variant="secondary">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpenIcon className="h-5 w-5 text-gray-400" />
                    <span>{dummyExpert.qualification}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                    <span>{dummyExpert.experience}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Certifications</h3>
                    <ul className="list-disc list-inside">
                      {dummyExpert.certifications.map((cert, index) => (
                        <li key={index} className="text-gray-600">{cert}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="packages">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dummyExpert.packages.map((pkg, index) => (
                    <Card key={index} className={`cursor-pointer transition-all ${selectedPackage === pkg.name ? 'ring-2 ring-primary' : ''}`} onClick={() => setSelectedPackage(pkg.name)}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{pkg.name}</h3>
                        <p className="text-2xl font-bold mb-2">${pkg.price}</p>
                        <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                        <ul className="space-y-2">
                          {pkg.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button className="w-full mt-6" disabled={!selectedPackage}>Book {selectedPackage || 'Consultation'}</Button>
              </TabsContent>
              <TabsContent value="feedback">
                <div className="space-y-4">
                  {dummyExpert.feedback.map((item) => (
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
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}