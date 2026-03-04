import { generateMetadata } from "@/utils/metadata";
import { UnsereAppPageContent } from "./unsere-app-page-content";

export const metadata = generateMetadata({
  title: "Pump It Club App",
  description: "Alles was du für deinen Traumkörper benötigst, übersichtlich in einer App!",
});

export default async function UnsereApp() {
  return (
    <UnsereAppPageContent />
  );
}
