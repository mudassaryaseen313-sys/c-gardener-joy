import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, DollarSign, Search, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Browse Jobs — OneClick Jobs" },
      { name: "description", content: "Browse and search open jobs on OneClick Jobs." },
      { property: "og:title", content: "Browse Jobs — OneClick Jobs" },
      { property: "og:description", content: "Browse and search open jobs on OneClick Jobs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JobsPage,
});

const SAMPLE_JOBS = [
  {
    id: "1",
    title: "Senior React Developer",
    company_name: "TechCorp",
    location: "Remote",
    type: "full-time",
    salary_range: "$100k - $150k",
    description: "Join our team to build modern web applications.",
  },
  {
    id: "2",
    title: "Product Designer",
    company_name: "DesignStudio",
    location: "New York",
    type: "contract",
    salary_range: "$70k - $110k",
    description: "Design beautiful user experiences for global brands.",
  },
  {
    id: "3",
    title: "Marketing Manager",
    company_name: "GrowthLabs",
    location: "London",
    type: "full-time",
    salary_range: "$60k - $90k",
    description: "Lead growth campaigns for SaaS products.",
  },
  {
    id: "4",
    title: "Backend Engineer",
    company_name: "CloudSystems",
    location: "Remote",
    type: "full-time",
    salary_range: "$120k - $170k",
    description: "Build scalable APIs and infrastructure.",
  },
];

function JobsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string>("all");

  const filtered = SAMPLE_JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company_name.toLowerCase().includes(search.toLowerCase());
    const matchesType = type === "all" || job.type === type;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-cream px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Browse jobs</h1>
          <p className="mt-2 text-muted-foreground">Find your next opportunity from open roles.</p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by title or company"
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/post-job">Post a job</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No jobs match your search.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setType("all"); }}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function JobCard({ job }: { job: (typeof SAMPLE_JOBS)[0] }) {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{job.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{job.company_name}</p>
          </div>
          <Badge variant="secondary">{job.type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">{job.description}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {job.location}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" /> {job.salary_range}
          </span>
        </div>
        <Button asChild variant="ghost" className="mt-4 h-auto p-0 text-primary hover:bg-transparent">
          <Link to="/jobs/$id" params={{ id: job.id }}>
            View job <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
