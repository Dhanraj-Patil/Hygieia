"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Users, Brain, Utensils, Dumbbell } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetStarted = () => {
    setIsModalOpen(true);
  };
  const navigate = useNavigate();

  const handleLogin = () => {
    if (isAuthenticated) {
      navigate("/check");
    } else {
      loginWithRedirect();
    }
  };

  const handleUserTypeSelection = (userType: "expert" | "normal") => {
    // Here you would typically redirect to the appropriate signup page
    console.log(`Redirecting to ${userType} signup page`);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-indigo-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">Hygieia</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Experts
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <Button>Book a Consultation</Button>
        </div>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Expert Consultations,{" "}
            <span className="text-indigo-600">Anytime, Anywhere</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Connect with top psychologists, nutritionists, and physical trainers
            for personalized online consultations tailored to your needs.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleLogin}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto"
            >
              Learn More
            </Button>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-6 w-6 text-indigo-600 mr-2" />
                  Psychological Counseling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get professional support for mental health issues,
                  relationship problems, and personal growth from our
                  experienced psychologists.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Utensils className="h-6 w-6 text-indigo-600 mr-2" />
                  Nutritional Guidance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Receive personalized diet plans and nutrition advice from
                  certified nutritionists to achieve your health and fitness
                  goals.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Dumbbell className="h-6 w-6 text-indigo-600 mr-2" />
                  Fitness Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Work with expert physical trainers to develop customized
                  workout routines and improve your overall fitness and
                  well-being.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-indigo-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center mb-8">
              Why Choose Hygieia?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <Users className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Expert Professionals
                </h3>
                <p className="text-center">
                  Access to a network of verified and experienced consultants in
                  various fields.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Flexible Scheduling
                </h3>
                <p className="text-center">
                  Book appointments at your convenience, 24/7, from anywhere in
                  the world.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Brain className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Personalized Approach
                </h3>
                <p className="text-center">
                  Tailored advice and solutions designed to meet your specific
                  needs and goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
            Ready to Get Started?
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-8">
            Take the first step towards a healthier, happier you. Book your
            consultation now and let our experts guide you on your journey.
          </p>
          <Button size="lg" onClick={handleGetStarted}>
            Book Your Consultation
          </Button>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Hygieia</h3>
              <p className="text-sm">
                Connecting you with expert consultants for a better life.
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="text-sm">
                <li>
                  <a href="#" className="hover:text-indigo-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400">
                    Experts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-sm">Email: info@hygieia.com</p>
              <p className="text-sm">Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
            © 2024 Hygieia. All rights reserved.
          </div>
        </div>
      </footer>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose Your Account Type</DialogTitle>
            <DialogDescription>
              Are you joining as an expert consultant or as a user seeking
              consultations?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center space-x-4 mt-4">
            <Button onClick={() => handleUserTypeSelection("expert")}>
              Join as Expert
            </Button>
            <Button onClick={() => handleUserTypeSelection("normal")}>
              Join as User
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
