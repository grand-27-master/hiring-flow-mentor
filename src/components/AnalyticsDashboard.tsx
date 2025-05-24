
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useHiringStats } from "@/contexts/HiringStatsContext";

const sourceData = [
  { name: "LinkedIn", value: 35, color: "#0077b5" },
  { name: "Indeed", value: 25, color: "#003a9b" },
  { name: "Referrals", value: 20, color: "#00a0dc" },
  { name: "Company Site", value: 15, color: "#6366f1" },
  { name: "Other", value: 5, color: "#8b5cf6" },
];

export const AnalyticsDashboard = () => {
  const { stats } = useHiringStats();

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-blue-700">{stats.totalHires}</CardTitle>
            <CardDescription>Total Hires YTD</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Progress value={stats.totalHires > 0 ? Math.min(stats.totalHires * 10, 100) : 0} className="flex-1" />
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {stats.totalHires > 0 ? "+100%" : "0%"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-green-700">{stats.avgDaysToHire}</CardTitle>
            <CardDescription>Avg. Days to Hire</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Progress value={stats.avgDaysToHire > 0 ? Math.max(100 - stats.avgDaysToHire * 2, 0) : 0} className="flex-1" />
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {stats.avgDaysToHire > 0 ? "Tracking" : "N/A"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-purple-700">
              ${stats.avgCostPerHire > 0 ? `${Math.round(stats.avgCostPerHire/1000)}K` : '0'}
            </CardTitle>
            <CardDescription>Avg. Cost per Hire</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Progress value={stats.avgCostPerHire > 0 ? 50 : 0} className="flex-1" />
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {stats.avgCostPerHire > 0 ? "Optimizing" : "N/A"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-orange-700">{stats.retentionRate}%</CardTitle>
            <CardDescription>Retention Rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Progress value={stats.retentionRate} className="flex-1" />
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                Good
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Hiring Trends</CardTitle>
            <CardDescription>Hires and budget allocation over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hires" fill="#6366f1" name="Hires" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Candidate Sources</CardTitle>
            <CardDescription>Where our best candidates come from</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🤖</span>
            <span>AI-Generated Insights</span>
          </CardTitle>
          <CardDescription>Data-driven recommendations from your AI agent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.totalHires === 0 && stats.activeCandidates === 0 ? (
            <div className="p-4 bg-white rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-700 mb-2">🚀 Ready to Start</h4>
              <p className="text-sm text-gray-600">
                No hiring data yet. Start chatting with the AI assistant to begin tracking your hiring metrics and get personalized insights.
              </p>
            </div>
          ) : (
            <>
              <div className="p-4 bg-white rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-700 mb-2">📊 Current Progress</h4>
                <p className="text-sm text-gray-600">
                  You have {stats.activeCandidates} candidates in your pipeline and {stats.totalHires} completed hires. 
                  Keep building your pipeline for better insights.
                </p>
              </div>
              
              {stats.activeCandidates > 5 && (
                <div className="p-4 bg-white rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-700 mb-2">💡 Pipeline Health</h4>
                  <p className="text-sm text-gray-600">
                    Great job! Your pipeline is active with {stats.activeCandidates} candidates. 
                    This is a healthy pipeline size for efficient hiring.
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
