import { EverythingInOnePlace } from "@/components/landing/EverythingInOnePlace";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { FoundingMembers } from "@/components/landing/FoundingMembers";
import { Hero } from "@/components/landing/Hero";
import { InteractiveDemo } from "@/components/landing/InteractiveDemo";
import { JourneyCompare } from "@/components/landing/JourneyCompare";
import { NewsletterSignup } from "@/components/landing/NewsletterSignup";
import { Roadmap } from "@/components/landing/Roadmap";
import { Segments } from "@/components/landing/Segments";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SoundFamiliar } from "@/components/landing/SoundFamiliar";
import { ValidationSurvey } from "@/components/landing/ValidationSurvey";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <SoundFamiliar />
        <JourneyCompare />
        <InteractiveDemo />
        <Segments />
        <EverythingInOnePlace />
        <Roadmap />
        <FoundingMembers />
        <ValidationSurvey />
        <Faq />
        <NewsletterSignup />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
