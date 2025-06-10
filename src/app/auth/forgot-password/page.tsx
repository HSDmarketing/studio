import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password - RepliGo',
};

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="mb-2 text-center font-headline text-2xl font-semibold tracking-tight text-foreground">
        Reset Your Password
      </h1>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Enter your email address and we&apos;ll send you a link to reset your password.
      </p>
      <ForgotPasswordForm />
    </>
  );
}
