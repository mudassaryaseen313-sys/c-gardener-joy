import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Users, ArrowRight, MapPin, DollarSign } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — OneClick Jobs" },
      { name: "description", content: "Manage your jobs and applications on OneClick Jobs." },
      { property: "og:title", content: "Dashboard — OneClick Jobs" },
      { property: "og:description", content: "Manage your jobs and applications on OneClick Jobs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

const MY_JOBS = [
  {
    id: "1",
    title: "Senior React Developer",
    company_name: "TechCorp",
    location: "Remote",
    type: "full-time",
    salary_range: "$100k - $150k",
    status: "active",
    applications_count: 12,
  },
];

const MY_APPLICATIONS = [
  {
    id: "1",
    job_title: "Product Designer",
    company_name: "DesignStudio",
    status: "pending",
    applied_at: "2026-08-14",
  },
];

function DashboardPage() {
  return (
    <div className="bg-cream px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Manage your jobs, applications, and profile.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link to="/profile">Edit profile</Link>
            </Button>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/post-job">Post a job</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="jobs">
          <TabsList className="mb-6">
            <TabsTrigger value="jobs">
              <Briefcase className="mr-2 h-4 w-4" /> My jobs
            </TabsTrigger>
            <TabsTrigger value="applications">
              <Users className="mr-2 h-4 w-4" /> My applications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-4">
            {MY_JOBS.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription>{job.company_name}</CardDescription>
                    </div>
                    <Badge variant={job.status === "active" ? "default" : "secondary"}>{job.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" /> {job.salary_range}
                    </span>
                    <span>{job.applications_count} applications</span>
                  </div>
                  <Button asChild variant="ghost" className="mt-4 h-auto p-0 text-primary hover:bg-transparent">
                    <Link to="/jobs/$id" params={{ id: job.id }}>
                      View job <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}

            {MY_JOBS.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">You have not posted any jobs yet.</p>
                  <Button asChild className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link to="/post-job">Post your first job</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            {MY_APPLICATIONS.map((app) => (
              <Card key={app.id}>
                <CardHeader>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <CardTitle className="text-lg">{app.job_title}</CardTitle>
                      <CardDescription>{app.company_name}</CardDescription>
                    </div>
                    <Badge variant="secondary">{app.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Applied on {app.applied_at}</p>
                  <Button asChild variant="ghost" className="mt-4 h-auto p-0 text-primary hover:bg-transparent">
                    <Link to="/jobs/$id" params={{ id: app.id }}>
                      View job <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}

            {MY_APPLICATIONS.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">You have not applied to any jobs yet.</p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link to="/jobs">Browse jobs</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
