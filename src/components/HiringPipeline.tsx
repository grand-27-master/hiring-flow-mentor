
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useHiringStats } from "@/contexts/HiringStatsContext";

const currentOpenings = [
  {
    title: "Senior Frontend Developer",
    department: "Engineering",
    urgency: "High",
    applicants: 0,
    stage: "Not Started"
  },
  {
    title: "Product Manager",
    department: "Product",
    urgency: "Medium",
    applicants: 0,
    stage: "Not Started"
  },
  {
    title: "UX Designer",
    department: "Design",
    urgency: "Low",
    applicants: 0,
    stage: "Not Started"
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    urgency: "High",
    applicants: 0,
    stage: "Not Started"
  }
];

export const HiringPipeline = () => {
  const { stats, addCandidateToStage } = useHiringStats();

  const handleAddCandidate = (stageName: string) => {
    addCandidateToStage(stageName);
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Hiring Pipeline Overview</CardTitle>
          <CardDescription>Current candidate flow across all open positions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {stats.pipelineStages.map((stage, index) => (
              <div key={stage.name} className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{stage.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant={stage.status === "active" ? "default" : "secondary"}>
                        {stage.candidates} candidates
                      </Badge>
                      <span className="text-sm text-gray-500">{stage.percentage}%</span>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleAddCandidate(stage.name)}
                      >
                        Add +1
                      </Button>
                    </div>
                  </div>
                  <Progress value={stage.percentage} className="h-3" />
                </div>
                <div className={`w-4 h-4 rounded-full ${stage.color}`}></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Openings */}
      <Card>
        <CardHeader>
          <CardTitle>Active Job Openings</CardTitle>
          <CardDescription>Current positions and their hiring status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentOpenings.map((opening, index) => (
              <div key={index}>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold">{opening.title}</h4>
                      <Badge variant="outline">{opening.department}</Badge>
                      <Badge 
                        variant={opening.urgency === "High" ? "destructive" : opening.urgency === "Medium" ? "default" : "secondary"}
                      >
                        {opening.urgency} Priority
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{stats.activeCandidates} total candidates in pipeline</span>
                      <span>•</span>
                      <span>Current stage: {opening.stage}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                {index < currentOpenings.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🎯</span>
            <span>AI Pipeline Optimization</span>
          </CardTitle>
          <CardDescription>Smart recommendations based on current activity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.activeCandidates === 0 ? (
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-2">🚀 Get Started</h4>
              <p className="text-sm text-gray-600 mb-3">
                No candidates in the pipeline yet. Start by discussing your hiring needs with the AI assistant 
                to get personalized recommendations and begin building your candidate pipeline.
              </p>
              <Button size="sm" variant="outline">Start Hiring Process</Button>
            </div>
          ) : (
            <>
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-700 mb-2">⚡ Current Status</h4>
                <p className="text-sm text-gray-600 mb-3">
                  You have {stats.activeCandidates} candidates in your pipeline. Great start! 
                  Continue the conversation with AI to optimize your hiring process.
                </p>
                <Button size="sm" variant="outline">View Insights</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
