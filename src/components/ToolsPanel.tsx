
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { search, calendar, user, file, check } from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  status: "active" | "inactive";
  lastUsed?: string;
}

const tools: Tool[] = [
  {
    id: "candidate-screening",
    name: "AI Candidate Screening",
    description: "Automatically analyze resumes and rank candidates based on job requirements",
    icon: user,
    category: "Screening",
    status: "active",
    lastUsed: "2 hours ago"
  },
  {
    id: "market-analysis",
    name: "Market Intelligence",
    description: "Get real-time salary data, competition analysis, and hiring trends",
    icon: search,
    category: "Research",
    status: "active",
    lastUsed: "1 day ago"
  },
  {
    id: "interview-scheduler",
    name: "Smart Scheduler",
    description: "Coordinate interviews across multiple stakeholders with AI optimization",
    icon: calendar,
    category: "Coordination",
    status: "active",
    lastUsed: "3 hours ago"
  },
  {
    id: "budget-planner",
    name: "Budget Optimizer",
    description: "Calculate hiring costs and optimize budget allocation across roles",
    icon: file,
    category: "Planning",
    status: "active",
    lastUsed: "1 week ago"
  },
  {
    id: "compliance-checker",
    name: "Compliance Monitor",
    description: "Ensure hiring processes meet diversity and legal requirements",
    icon: check,
    category: "Compliance",
    status: "active",
    lastUsed: "5 days ago"
  }
];

export const ToolsPanel = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [toolInput, setToolInput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const { toast } = useToast();

  const executeTool = async (tool: Tool) => {
    setIsExecuting(true);
    console.log(`Executing tool: ${tool.name} with input: ${toolInput}`);

    try {
      // Simulate tool execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: `${tool.name} Executed`,
        description: `Tool completed successfully with your input: "${toolInput}"`,
      });

      setToolInput("");
      setSelectedTool(null);
    } catch (error) {
      toast({
        title: "Tool Execution Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const categoryColors: Record<string, string> = {
    "Screening": "bg-blue-100 text-blue-700",
    "Research": "bg-green-100 text-green-700",
    "Coordination": "bg-purple-100 text-purple-700",
    "Planning": "bg-orange-100 text-orange-700",
    "Compliance": "bg-red-100 text-red-700"
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered HR Tools</CardTitle>
          <CardDescription>
            Integrated tools that work seamlessly with your AI agent to streamline hiring processes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Card 
                  key={tool.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedTool?.id === tool.id ? "ring-2 ring-purple-500" : ""
                  }`}
                  onClick={() => setSelectedTool(tool)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <IconComponent className="w-8 h-8 text-purple-600" />
                      <Badge className={categoryColors[tool.category] || "bg-gray-100 text-gray-700"}>
                        {tool.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant={tool.status === "active" ? "default" : "secondary"}>
                        {tool.status}
                      </Badge>
                      {tool.lastUsed && (
                        <span className="text-xs text-gray-500">Used {tool.lastUsed}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tool Execution Panel */}
      {selectedTool && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <selectedTool.icon className="w-5 h-5" />
              <span>Execute: {selectedTool.name}</span>
            </CardTitle>
            <CardDescription>{selectedTool.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tool Parameters</label>
              <Input
                value={toolInput}
                onChange={(e) => setToolInput(e.target.value)}
                placeholder={`Enter parameters for ${selectedTool.name}...`}
                disabled={isExecuting}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={() => executeTool(selectedTool)}
                disabled={isExecuting || !toolInput.trim()}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {isExecuting ? "Executing..." : "Execute Tool"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedTool(null)}
                disabled={isExecuting}
              >
                Cancel
              </Button>
            </div>

            <Separator />

            <div className="text-sm text-gray-600">
              <p><strong>Category:</strong> {selectedTool.category}</p>
              <p><strong>Status:</strong> {selectedTool.status}</p>
              {selectedTool.lastUsed && (
                <p><strong>Last Used:</strong> {selectedTool.lastUsed}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tool Integration Info */}
      <Card>
        <CardHeader>
          <CardTitle>🔗 Tool Integration Status</CardTitle>
          <CardDescription>How these tools work with your AI agent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-700 mb-2">✅ Full Integration Active</h4>
            <p className="text-sm text-gray-600">
              All tools are connected to your AI agent and can be triggered automatically during conversations. 
              The agent will select the most appropriate tools based on your queries and provide comprehensive analysis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h5 className="font-medium text-blue-700 mb-1">Automatic Tool Selection</h5>
              <p className="text-xs text-gray-600">AI chooses the best tools for your specific needs</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <h5 className="font-medium text-purple-700 mb-1">Multi-step Reasoning</h5>
              <p className="text-xs text-gray-600">Complex queries use multiple tools in sequence</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <h5 className="font-medium text-orange-700 mb-1">Result Synthesis</h5>
              <p className="text-xs text-gray-600">Tool outputs are combined into actionable insights</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h5 className="font-medium text-green-700 mb-1">Memory Integration</h5>
              <p className="text-xs text-gray-600">Tool results are stored and referenced in future conversations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
