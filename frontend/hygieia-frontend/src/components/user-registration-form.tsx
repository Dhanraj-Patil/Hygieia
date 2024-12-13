"use client";

import { Button } from "@/components/ui/button";
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
import { CalendarIcon, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

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

const phonePrefixes = [
  "+1",
  "+44",
  "+91",
  "+86",
  "+81",
  "+49",
  "+33",
  "+7",
  "+55",
  "+61",
];

export default function UserRegistrationForm({
  step,
  formData,
  setFormData,
  handleSubmit,
  setTerm,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLanguageChange = (language) => {
    setFormData((prevData) => ({
      ...prevData,
      languages: prevData.languages.includes(language)
        ? prevData.languages.filter((l) => l !== language)
        : [...prevData.languages, language],
    }));
  };

  const handleArrayInputChange = (index, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: prevData[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prevData) => ({
      ...prevData,
      agreeTerms: checked,
    }));
    setTerm(checked);
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
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
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
                    !formData.dob && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dob ? (
                    format(new Date(formData.dob), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.dob ? new Date(formData.dob) : undefined}
                  onSelect={(date) =>
                    setFormData((prev) => ({
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
                setFormData((prev) => ({ ...prev, gender: value }))
              }
              value={formData.gender}
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
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="flex space-x-2">
              <Select
                value={formData.phonePrefix}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, phonePrefix: value }))
                }
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Prefix" />
                </SelectTrigger>
                <SelectContent>
                  {phonePrefixes.map((prefix) => (
                    <SelectItem key={prefix} value={prefix}>
                      {prefix}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Languages</Label>
            <Select
              onValueChange={(value) =>
                handleArrayInputChange(0, "language", value)
              }
              value={formData.language[0]}
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
          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={handleCheckboxChange}
              required
            />
            <Label htmlFor="agreeTerms">
              I agree to the terms and conditions
            </Label>
          </div>
        </div>
      )}
    </form>
  );
}
