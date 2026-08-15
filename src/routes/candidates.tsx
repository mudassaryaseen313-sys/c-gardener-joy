import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/candidates")({
  head: () => ({
    meta: [
      { title: "Browse Candidates — OneClick Jobs" },
      { name: "description", content: "Browse candidate profiles on OneClick Jobs." },
      { property: "og:title", content: "Browse Candidates — OneClick Jobs" },
      { property: "og:description", content: "Browse candidate profiles on OneClick Jobs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CandidatesPage,
});

const SAMPLE_CANDIDATES = [
  {
    id: "1",
    full_name: "Alex Rivera",
    headline: "Full Stack Developer",
    location: "Remote",
    bio: "Passionate developer with 5+ years of experience building scalable web applications.",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    id: "2",
    full_name: "Sarah Chen",
    headline: "UX/UI Designer",
    location: "San Francisco",
    bio: "Designer focused on creating intuitive and accessible digital experiences.",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
  },
  {
    id: "3",
    full_name: "Marcus Johnson",
    headline: "Product Manager",
    location: "New York",
    bio: "Product leader with a track record of launching successful SaaS products.",
    skills: ["Strategy", "Agile", "Analytics", "Roadmapping"],
  },
  {
    id: "4",
    full_name: "Emily Davis",
    headline: "Backend Engineer",
    location: "London",
    bio: "Backend engineer specializing in distributed systems and cloud infrastructure.",
    skills: ["Go", "Kubernetes", "AWS", "Microservices"],
  },
];

function CandidatesPage() {
  const [search, setSearch] = useState("");

  const filtered = SAMPLE_CANDIDATES.filter(
    (c) =>
      c.full_name.toLowerCase().includes(search.toLowerCase()) ||
      c.headline.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-cream px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Browse candidates</h1>
          <p className="mt-2 text-muted-foreground">Discover talented people ready for their next role.</p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, role, or skill"
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No candidates match your search.</p>
            <Button variant="outline" className="mt-4" onClick={() => setSearch("")}>
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function CandidateCard({ candidate }: { candidate: (typeof SAMPLE_CANDIDATES)[0] }) {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <span className="text-lg font-bold">
              {candidate.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <CardTitle className="text-lg">{candidate.full_name}</CardTitle>
            <p className="text-sm text-muted-foreground">{candidate.headline}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">{candidate.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {candidate.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" /> {candidate.location}
        </p>
        <Button asChild variant="ghost" className="mt-4 h-auto p-0 text-primary hover:bg-transparent">
          <Link to="/candidates/$id" params={{ id: candidate.id }}>
            View profile <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
