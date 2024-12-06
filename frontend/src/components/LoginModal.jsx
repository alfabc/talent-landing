import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export function LoginModal({ isOpen, onClose, t }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
    // Here you would typically handle the login logic
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t?.loginModal?.title || 'Login to Talent AI'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t?.loginModal?.email || 'Email'}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={`${t?.loginModal?.email || 'Email'}...`} {...field} />
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
                  <FormLabel>{t?.loginModal?.password || 'Password'}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={`${t?.loginModal?.password || 'Password'}...`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">{t?.loginModal?.loginButton || 'Login'}</Button>
          </form>
        </Form>
        <div className="mt-4">
          <Button variant="outline" className="w-full" onClick={() => console.log("Login with Google")}>
            {t?.loginModal?.googleLogin || 'Login with Google'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}