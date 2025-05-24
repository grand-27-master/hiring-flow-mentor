
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatInterface } from "@/components/ChatInterface";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { HiringPipeline } from "@/components/HiringPipeline";
import { HiringStatsProvider } from "@/contexts/HiringStatsContext";
import { Users, Calendar, File } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");
  
  return (
    <HiringStatsProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">AI HR Assistant</h1>
                  <p className="text-purple-100">Intelligent Hiring Process Planning</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  AI Agent Active
                </Badge>
                <Avatar>
                  <AvatarFallback className="bg-white/20 text-white">HR</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white shadow-md">
              <TabsTrigger value="chat" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>AI Chat</span>
              </TabsTrigger>
              <TabsTrigger value="pipeline" className="flex items-center space-x-2">
                <File className="w-4 h-4" />
                <span>Pipeline</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat">
              <ChatInterface />
            </TabsContent>

            <TabsContent value="pipeline">
              <HiringPipeline />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </HiringStatsProvider>
  );
};

export default Index;
