
interface AIResponse {
  content: string;
  toolsUsed: string[];
  reasoning: string[];
}

export class AIAgent {
  private memory: Map<string, any> = new Map();
  private conversationHistory: Array<{role: string, content: string}> = [];

  // Simulated AI function calling tools
  private tools = {
    candidateScreening: (criteria: any) => {
      console.log("Tool: Candidate Screening executed with criteria:", criteria);
      return {
        recommendedCandidates: Math.floor(Math.random() * 10) + 5,
        topSkills: ["JavaScript", "React", "Python", "Communication"],
        averageExperience: "3-5 years"
      };
    },

    marketAnalysis: (role: string, location: string) => {
      console.log("Tool: Market Analysis executed for:", role, "in", location);
      return {
        averageSalary: "$" + (Math.floor(Math.random() * 50000) + 70000).toLocaleString(),
        competitionLevel: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
        timeToHire: Math.floor(Math.random() * 30) + 15 + " days"
      };
    },

    interviewScheduling: (candidates: number, interviewers: number) => {
      console.log("Tool: Interview Scheduling executed");
      return {
        suggestedSlots: Math.floor(Math.random() * 20) + 10,
        estimatedDuration: "2-3 weeks",
        recommendedFormat: "Hybrid (Technical + Behavioral)"
      };
    },

    budgetPlanning: (role: string, headcount: number) => {
      console.log("Tool: Budget Planning executed");
      const baseSalary = Math.floor(Math.random() * 40000) + 60000;
      return {
        totalBudget: "$" + (baseSalary * headcount * 1.3).toLocaleString(),
        recruitmentCost: "$" + (baseSalary * 0.15).toLocaleString(),
        onboardingCost: "$" + (5000 * headcount).toLocaleString()
      };
    },

    complianceCheck: (requirements: any) => {
      console.log("Tool: Compliance Check executed");
      return {
        eeoCompliance: "Passed",
        diversityScore: Math.floor(Math.random() * 30) + 70 + "%",
        recommendations: ["Include diverse interview panels", "Use structured interviews"]
      };
    }
  };

  async processMessage(message: string): Promise<AIResponse> {
    // Add to conversation history
    this.conversationHistory.push({ role: "user", content: message });

    // Simulate multi-step reasoning
    const reasoning = this.analyzeMessage(message);
    const toolsToUse = this.selectTools(message);
    const toolResults = this.executeTools(toolsToUse, message);
    const response = this.generateResponse(message, toolResults, reasoning);

    // Store in memory
    this.memory.set(`conversation_${Date.now()}`, {
      userMessage: message,
      aiResponse: response,
      toolsUsed: toolsToUse,
      timestamp: new Date()
    });

    console.log("AI Agent Memory Updated:", this.memory.size, "entries");

    return {
      content: response,
      toolsUsed: toolsToUse,
      reasoning: reasoning
    };
  }

  private analyzeMessage(message: string): string[] {
    const reasoning: string[] = [];
    const lowerMessage = message.toLowerCase();

    reasoning.push("Analyzing user intent and context");

    if (lowerMessage.includes("hire") || lowerMessage.includes("recruit")) {
      reasoning.push("Detected hiring/recruitment intent");
    }

    if (lowerMessage.includes("budget") || lowerMessage.includes("cost")) {
      reasoning.push("Financial planning component identified");
    }

    if (lowerMessage.includes("interview") || lowerMessage.includes("schedule")) {
      reasoning.push("Interview coordination requirements detected");
    }

    if (lowerMessage.includes("candidate") || lowerMessage.includes("applicant")) {
      reasoning.push("Candidate management focus identified");
    }

    reasoning.push("Selecting appropriate tools for comprehensive analysis");
    reasoning.push("Preparing response with actionable insights");

    return reasoning;
  }

  private selectTools(message: string): string[] {
    const tools: string[] = [];
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("candidate") || lowerMessage.includes("screen")) {
      tools.push("candidateScreening");
    }

