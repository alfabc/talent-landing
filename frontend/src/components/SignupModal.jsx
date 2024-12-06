import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useRegisterRecruiter } from "@/auth/application";
import { LoaderCircle } from "lucide-react";

const formSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    repeatPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
    acceptPrivacy: z.boolean().refine((val) => val === true, {
      message: "You must accept the privacy policy",
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });

export function SignupModal({ isOpen, onClose, t, language }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      password: "",
      repeatPassword: "",
      acceptTerms: false,
      acceptPrivacy: false,
    },
  });

  const { mutate, isPending, isError, error, isSuccess } = useRegisterRecruiter();

  const onSubmit = (values) => mutate({ ...values, language });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[calc(100vh_-_5rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t?.signupModal?.title || "Create your account at Talent AI for free"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t?.signupModal?.name || "Name"}</FormLabel>
                  <FormControl>
                    <Input placeholder={`${t?.signupModal?.name || "Name"}...`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t?.signupModal?.company || "Company"}</FormLabel>
                  <FormControl>
                    <Input placeholder={`${t?.signupModal?.company || "Company"}...`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t?.signupModal?.email || "Email Address"}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={`${t?.signupModal?.email || "Email Address"}...`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t?.signupModal?.password || "Password"}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t?.signupModal?.repeatPassword || "Repeat Password"}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {t?.signupModal?.terms?.accept || "I accept the"}{" "}
                      <a
                        href={`/terms-of-service.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {t?.signupModal?.terms?.termsAndConditions || "Terms and Conditions"}
                      </a>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="acceptPrivacy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {t?.signupModal?.dataProcessing?.accept}{" "}
                      <a
                        href={`/data-processing-agreement.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {t?.signupModal?.dataProcessing?.policy}
                      </a>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            {isError && (
              <FormMessage type="error">
                {typeof error === "string" ? error : error?.message ? error.message : "An error occurred"}
              </FormMessage>
            )}
            <Button type="submit" className="w-full" disabled={isSuccess}>
              {isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span>{t?.signupModal?.createAccount || "Create Account"}</span>
              )}
            </Button>
            {isSuccess && (
              <FormMessage className="text-primary text-center">
                {t?.signupModal?.successMessage || "Please check your email and confirm your account."}
              </FormMessage>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
