import { useState, useRef, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { AIAgent } from "@/lib/aiAgent";
import { User, Bot, Send, Sparkles, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { useHiringStats } from "@/contexts/HiringStatsContext";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI HR Assistant. I can help you plan hiring processes, analyze candidates, schedule interviews, and provide market insights. What hiring challenge can I help you solve today?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Memoize the AI agent to prevent re-instantiation on every render
  const aiAgent = useMemo(() => new AIAgent(), []);

  const { addCandidateToStage, incrementHires, updateStats } = useHiringStats();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard",
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput("");
    setIsLoading(true);

    try {
      console.log("Processing user message:", currentInput);
      
      // Update stats based on user input keywords
      const lowerInput = currentInput.toLowerCase();
      if (lowerInput.includes('candidate') || lowerInput.includes('applicant')) {
        addCandidateToStage("Application Review");
      }
      if (lowerInput.includes('hire') || lowerInput.includes('hired')) {
        incrementHires();
        updateStats({ avgDaysToHire: Math.floor(Math.random() * 20) + 15 });
        updateStats({ avgCostPerHire: Math.floor(Math.random() * 20000) + 70000 });
      }
      if (lowerInput.includes('interview')) {
        addCandidateToStage("Technical Interview");
      }
      if (lowerInput.includes('screen')) {
        addCandidateToStage("Phone Screening");
      }
      
      const response = await aiAgent.processMessage(currentInput);
      console.log("AI response received:", response);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: "ai",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      toast({
        title: "Response Generated",
        description: "AI assistant has provided helpful guidance",
      });
    } catch (error) {
      console.error("Error processing message:", error);
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: "I apologize, but I encountered an error processing your message. Please try again.",
        sender: "ai",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: "Failed to process your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[700px] flex flex-col shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white rounded-t-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <CardTitle className="flex items-center space-x-3 text-xl">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="font-semibold">AI HR Assistant</span>
          </CardTitle>
          <CardDescription className="text-indigo-100 mt-2">
            Your intelligent partner for streamlined hiring and recruitment
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 bg-gradient-to-b from-gray-50 to-white">
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-8">
            {messages.map((message) => (
              <div key={message.id} className={`flex items-start space-x-4 ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                {/* Enhanced Avatar */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                  message.sender === "user" 
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white ring-2 ring-blue-200" 
                    : "bg-gradient-to-br from-purple-500 to-indigo-600 text-white ring-2 ring-purple-200"
                }`}>
                  {message.sender === "user" ? (
                    <User className="w-6 h-6" />
                  ) : (
                    <Bot className="w-6 h-6" />
                  )}
                </div>

                {/* Enhanced Message Content */}
                <div className={`flex-1 max-w-[80%] ${message.sender === "user" ? "flex flex-col items-end" : ""}`}>
                  {/* Message Header */}
                  <div className={`flex items-center space-x-2 mb-2 ${message.sender === "user" ? "justify-end" : ""}`}>
                    <span className="text-sm font-semibold text-gray-700">
                      {message.sender === "user" ? "You" : "AI Assistant"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`group relative rounded-2xl px-6 py-4 shadow-md transition-all duration-200 hover:shadow-lg ${
                    message.sender === "user" 
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white ml-4" 
                      : "bg-white border border-gray-200 mr-4 hover:border-gray-300"
                  }`}>
                    {/* Message Text */}
                    <p className={`whitespace-pre-wrap leading-relaxed text-sm ${
                      message.sender === "user" ? "text-white" : "text-gray-800"
                    }`}>
                      {message.content}
                    </p>
                    
                    {/* AI Message Actions */}
                    {message.sender === "ai" && (
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(message.content)}
                            className="h-8 px-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-gray-500 hover:text-green-600 hover:bg-green-50"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-gray-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </Button>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">AI Response</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Enhanced Loading State */}
            {isLoading && (
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-lg ring-2 ring-purple-200">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-md mr-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-gray-600 text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        
        {/* Enhanced Input Area */}
        <div className="p-6 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about hiring strategies, candidate analysis, scheduling..."
                className="pr-12 h-12 border-2 border-gray-200 focus:border-purple-400 rounded-xl bg-gray-50 focus:bg-white transition-all duration-200 text-sm"
                disabled={isLoading}
              />
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="h-12 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Press Enter to send • Get instant HR guidance and hiring insights
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
