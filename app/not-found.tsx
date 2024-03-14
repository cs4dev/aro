import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "./(platform)/(dashboard)/_components/navbar";

export default function NotFound() {
  return (
    <ClerkProvider>
      <div className="h-full">
        <Navbar />
      </div>
    </ClerkProvider>
  );
}
