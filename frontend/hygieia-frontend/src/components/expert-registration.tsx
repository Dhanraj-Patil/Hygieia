"use client";

import { useEffect, useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, PlusCircle, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
  "Bengali",
  "Urdu",
  "Indonesian",
  "Dutch",
  "Polish",
  "Swedish",
  "Norwegian",
  "Finnish",
  "Danish",
  "Greek",
  "Turkish",
  "Hebrew",
  "Thai",
  "Vietnamese",
  "Malay",
  "Filipino",
  "Swahili",
  "Zulu",
];

const expertTypes = ["Psychologist", "Nutritionist", "Physical Trainer"];

export function ExpertRegistration({
  step,
  handleSubmit,
  setTerm,
  expertData,
  setExpertData,
}) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpertData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setExpertData((prev) => ({ ...prev, agreeTerms: checked }));
    setTerm(true);
  };

  const handleArrayInputChange = (index, field, value) => {
    setExpertData((prevData) => ({
      ...prevData,
      [field]: prevData[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayField = (field) => {
    setExpertData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], ""],
    }));
  };

  const handleWorkHistoryChange = (index, field, value) => {
    setExpertData((prevData) => ({
      ...prevData,
      workHistory: prevData.workHistory.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addWorkHistory = () => {
    setExpertData((prevData) => ({
      ...prevData,
      workHistory: [
        ...prevData.workHistory,
        { name: "", current: false, startDate: "", endDate: "" },
      ],
    }));
  };

  const removeWorkHistory = (index) => {
    setExpertData((prevData) => ({
      ...prevData,
      workHistory: prevData.workHistory.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={expertData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                id="middleName"
                name="middleName"
                value={expertData.middleName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={expertData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !expertData.dob && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expertData.dob ? (
                    format(new Date(expertData.dob), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    expertData.dob ? new Date(expertData.dob) : undefined
                  }
                  onSelect={(date) =>
                    setExpertData((prev) => ({
                      ...prev,
                      dob: date?.toISOString() || "",
                    }))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              onValueChange={(value) =>
                setExpertData((prev) => ({ ...prev, gender: value }))
              }
              value={expertData.gender}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={expertData.email}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="grid grid-cols space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="flex space-x-2">
              <Input
                className="w-[100px]"
                id="prefix"
                name="prefix"
                type="number"
                placeholder="Prefix"
                value={expertData.prefix}
                onChange={handleInputChange}
                required
              />
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={expertData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              value={expertData.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              value={expertData.state}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Languages</Label>
            <Select
              onValueChange={(value) =>
                handleArrayInputChange(0, "language", value)
              }
              value={expertData.language[0]}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expertType">Expert Type</Label>
            <Select
              value={expertData.expertType}
              onValueChange={(value) =>
                setExpertData((prev) => ({ ...prev, expertType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Expert Type" />
              </SelectTrigger>
              <SelectContent>
                {expertTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          {expertData.qualification.map((qual, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`qualification-${index}`}>
                Qualification {index + 1}
              </Label>
              <Input
                id={`qualification-${index}`}
                value={qual}
                onChange={(e) =>
                  handleArrayInputChange(index, "qualification", e.target.value)
                }
                required
              />
            </div>
          ))}
          <Button type="button" onClick={() => addArrayField("qualification")}>
            Add Qualification
          </Button>

          {expertData.certification.map((cert, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`certification-${index}`}>
                Certification {index + 1}
              </Label>
              <Input
                id={`certification-${index}`}
                value={cert}
                onChange={(e) =>
                  handleArrayInputChange(index, "certification", e.target.value)
                }
              />
            </div>
          ))}
          <Button type="button" onClick={() => addArrayField("certification")}>
            Add Certification
          </Button>

          <div className="space-y-2">
            <Label htmlFor="workExp">Work Experience (years)</Label>
            <Input
              id="workExp"
              name="workExp"
              type="number"
              value={expertData.workExp}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          {expertData.workHistory.map((work, index) => (
            <div
              key={index}
              className="space-y-4 p-4 border rounded-md relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeWorkHistory(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="space-y-2">
                <Label htmlFor={`workHistory.${index}.name`}>
                  Company Name
                </Label>
                <Input
                  id={`workHistory.${index}.name`}
                  value={work.name}
                  onChange={(e) =>
                    handleWorkHistoryChange(index, "name", e.target.value)
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`workHistory.${index}.current`}
                  checked={work.current}
                  onCheckedChange={(checked) =>
                    handleWorkHistoryChange(index, "current", checked)
                  }
                />
                <Label htmlFor={`workHistory.${index}.current`}>
                  Current Job
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`workHistory.${index}.startDate`}>
                  Start Date
                </Label>
                <Input
                  id={`workHistory.${index}.startDate`}
                  type="date"
                  value={work.startDate}
                  onChange={(e) =>
                    handleWorkHistoryChange(index, "startDate", e.target.value)
                  }
                />
              </div>
              {!work.current && (
                <div className="space-y-2">
                  <Label htmlFor={`workHistory.${index}.endDate`}>
                    End Date
                  </Label>
                  <Input
                    id={`workHistory.${index}.endDate`}
                    type="date"
                    value={work.endDate}
                    onChange={(e) =>
                      handleWorkHistoryChange(index, "endDate", e.target.value)
                    }
                  />
                </div>
              )}
            </div>
          ))}
          <Button type="button" onClick={addWorkHistory} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Work History
          </Button>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeTerms"
              checked={expertData.agreeTerms}
              onCheckedChange={(checked) => handleCheckboxChange(checked)}
              required
            />
            <Label htmlFor="agreeTerms">
              I agree to the terms and conditions
            </Label>
          </div>
        </div>
      )}
    </form>
    //   </CardContent>
    //   <CardFooter className="flex justify-between">
    //     {step > 1 && (
    //       <Button onClick={prevStep}>Previous</Button>
    //     )}
    //     {step < 4 ? (
    //       <Button onClick={nextStep}>Next</Button>
    //     ) : (
    //       <Button onClick={handleSubmit} disabled={!expertData.agreeTerms}>Submit</Button>
    //     )}
    //   </CardFooter>
    // </Card>
  );
}
