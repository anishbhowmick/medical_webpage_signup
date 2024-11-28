import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight, ArrowLeft, CheckCircle2, Stethoscope } from "lucide-react";
import { SignupFormData, signupSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { cn } from "@/lib/utils";

export function SignupForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: undefined,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://medical-backend-l140.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      console.log('User registered successfully');
      setIsSuccess(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-8">
        <div className="rounded-full bg-green-100/80 p-4 ring-8 ring-green-100/30">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Registration Successful!
          </h2>
          <p className="text-muted-foreground">
            Thank you for signing up.
          </p>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://medical-webpage-front.vercel.app"
            className="bg-primary hover:bg-primary/90 inline-block px-4 py-2 text-white rounded"
          >
            Return to Home
          </a>
          <a
            href="https://medical-webpage-signin.vercel.app"
            className="bg-primary hover:bg-primary/90 inline-block px-4 py-2 text-white rounded"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <div className="rounded-lg bg-primary/10 p-2">
            <Stethoscope className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">
            HealthConnect
          </h1>
        </div>
        <p className="text-center text-muted-foreground">
          Join our healthcare platform to access personalized medical services
        </p>
      </div>

      {/* Progress Steps */}
      <div className="relative mb-8">
        <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
        </div>
        <div className="relative z-10 flex justify-between">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background transition-all duration-500",
                step >= index
                  ? "border-primary text-primary shadow-lg shadow-primary/20"
                  : "border-muted text-muted-foreground"
              )}
            >
              {index}
            </div>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {step === 1 && (
              <div
                className="space-y-4 animate-in fade-in slide-in-from-right duration-500"
                style={{ "--enter-delay": "200ms" } as React.CSSProperties}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="eg: John"
                            className="hover:border-primary/50 focus:border-primary" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Doe"
                            className="hover:border-primary/50 focus:border-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          className="hover:border-primary/50 focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div
                className="space-y-4 animate-in fade-in slide-in-from-right duration-500"
                style={{ "--enter-delay": "200ms" } as React.CSSProperties}
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password (Uppercase,lowercase,special character and number)</FormLabel>
                      <FormControl>
                        <Input 
                          type="password"
                          className="hover:border-primary/50 focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                      <PasswordStrengthMeter password={field.value} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 3 && (
              <div
                className="space-y-4 animate-in fade-in slide-in-from-right duration-500"
                style={{ "--enter-delay": "200ms" } as React.CSSProperties}
              >
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="hover:border-primary/50 focus:border-primary">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="doctor">Doctor</SelectItem>
                          <SelectItem value="patient">Patient</SelectItem>
                          <SelectItem value="visitor">Visitor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          <div className="flex justify-between space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="hover:border-primary/50 hover:bg-primary/5"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              type={step === 3 ? "submit" : "button"}
              onClick={() => step < 3 && setStep(step + 1)}
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : step === 3 ? (
                "Complete Sign Up"
              ) : (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}