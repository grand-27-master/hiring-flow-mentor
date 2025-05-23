import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Calendar, User } from "lucide-react";

interface MemoryEntry {
  id: string;
  type: "conversation" | "decision" | "insight" | "process";
  title: string;
  content: string;
  timestamp: Date;
  tags: string[];
  confidence: number;
  relatedEntries?: string[];
}

export const MemoryBank = () => {
  const [memories, setMemories] = useState<MemoryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  useEffect(() => {
    // Simulate loading memory entries
    const sampleMemories: MemoryEntry[] = [
      {
        id: "1",
        type: "decision",
        title: "Frontend Developer Hiring Strategy",
        content: "Decided to focus on React expertise with 3+ years experience. Prioritizing candidates from tech companies. Budget allocated: $120K-$140K. Expected timeline: 6 weeks.",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        tags: ["frontend", "react", "strategy", "budget"],
        confidence: 95,
        relatedEntries: ["2", "5"]
      },
      {
        id: "2",
        type: "insight",
        title: "LinkedIn vs Indeed Performance",
        content: "LinkedIn candidates show 40% higher retention rate and 25% faster time-to-hire. Cost per hire is higher but ROI is significantly better for senior roles.",
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        tags: ["linkedin", "indeed", "sourcing", "roi"],
        confidence: 88,
        relatedEntries: ["1", "3"]
      },
      {
        id: "3",
        type: "process",
        title: "Interview Process Optimization",
        content: "Reduced interview rounds from 4 to 3 stages. Added technical pair programming session. Removed redundant behavioral questions. Result: 30% faster hiring.",
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        tags: ["interview", "optimization", "efficiency"],
        confidence: 92,
        relatedEntries: ["2", "4"]
      },
      {
        id: "4",
        type: "conversation",
        title: "Diversity Hiring Discussion",
        content: "Discussed implementing blind resume review and diverse interview panels. Focus on expanding sourcing to include HBCUs and coding bootcamps. Target: 40% diverse candidates.",
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        tags: ["diversity", "inclusion", "sourcing"],
        confidence: 85,
        relatedEntries: ["3"]
      },
      {
        id: "5",
        type: "insight",
        title: "Salary Benchmarking Analysis",
        content: "Market rates for senior developers increased 15% YoY. Our current range is competitive but may need adjustment for top-tier talent. Consider equity component enhancement.",
        timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        tags: ["salary", "market", "compensation"],
        confidence: 90,
        relatedEntries: ["1"]
      }
    ];

    setMemories(sampleMemories);
  }, []);

  const filteredMemories = memories.filter(memory => {
    const matchesSearch = memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memory.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memory.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === "all" || memory.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "conversation": return User;
      case "decision": return Calendar;
      case "insight": return Search;
      case "process": return User;
      default: return User;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "conversation": return "bg-blue-100 text-blue-700";
      case "decision": return "bg-green-100 text-green-700";
      case "insight": return "bg-purple-100 text-purple-700";
      case "process": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Memory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-blue-700">{memories.length}</CardTitle>
            <CardDescription>Total Memories</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-green-700">
              {memories.filter(m => m.type === "decision").length}
            </CardTitle>
            <CardDescription>Key Decisions</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-purple-700">
              {memories.filter(m => m.type === "insight").length}
            </CardTitle>
            <CardDescription>Insights Learned</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-orange-700">
              {Math.round(memories.reduce((acc, m) => acc + m.confidence, 0) / memories.length)}%
            </CardTitle>
            <CardDescription>Avg. Confidence</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Memory Search & Filter</CardTitle>
          <CardDescription>Find specific memories and learnings from past interactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Input
              placeholder="Search memories, decisions, insights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Types</option>
              <option value="conversation">Conversations</option>
              <option value="decision">Decisions</option>
              <option value="insight">Insights</option>
              <option value="process">Processes</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Memory Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Memory Entries ({filteredMemories.length})</CardTitle>
          <CardDescription>AI agent's learned knowledge and decision history</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-4">
              {filteredMemories.map((memory) => {
                const IconComponent = getTypeIcon(memory.type);
                return (
                  <div key={memory.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                        <h4 className="font-semibold">{memory.title}</h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(memory.type)}>
                          {memory.type}
                        </Badge>
                        <Badge variant="outline">
                          {memory.confidence}% confidence
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{memory.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {memory.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {memory.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    
                    {memory.relatedEntries && memory.relatedEntries.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-gray-500 mb-1">Related memories:</p>
                        <div className="flex space-x-1">
                          {memory.relatedEntries.map((relatedId) => (
                            <Button key={relatedId} variant="ghost" size="sm" className="text-xs h-6 px-2">
                              #{relatedId}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Memory Analytics */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🧠</span>
            <span>Memory Analytics</span>
          </CardTitle>
          <CardDescription>How your AI agent learns and improves over time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-indigo-700 mb-2">🎯 Learning Patterns</h4>
              <p className="text-sm text-gray-600">
                The AI agent has identified 12 recurring hiring patterns and successfully applied 
                insights from past decisions to improve current processes by 35%.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-purple-700 mb-2">📈 Decision Accuracy</h4>
              <p className="text-sm text-gray-600">
                Memory-based decisions show 92% accuracy rate. The agent references past successful 
                strategies and avoids previously identified pitfalls.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-semibold text-green-700 mb-2">🔄 Continuous Improvement</h4>
            <p className="text-sm text-gray-600">
              Each interaction adds to the knowledge base. The agent now processes complex hiring scenarios 
              40% faster by leveraging accumulated experience and proven methodologies.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
