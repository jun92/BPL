import { AppHeader } from "@/components/app-header";
import { BloodPressureForm } from "@/components/blood-pressure-form";
import { BloodPressureList } from "@/components/blood-pressure-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { addReading, getReadings } from "@/lib/actions";

export default async function Home() {
  const readings = await getReadings();

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
                <BloodPressureForm onAddReading={addReading} />
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
