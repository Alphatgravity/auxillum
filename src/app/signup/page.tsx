import type { Metadata } from "next";
import { AuthForm } from "@/components/forms/auth-form";
import { AuthPanel } from "@/components/forms/auth-panel";

export const metadata: Metadata = {
  title: "Inscription",
  description: "Rejoignez le programme pilote Auxillum : 3 mois offerts pour 5 agences.",
};

export default function SignupPage() {
  return (
    <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-6 py-32 lg:grid-cols-2">
      <AuthPanel />
      <div className="flex items-center justify-center">
        <AuthForm mode="signup" />
      </div>
    </section>
  );
}
