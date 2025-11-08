
"use client";

import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { BloodPressureForm } from "@/components/blood-pressure-form";
import { BloodPressureList } from "@/components/blood-pressure-list";
import type { BloodPressureReading } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

// Initial mock data to demonstrate the list feature.
const getInitialReadings = (): BloodPressureReading[] => {
  const now = new Date();
  return [
    {
      id: "1",
      systolic: 120,
      diastolic: 80,
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 3),
    },
    {
      id: "2",
      systolic: 135,
      diastolic: 88,
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24),
    },
    {
      id: "3",
      systolic: 145,
      diastolic: 92,
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 48),
    },
  ];
};

export default function Home() {
  const [readings, setReadings] = useState<BloodPressureReading[]>(
    getInitialReadings
  );

  const handleAddReading = (data: { systolic: number; diastolic: number }) => {
    const newReading: BloodPressureReading = {
      id: new Date().toISOString(),
      systolic: data.systolic,
      diastolic: data.diastolic,
      timestamp: new Date(),
    };
    setReadings((prevReadings) => [newReading, ...prevReadings]);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex-1">
        <div className="container mx-auto grid grid-cols-1 items-start gap-8 px-4 pb-8 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-headline">
                  <PlusCircle className="text-primary" />
                  <span>New Reading</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BloodPressureForm onAddReading={handleAddReading} />
              </CardContent>
            </Card>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <BloodPressureList readings={readings} />
          </div>
        </div>
      </main>
    </div>
  );
}
