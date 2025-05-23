
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const pipelineStages = [
  {
    name: "Application Review",
    candidates: 45,
    status: "active",
    color: "bg-blue-500",
    percentage: 100
  },
  {
    name: "Phone Screening",
    candidates: 18,
    status: "active",
    color: "bg-purple-500",
    percentage: 40
  },
  {
    name: "Technical Interview",
    candidates: 12,
    status: "active",
    color: "bg-indigo-500",
    percentage: 27
  },
  {
    name: "Final Interview",
    candidates: 6,
    status: "pending",
    color: "bg-orange-500",
    percentage: 13
  },
  {
    name: "Offer Stage",
    candidates: 3,
    status: "pending",
    color: "bg-green-500",
    percentage: 7
  }
];

const currentOpenings = [
  {
    title: "Senior Frontend Developer",
    department: "Engineering",
    urgency: "High",
    applicants: 28,
    stage: "Technical Interview"
  },
  {
    title: "Product Manager",
    department: "Product",
    urgency: "Medium",
    applicants: 15,
    stage: "Final Interview"
  },
  {
    title: "UX Designer",
    department: "Design",
    urgency: "Low",
    applicants: 12,
    stage: "Phone Screening"
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    urgency: "High",
    applicants: 8,
    stage: "Application Review"
  }
];

export const HiringPipeline = () => {
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
            {pipelineStages.map((stage, index) => (
              <div key={stage.name} className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{stage.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant={stage.status === "active" ? "default" : "secondary"}>
                        {stage.candidates} candidates
                      </Badge>
                      <span className="text-sm text-gray-500">{stage.percentage}%</span>
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
                      <span>{opening.applicants} applicants</span>
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
          <CardDescription>Smart recommendations to improve your hiring process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-700 mb-2">⚡ Bottleneck Alert</h4>
            <p className="text-sm text-gray-600 mb-3">
              Technical Interview stage has a 67% conversion rate, which is below the 75% benchmark. 
              Consider adjusting the technical assessment difficulty or providing better preparation materials.
            </p>
            <Button size="sm" variant="outline">Apply Suggestion</Button>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-700 mb-2">📊 Performance Insight</h4>
            <p className="text-sm text-gray-600 mb-3">
              Senior Frontend Developer position is moving 30% faster than average. 
              The screening criteria and process should be replicated for similar roles.
            </p>
            <Button size="sm" variant="outline">View Details</Button>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-700 mb-2">🚀 Automation Opportunity</h4>
            <p className="text-sm text-gray-600 mb-3">
              Phone screening can be partially automated using AI-powered pre-screening calls, 
              potentially reducing time-to-hire by 3-4 days.
            </p>
            <Button size="sm" variant="outline">Learn More</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
