"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";

export async function getReadings() {
  const readings = await prisma.bloodPressureReading.findMany({
    orderBy: {
      timestamp: "desc",
    },
  });
  return readings;
}

export async function addReading(data: {
  systolic: number;
  diastolic: number;
}) {
  await prisma.bloodPressureReading.create({
    data: {
      systolic: data.systolic,
      diastolic: data.diastolic,
    },
  });
  revalidatePath("/");
}
