import { Section } from "@/components/layout/section";
import { generateMetadata } from "@/utils/metadata";
import { Hero1 } from "@/app/(website)/sections/funnel-heroes/Hero1";
import { ProblemSection } from "@/app/(website)/sections/funnel-sections/ProblemSection";
import { SolutionSection } from "@/app/(website)/sections/funnel-sections/SolutionSection";
import { CustomerReviewSection } from "@/app/(website)/sections/funnel-sections/CustomerReviewSection";
import { MeetTheFounderSection } from "@/sections/mainpage/meet-the-founder-section";
import { ProcessSection } from "@/sections/mainpage/process-section";
import { AppDownloadSection } from "@/sections/handyapp/app-download-section";
import { getVideoUrl } from "@/app/app/free/lerne-die-grundlagen/data";

const clientVideoKeys = [
  "CLIENT/Emre.mp4",
  "CLIENT/Kaan.mp4",
  "CLIENT/Markus.mp4",
  "CLIENT/Sumit.mp4",
];
const clientVideoSrcs = clientVideoKeys.map((key) => getVideoUrl(key));

export const metadata = generateMetadata({
  title: "Home",
  description:
    "PumpItClub – Deine Transformation startet hier. Fitness, Ernährung und persönliches Coaching.",
});

export default async function Page() {
  return (
    <>
      <Hero1 />
      <ProblemSection />
      <SolutionSection />
      <CustomerReviewSection clientVideoSrcs={clientVideoSrcs} />
      <MeetTheFounderSection />
      <ProcessSection />
      <AppDownloadSection />
    </>
  );
}
