import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "@/config/axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import UserRegistration from "@/components/user-registration";
import { ExpertRegistration } from "@/components/expert-registration";
import UserRegistrationForm from "@/components/user-registration-form";

export default function Registration() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();
  const [type, setType] = useState("Client");
  const [step, setStep] = useState(0);
  const [term, setTerm] = useState(false);

  const [expertData, setExpertData] = useState({
    firstName: user?.given_name,
    middleName: user?.middle_name,
    lastName: user?.middle_name,
    dob: user?.birthdate,
    gender: user?.gender,
    email: user?.email,
    prefix: "",
    phone: user?.phone_number,
    country: "",
    state: "",
    language: [""],
    expertType: "",
    qualification: [""],
    certification: [""],
    workExp: "",
    workHistory: [
      {
        name: "",
        current: false,
        startDate: "",
        endDate: "",
      },
    ],
    agreeTerms: false,
  });

  const [userData, setUserData] = useState({
    firstName: user?.given_name,
    middleName: user?.middle_name,
    lastName: user?.family_name,
    dob: user?.birthdate,
    gender: user?.gender,
    email: user?.email,
    phonePrefix: "",
    phone: user?.phone_number,
    country: "",
    state: "",
    language: [""],
    agreeTerms: false,
  });

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  console.log(isAuthenticated);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault;
    const accessToken = await getAccessTokenSilently();

    if (type == "Consultant") {
      // console.log('Expert form submitted: ', expertData)

      try {
        const response = await axios.post("/expert", expertData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response?.data.message == "Success") {
          navigate("/expert-dashboard");
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (type == "Client") {
      // console.log('Client form submitted: ', userData)

      try {
        const response = await axios.post("/user", userData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response?.data.message == "Success") {
          navigate("/dashboard");
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Here you would typically send the data to your backend
  };

  return (
    // isAuthenticated ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[550px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Step {step}</CardDescription>
        </CardHeader>
        <CardContent>
          {step == 0 && (
            <Select onValueChange={(value) => setType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="What Describes you better?" />
              </SelectTrigger>
              <SelectContent>
                {["Client", "Consultant"].map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {type == "Client" && (
            // <UserRegistration step={step} handleSubmit={handleSubmit} />
            <UserRegistrationForm
              step={step}
              setFormData={setUserData}
              formData={userData}
              handleSubmit={handleSubmit}
              setTerm={setTerm}
            />
          )}
          {type == "Consultant" && (
            // <ExpertRegistration step={step} handleSubmit={handleSubmit} />
            <ExpertRegistration
              step={step}
              handleSubmit={handleSubmit}
              setTerm={setTerm}
              expertData={expertData}
              setExpertData={setExpertData}
            />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 0 && (
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {type == "Consultant" && step < 4 && (
            <Button onClick={handleNext}>Next</Button>
          )}
          {type == "Consultant" && step == 4 && (
            <Button onClick={handleSubmit} disabled={!term}>
              Submit
            </Button>
          )}
          {type == "Client" && step < 3 && (
            <Button onClick={handleNext}>Next</Button>
          )}
          {type == "Client" && step == 3 && (
            <Button onClick={handleSubmit} disabled={!term}>
              Submit
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
    // ) : loginWithRedirect()
  );
}
