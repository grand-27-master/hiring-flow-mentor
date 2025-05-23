interface AIResponse {
  content: string;
  toolsUsed: string[];
  reasoning: string[];
}

export class AIAgent {
  private conversationContext: string[] = [];

  async processMessage(message: string): Promise<AIResponse> {
    console.log("Processing user message:", message);
    
    // Store the user's message for context
    this.conversationContext.push(`User: ${message}`);
    
    // Generate conversational response based on the message
    const response = this.generateConversationalResponse(message);
    
    // Store the AI's response for context
    this.conversationContext.push(`AI: ${response}`);
    
    // Keep only the last 6 messages for context (3 exchanges)
    if (this.conversationContext.length > 6) {
      this.conversationContext = this.conversationContext.slice(-6);
    }
    
    return {
      content: response,
      toolsUsed: [],
      reasoning: []
    };
  }

  private generateConversationalResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Greeting responses
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hi there! 👋 I'm here to help with all your hiring needs. What's on your mind today? Are you looking to hire for a specific role, or do you need help with your overall hiring strategy?";
    }

    // Thank you responses
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're very welcome! Is there anything else I can help you with regarding your hiring process? I'm here whenever you need guidance! 😊";
    }

    // Hiring strategy responses
    if (lowerMessage.includes("hire") || lowerMessage.includes("recruit") || lowerMessage.includes("hiring")) {
      return `Great question about hiring! Let me help you with that. 

What type of role are you looking to fill? The approach can vary quite a bit depending on whether you're hiring for:
• Technical roles (developers, engineers)
• Sales and marketing positions  
• Leadership or executive roles
• Entry-level vs. senior positions

Once I know more about the specific role, I can give you much more targeted advice! What's the position you're working on?`;
    }

    // Candidate screening responses
    if (lowerMessage.includes("candidate") || lowerMessage.includes("screen") || lowerMessage.includes("resume")) {
      return `Ah, candidate screening - one of the most important parts of the process! 🎯

Are you dealing with a lot of applications and need help filtering them down? Or do you have some promising candidates and want to know the best way to evaluate them?

A quick question: What's the role you're screening for? The screening approach is quite different for a software engineer versus a sales rep, for example.`;
    }

    // Interview process responses
    if (lowerMessage.includes("interview")) {
      return `Interviews can make or break a great hire! 💬

Tell me more about where you are in the process:
• Are you designing the interview structure from scratch?
• Do you need help with specific interview questions?
• Are you trying to improve your current interview process?
• Is this for phone screens, technical interviews, or final rounds?

What's your biggest challenge with interviews right now?`;
    }

    // Budget and compensation responses
    if (lowerMessage.includes("budget") || lowerMessage.includes("salary") || lowerMessage.includes("compensation") || lowerMessage.includes("pay")) {
      return `Money talk - always a crucial part of hiring! 💰

What specifically are you trying to figure out?
• Setting a competitive salary range for a role?
• Your overall hiring budget and costs?
• How to negotiate offers effectively?
• Benchmarking against market rates?

Also, what role/level are we talking about? That makes a huge difference in the numbers!`;
    }

    // Market analysis responses
    if (lowerMessage.includes("market") || lowerMessage.includes("competitive") || lowerMessage.includes("industry")) {
      return `Market insights coming up! 📊

What industry or role are you curious about? The job market varies wildly - tech is still competitive for senior roles, while other sectors have cooled down quite a bit.

Are you trying to:
• Understand how long hiring might take?
• Set competitive compensation?
• Figure out where to find the best candidates?
• Beat your competition to top talent?

Give me some details and I'll share what I know about the current landscape!`;
    }

    // Follow up questions and engagement
    if (lowerMessage.includes("yes") || lowerMessage.includes("yeah") || lowerMessage.includes("sure")) {
      return "Perfect! Tell me more about the specifics so I can give you really targeted advice. What's the situation you're dealing with?";
    }

    if (lowerMessage.includes("no") || lowerMessage.includes("not really")) {
      return "No worries! What would be most helpful for you right now? I can help with hiring strategy, candidate evaluation, interview prep, market insights, or anything else HR-related.";
    }

    // Default conversational response
    return `That's an interesting question! 🤔

I want to make sure I give you the most helpful advice possible. Could you tell me a bit more about:
• What's your current situation?
• What specific challenge are you trying to solve?
• What type of role or company are we talking about?

The more context you give me, the better I can tailor my advice to your exact needs!`;
  }
}