    if (lowerMessage.includes("market") || lowerMessage.includes("salary") || lowerMessage.includes("competitive")) {
      tools.push("marketAnalysis");
    }

    if (lowerMessage.includes("interview") || lowerMessage.includes("schedule")) {
      tools.push("interviewScheduling");
    }

    if (lowerMessage.includes("budget") || lowerMessage.includes("cost")) {
      tools.push("budgetPlanning");
    }

    if (lowerMessage.includes("compliance") || lowerMessage.includes("diversity")) {
      tools.push("complianceCheck");
    }

    // Default to at least one tool for comprehensive analysis
    if (tools.length === 0) {
      tools.push("candidateScreening", "marketAnalysis");
    }

    return tools;
  }

  private executeTools(toolNames: string[], message: string): any {
    const results: any = {};

    toolNames.forEach(toolName => {
      switch (toolName) {
        case "candidateScreening":
          results.screening = this.tools.candidateScreening({ message });
          break;
        case "marketAnalysis":
          results.market = this.tools.marketAnalysis("Software Engineer", "San Francisco");
          break;
        case "interviewScheduling":
          results.scheduling = this.tools.interviewScheduling(5, 3);
          break;
        case "budgetPlanning":
          results.budget = this.tools.budgetPlanning("Software Engineer", 2);
          break;
        case "complianceCheck":
          results.compliance = this.tools.complianceCheck({ message });
          break;
      }
    });

    return results;
  }

  private generateResponse(message: string, toolResults: any, reasoning: string[]): string {
    let response = "Based on my analysis, here's what I found:\n\n";

    if (toolResults.screening) {
      response += `📊 **Candidate Analysis:**\n`;
      response += `- Recommended candidates to review: ${toolResults.screening.recommendedCandidates}\n`;
      response += `- Top required skills: ${toolResults.screening.topSkills.join(", ")}\n`;
      response += `- Target experience level: ${toolResults.screening.averageExperience}\n\n`;
    }

    if (toolResults.market) {
      response += `💰 **Market Intelligence:**\n`;
      response += `- Average salary range: ${toolResults.market.averageSalary}\n`;
      response += `- Competition level: ${toolResults.market.competitionLevel}\n`;
      response += `- Expected time to hire: ${toolResults.market.timeToHire}\n\n`;
    }

    if (toolResults.scheduling) {
      response += `📅 **Interview Planning:**\n`;
      response += `- Available time slots: ${toolResults.scheduling.suggestedSlots}\n`;
      response += `- Estimated duration: ${toolResults.scheduling.estimatedDuration}\n`;
      response += `- Recommended format: ${toolResults.scheduling.recommendedFormat}\n\n`;
    }

    if (toolResults.budget) {
      response += `💼 **Budget Projection:**\n`;
      response += `- Total hiring budget: ${toolResults.budget.totalBudget}\n`;
      response += `- Recruitment costs: ${toolResults.budget.recruitmentCost}\n`;
      response += `- Onboarding investment: ${toolResults.budget.onboardingCost}\n\n`;
    }

    if (toolResults.compliance) {
      response += `✅ **Compliance & Diversity:**\n`;
      response += `- EEO Compliance: ${toolResults.compliance.eeoCompliance}\n`;
      response += `- Diversity Score: ${toolResults.compliance.diversityScore}\n`;
      response += `- Recommendations: ${toolResults.compliance.recommendations.join(", ")}\n\n`;
    }

    response += "**Next Steps:**\n";
    response += "1. Review the analysis above\n";
    response += "2. Adjust parameters if needed\n";
    response += "3. Proceed with implementation\n";
    response += "4. Monitor progress and iterate\n\n";
    response += "Would you like me to dive deeper into any specific area or help you plan the next phase?";

    return response;
  }

  getMemory(): Map<string, any> {
    return this.memory;
  }

  getConversationHistory(): Array<{role: string, content: string}> {
    return this.conversationHistory;
  }
}
