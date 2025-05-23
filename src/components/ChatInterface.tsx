
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { AIAgent } from "@/lib/aiAgent";
import { user, users } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  tools?: string[];
  reasoning?: string[];
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI HR Assistant. I can help you plan hiring processes, analyze candidates, schedule interviews, and provide market insights. What hiring challenge can I help you solve today?",
      sender: "ai",
      timestamp: new Date(),
      tools: ["greeting", "introduction"]
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const aiAgent = new AIAgent();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      console.log("Processing user message:", input);
      
      // Use AI Agent to process the message
      const response = await aiAgent.processMessage(input);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: "ai",
        timestamp: new Date(),
        tools: response.toolsUsed,
        reasoning: response.reasoning
      };

      setMessages(prev => [...prev, aiMessage]);
      
      toast({
        title: "AI Analysis Complete",
        description: `Used ${response.toolsUsed.length} tools for analysis`,
      });
    } catch (error) {
      console.error("Error processing message:", error);
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
    <Card className="h-[600px] flex flex-col shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <users className="w-5 h-5" />
          <span>AI Agent Conversation</span>
        </CardTitle>
        <CardDescription className="text-purple-100">
          Multi-step reasoning with tool integration and memory retention
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100"} rounded-lg p-4`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {message.sender === "user" ? (
                      <user className="w-4 h-4" />
                    ) : (
                      <users className="w-4 h-4" />
                    )}
                    <span className="font-medium">
                      {message.sender === "user" ? "You" : "AI Agent"}
                    </span>
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  
                  {message.tools && message.tools.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium mb-2">Tools Used:</p>
                      <div className="flex flex-wrap gap-1">
                        {message.tools.map((tool, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {message.reasoning && message.reasoning.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium mb-2">Reasoning Steps:</p>
                      <div className="space-y-1">
                        {message.reasoning.map((step, index) => (
                          <p key={index} className="text-xs opacity-80">
                            {index + 1}. {step}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                    <span>AI Agent is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <Separator />
        
        <div className="p-4">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about hiring strategies, candidate analysis, or scheduling..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
