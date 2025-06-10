
import { SignupForm } from "@/components/auth/signup-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - RepliGo',
};

export default function SignupPage() {
  return (
    <>
      <h1 className="mb-2 text-center font-headline text-2xl font-semibold tracking-tight text-foreground">
        Create your RepliGo account
      </h1>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Enter your details below to get started.
      </p>
      <SignupForm />
      <p className="mt-4 px-8 text-center text-xs text-muted-foreground">
        <strong>Demo:</strong> You can use any email address and matching passwords to sign up.
      </p>
    </>
  );
}
