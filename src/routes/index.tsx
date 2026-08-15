import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, Search, MousePointerClick, ArrowRight, MapPin, DollarSign } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OneClick Jobs — Find Jobs & Hire Talent in One Click" },
      {
        name: "description",
        content:
          "OneClick Jobs connects job seekers and employers in one click. Browse jobs, create your profile, and apply instantly.",
      },
      { property: "og:title", content: "OneClick Jobs — Find Jobs & Hire Talent in One Click" },
      {
        property: "og:description",
        content:
          "OneClick Jobs connects job seekers and employers in one click. Browse jobs, create your profile, and apply instantly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
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
];

const SAMPLE_CANDIDATES = [
  {
    id: "1",
    full_name: "Alex Rivera",
    headline: "Full Stack Developer",
    location: "Remote",
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "2",
    full_name: "Sarah Chen",
    headline: "UX/UI Designer",
    location: "San Francisco",
    skills: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    id: "3",
    full_name: "Marcus Johnson",
    headline: "Product Manager",
    location: "New York",
    skills: ["Strategy", "Agile", "Analytics"],
  },
];

function Index() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-6 bg-orange-soft text-foreground">
                #1 job marketplace
              </Badge>
              <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Find jobs & talent in{" "}
                <span className="text-primary">one click</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Whether you are hiring or looking for your next opportunity, OneClick Jobs
                makes the connection instant, simple, and human.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/jobs">
                    Find a job
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/candidates">Hire talent</Link>
                </Button>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MousePointerClick className="h-4 w-4 text-primary" />
                  <span>One-click apply</span>
                </div>
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-primary" />
                  <span>Smart search</span>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative rounded-3xl bg-card p-8 shadow-xl shadow-primary/5">
                <div className="space-y-4">
                  {SAMPLE_JOBS.slice(0, 2).map((job) => (
                    <div
                      key={job.id}
                      className="rounded-xl border border-border bg-background p-4 transition-transform hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company_name}</p>
                        </div>
                        <Badge variant="secondary">{job.type}</Badge>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" /> {job.salary_range}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-background px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">How it works</h2>
            <p className="mt-3 text-muted-foreground">Three simple steps to your next opportunity or hire.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              number="1"
              icon={<Users className="h-5 w-5" />}
              title="Create your profile"
              description="Sign up in seconds and tell us what you do or who you need."
            />
            <StepCard
              number="2"
              icon={<Search className="h-5 w-5" />}
              title="Discover matches"
              description="Browse jobs and candidates with smart filters and instant results."
            />
            <StepCard
              number="3"
              icon={<MousePointerClick className="h-5 w-5" />}
              title="Connect in one click"
              description="Apply to jobs or reach out to candidates with a single click."
            />
          </div>
        </div>
      </section>

      {/* Featured jobs */}
      <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured jobs</h2>
              <p className="mt-2 text-muted-foreground">Fresh opportunities waiting for you.</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/jobs">View all jobs</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SAMPLE_JOBS.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured candidates */}
      <section className="bg-background px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured candidates</h2>
              <p className="mt-2 text-muted-foreground">Top talent ready for their next role.</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/candidates">View all candidates</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SAMPLE_CANDIDATES.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to find your match?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Join thousands of employers and job seekers who connect faster on OneClick Jobs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/auth">Get started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/post-job">Post a job</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StepCard({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        {icon}
      </div>
      <span className="absolute right-4 top-4 text-4xl font-bold text-muted/50">{number}</span>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function JobCard({ job }: { job: (typeof SAMPLE_JOBS)[0] }) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary">{job.title}</h3>
          <p className="text-sm text-muted-foreground">{job.company_name}</p>
        </div>
        <Badge variant="secondary">{job.type}</Badge>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{job.description}</p>
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
    </div>
  );
}

function CandidateCard({ candidate }: { candidate: (typeof SAMPLE_CANDIDATES)[0] }) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <span className="text-lg font-bold">
            {candidate.full_name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary">{candidate.full_name}</h3>
          <p className="text-sm text-muted-foreground">{candidate.headline}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {candidate.skills.map((skill) => (
          <Badge key={skill} variant="outline" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="h-3 w-3" /> {candidate.location}
      </p>
      <Button asChild variant="ghost" className="mt-4 h-auto p-0 text-primary hover:bg-transparent">
        <Link to="/candidates/$id" params={{ id: candidate.id }}>
          View profile <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </Button>
    </div>
  );
}
