import type { Metadata } from "next";
import { AuthForm } from "@/components/forms/auth-form";
import { AuthPanel } from "@/components/forms/auth-panel";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre espace Auxillum.",
};

export default function LoginPage() {
  return (
    <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-6 py-32 lg:grid-cols-2">
      <div className="flex items-center justify-center">
        <AuthForm mode="login" />
      </div>
      <AuthPanel />
    </section>
  );
}
