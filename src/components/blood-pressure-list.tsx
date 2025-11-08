
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BloodPressureReading } from "@/lib/types";
import { History } from "lucide-react";

type BloodPressureListProps = {
  readings: BloodPressureReading[];
};

type Status = {
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
};

function getBloodPressureStatus(
  systolic: number,
  diastolic: number
): Status {
  if (systolic >= 160 || diastolic >= 100) {
    return { label: "Very High", variant: "destructive" };
  }
  if (systolic >= 130 || diastolic >= 85) {
    return { label: "High", variant: "default" };
  }
  return { label: "Normal", variant: "outline" };
}

export function BloodPressureList({ readings }: BloodPressureListProps) {
  if (readings.length === 0) {
    return (
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-headline">
            <History className="text-primary" />
            <span>History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/20 py-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background">
              <History className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              No Readings Yet
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Use the form on the left to add your first reading.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-headline">
          <History className="text-primary" />
          <span>History</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-center">Systolic</TableHead>
                <TableHead className="text-center">Diastolic</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {readings.map((reading) => {
                const status = getBloodPressureStatus(
                  reading.systolic,
                  reading.diastolic
                );
                return (
                  <TableRow
                    key={reading.id}
                    className="animate-in fade-in-0"
                  >
                    <TableCell>
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }).format(reading.timestamp)}
                    </TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      }).format(reading.timestamp)}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {reading.systolic}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {reading.diastolic}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
