
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  systolic: z.coerce
    .number({ required_error: "Systolic is required." })
    .int()
    .positive("Must be positive.")
    .min(50, "Value seems too low.")
    .max(300, "Value seems too high."),
  diastolic: z.coerce
    .number({ required_error: "Diastolic is required." })
    .int()
    .positive("Must be positive.")
    .min(30, "Value seems too low.")
    .max(200, "Value seems too high."),
});

type BloodPressureFormProps = {
  onAddReading: (data: { systolic: number; diastolic: number }) => void;
};

export function BloodPressureForm({ onAddReading }: BloodPressureFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      systolic: undefined,
      diastolic: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddReading(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="systolic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Systolic</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 120"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value === '' ? undefined : e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="diastolic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diastolic</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 80"
                  {...field}
                   onChange={(e) => field.onChange(e.target.value === '' ? undefined : e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Record
        </Button>
      </form>
    </Form>
  );
}
