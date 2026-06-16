import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/Hero";
import { Message } from "@/components/portfolio/Message";
import { Projects } from "@/components/portfolio/Projects";
import { Journey } from "@/components/portfolio/Journey";
import { Certifications } from "@/components/portfolio/Certifications";
import { Achievements } from "@/components/portfolio/Achievements";
import { Vision } from "@/components/portfolio/Vision";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alex — AI Builder, Developer, Creator" },
      {
        name: "description",
        content:
          "A storytelling portfolio of a young AI builder. Selected projects, journey, and what comes next.",
      },
      { property: "og:title", content: "Alex — AI Builder, Developer, Creator" },
      {
        property: "og:description",
        content: "Technology isn't what excites me. Creating things that didn't exist yesterday does.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-[#0B0D0F] text-foreground antialiased">
      <Hero name="Alex" />
      <Message />
      <Projects />
      <Journey />
      <Certifications />
      <Achievements />
      <Vision />
      <Contact />
    </main>
  );
}
