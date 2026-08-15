import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { X, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — OneClick Jobs" },
      { name: "description", content: "Create or edit your OneClick Jobs profile." },
      { property: "og:title", content: "Your Profile — OneClick Jobs" },
      { property: "og:description", content: "Create or edit your OneClick Jobs profile." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"candidate" | "employer">("candidate");
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [experienceYears, setExperienceYears] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const addSkill = () => {
    if (!skill.trim()) return;
    setSkills([...skills, skill.trim()]);
    setSkill("");
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: wire to server function
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    toast.success("Profile saved successfully!");
  };

  return (
    <div className="bg-cream px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Your profile</h1>
          <p className="mt-2 text-muted-foreground">Tell the world who you are and what you are looking for.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile details</CardTitle>
            <CardDescription>This information will be visible to employers and candidates.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>I am a</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={role === "candidate" ? "default" : "outline"}
                    onClick={() => setRole("candidate")}
                    className={role === "candidate" ? "bg-primary text-primary-foreground" : ""}
                  >
                    Candidate
                  </Button>
                  <Button
                    type="button"
                    variant={role === "employer" ? "default" : "outline"}
                    onClick={() => setRole("employer")}
                    className={role === "employer" ? "bg-primary text-primary-foreground" : ""}
                  >
                    Employer
                  </Button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    placeholder="e.g. Alex Rivera"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g. Remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="headline">Headline</Label>
                <Input
                  id="headline"
                  placeholder="e.g. Senior React Developer"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              {role === "candidate" && (
                <>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        placeholder="e.g. 5"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary">Expected salary</Label>
                      <Input
                        id="salary"
                        placeholder="e.g. $80k - $120k"
                        value={expectedSalary}
                        onChange={(e) => setExpectedSalary(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Skills</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g. React"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={addSkill}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((s, index) => (
                        <Badge key={index} variant="secondary" className="gap-1 pr-1">
                          {s}
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="ml-1 rounded-full p-0.5 hover:bg-muted"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="public" className="text-base">
                    Public profile
                  </Label>
                  <p className="text-sm text-muted-foreground">Make your profile discoverable by others.</p>
                </div>
                <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
