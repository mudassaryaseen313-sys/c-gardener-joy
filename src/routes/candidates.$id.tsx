import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Mail, ArrowLeft, Briefcase, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/candidates/$id")({
  head: () => ({
    meta: [
      { title: "Candidate Profile — OneClick Jobs" },
      { name: "description", content: "View candidate profile on OneClick Jobs." },
      { property: "og:title", content: "Candidate Profile — OneClick Jobs" },
      { property: "og:description", content: "View candidate profile on OneClick Jobs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CandidateDetailPage,
});

const SAMPLE_CANDIDATES: Record<string, {
  full_name: string;
  headline: string;
  bio: string;
  location: string;
  skills: string[];
  experience_years: number;
  expected_salary: string;
  email: string;
}> = {
  "1": {
    full_name: "Alex Rivera",
    headline: "Full Stack Developer",
    bio: "Passionate developer with 5+ years of experience building scalable web applications. I love working with modern JavaScript stacks and contributing to open source.",
    location: "Remote",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    experience_years: 5,
    expected_salary: "$80k - $120k",
    email: "alex@example.com",
  },
  "2": {
    full_name: "Sarah Chen",
    headline: "UX/UI Designer",
    bio: "Designer focused on creating intuitive and accessible digital experiences. I have led design for multiple SaaS products from concept to launch.",
    location: "San Francisco",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Accessibility"],
    experience_years: 4,
    expected_salary: "$90k - $130k",
    email: "sarah@example.com",
  },
  "3": {
    full_name: "Marcus Johnson",
    headline: "Product Manager",
    bio: "Product leader with a track record of launching successful SaaS products. I thrive at the intersection of user needs, business goals, and engineering constraints.",
    location: "New York",
    skills: ["Strategy", "Agile", "Analytics", "Roadmapping", "Stakeholder Management"],
    experience_years: 6,
    expected_salary: "$100k - $150k",
    email: "marcus@example.com",
  },
  "4": {
    full_name: "Emily Davis",
    headline: "Backend Engineer",
    bio: "Backend engineer specializing in distributed systems and cloud infrastructure. I enjoy solving complex scaling challenges.",
    location: "London",
    skills: ["Go", "Kubernetes", "AWS", "Microservices", "PostgreSQL"],
    experience_years: 5,
    expected_salary: "$90k - $140k",
    email: "emily@example.com",
  },
};

function CandidateDetailPage() {
  const { id } = useParams({ from: "/candidates/$id" });
  const candidate = SAMPLE_CANDIDATES[id];
  const [contacted, setContacted] = useState(false);

  if (!candidate) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-20">
        <h1 className="text-2xl font-bold text-foreground">Candidate not found</h1>
        <p className="mt-2 text-muted-foreground">The candidate you are looking for does not exist.</p>
        <Button asChild className="mt-6" variant="outline">
          <Link to="/candidates">Back to candidates</Link>
        </Button>
      </div>
    );
  }

  const handleContact = () => {
    setContacted(true);
    toast.success("Interest sent! The candidate will be notified.");
  };

  return (
    <div className="bg-cream px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Button asChild variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-foreground">
          <Link to="/candidates">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to candidates
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <span className="text-xl font-bold">
                    {candidate.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <CardTitle className="text-2xl">{candidate.full_name}</CardTitle>
                  <p className="text-muted-foreground">{candidate.headline}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground sm:flex-col sm:items-end">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {candidate.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" /> {candidate.experience_years} years exp.
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-foreground">About</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{candidate.bio}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
              <div className="mt-3 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{candidate.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span>Expected: {candidate.expected_salary}</span>
                </div>
              </div>
            </section>

            <Separator />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handleContact}
                disabled={contacted}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {contacted ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Interest sent
                  </>
                ) : (
                  "Contact in one click"
                )}
              </Button>
              <Button variant="outline" asChild>
                <Link to="/candidates">Keep browsing</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
