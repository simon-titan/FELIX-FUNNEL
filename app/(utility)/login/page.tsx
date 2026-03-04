import { generateMetadata } from "@/utils/metadata";
import { LoginPageContent } from "./login-page-content";

export const metadata = generateMetadata({
  title: "Login",
  description: "Login zu PumpItClub",
});

export default function LoginPage() {
  return <LoginPageContent />;
}
