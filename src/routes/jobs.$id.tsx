import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, DollarSign, Calendar, ArrowLeft, Building2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/jobs/$id")({
  head: () => ({
    meta: [
      { title: "Job Details — OneClick Jobs" },
      { name: "description", content: "View job details and apply on OneClick Jobs." },
      { property: "og:title", content: "Job Details — OneClick Jobs" },
      { property: "og:description", content: "View job details and apply on OneClick Jobs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JobDetailPage,
});

const SAMPLE_JOBS: Record<string, {
  title: string;
  company_name: string;
  location: string;
  type: string;
  salary_range: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  posted_at: string;
}> = {
  "1": {
    title: "Senior React Developer",
    company_name: "TechCorp",
    location: "Remote",
    type: "full-time",
    salary_range: "$100k - $150k",
    description:
      "We are looking for an experienced React developer to join our product team. You will own features end-to-end, collaborate with designers and backend engineers, and help shape the future of our platform.",
    requirements: ["5+ years React experience", "TypeScript proficiency", "Experience with Tailwind CSS", "Strong communication skills"],
    responsibilities: ["Build and maintain React components", "Review pull requests", "Collaborate with product and design", "Improve frontend performance"],
    posted_at: "2026-08-10",
  },
  "2": {
    title: "Product Designer",
    company_name: "DesignStudio",
    location: "New York",
    type: "contract",
    salary_range: "$70k - $110k",
    description:
      "Design beautiful user experiences for global brands. You will work on web and mobile products from concept to delivery.",
    requirements: ["Portfolio demonstrating UI/UX work", "Figma expertise", "Experience with design systems"],
    responsibilities: ["Create wireframes and prototypes", "Maintain design systems", "Present work to stakeholders"],
    posted_at: "2026-08-12",
  },
  "3": {
    title: "Marketing Manager",
    company_name: "GrowthLabs",
    location: "London",
    type: "full-time",
    salary_range: "$60k - $90k",
    description:
      "Lead growth campaigns for SaaS products. You will own demand generation, content strategy, and campaign execution.",
    requirements: ["3+ years B2B marketing", "Experience with SEO/SEM", "Data-driven mindset"],
    responsibilities: ["Plan and execute campaigns", "Analyze performance metrics", "Manage content calendar"],
    posted_at: "2026-08-14",
  },
  "4": {
    title: "Backend Engineer",
    company_name: "CloudSystems",
    location: "Remote",
    type: "full-time",
    salary_range: "$120k - $170k",
    description:
      "Build scalable APIs and infrastructure. You will design distributed systems and mentor junior engineers.",
    requirements: ["Strong Node.js or Go experience", "Database design", "Cloud platform experience"],
    responsibilities: ["Design APIs", "Optimize database queries", "Maintain cloud infrastructure"],
    posted_at: "2026-08-13",
  },
};

function JobDetailPage() {
  const { id } = useParams({ from: "/jobs/$id" });
  const job = SAMPLE_JOBS[id];
  const [applied, setApplied] = useState(false);

  if (!job) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-20">
        <h1 className="text-2xl font-bold text-foreground">Job not found</h1>
        <p className="mt-2 text-muted-foreground">The job you are looking for does not exist.</p>
        <Button asChild className="mt-6" variant="outline">
          <Link to="/jobs">Back to jobs</Link>
        </Button>
      </div>
    );
  }

  const handleApply = () => {
    setApplied(true);
    toast.success("Application submitted! The employer will be in touch.");
  };

  return (
    <div className="bg-cream px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Button asChild variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-foreground">
          <Link to="/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to jobs
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{job.company_name}</span>
                </div>
              </div>
              <Badge variant="secondary" className="w-fit">
                {job.type}
              </Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {job.location}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" /> {job.salary_range}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Posted {job.posted_at}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-foreground">About the role</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{job.description}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">Responsibilities</h2>
              <ul className="mt-3 space-y-2">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground">Requirements</h2>
              <ul className="mt-3 space-y-2">
                {job.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <Separator />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handleApply}
                disabled={applied}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {applied ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Applied
                  </>
                ) : (
                  "Apply in one click"
                )}
              </Button>
              <Button variant="outline" asChild>
                <Link to="/jobs">Save for later</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
