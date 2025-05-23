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
    
    // Generate contextual response based on the message and conversation history
    const response = this.generateContextualResponse(message);
    
    // Store the AI's response for context
    this.conversationContext.push(`AI: ${response}`);
    
    // Keep only the last 10 messages for context (5 exchanges)
    if (this.conversationContext.length > 10) {
      this.conversationContext = this.conversationContext.slice(-10);
    }
    
    return {
      content: response,
      toolsUsed: [],
      reasoning: []
    };
  }

  private generateContextualResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    const isFirstMessage = this.conversationContext.length <= 1;
    
    // First interaction - warm greeting
    if (isFirstMessage && (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey"))) {
      return "Hi there! 👋 I'm your AI HR assistant. I can help you with hiring strategies, candidate evaluation, interview planning, and market insights. What's your current hiring challenge?";
    }

    // Handle specific hiring request about SDE intern
    if (lowerMessage.includes("sde") || lowerMessage.includes("software") || lowerMessage.includes("intern")) {
      return `Perfect! Hiring a Software Development Engineer (SDE) intern is a great investment. Here's a strategic plan:

**Timeline: 4-6 weeks**
• Week 1-2: Job posting & sourcing
• Week 3-4: Initial screening & technical assessments  
• Week 5-6: Final interviews & offers

**Key Requirements to Define:**
• Programming languages (Java, Python, C++?)
• Specific projects they'll work on
• Mentorship structure you'll provide
• Duration (summer, semester, full-year?)

**Where to Post:**
• University career centers
• GitHub Students, HackerRank
• LinkedIn, Indeed with "intern" keyword
• Tech meetups and career fairs

What's your timeline for this hire? And do you have a specific tech stack in mind?`;
    }

    // Follow-up questions about timeline
    if (lowerMessage.includes("timeline") || lowerMessage.includes("when") || lowerMessage.includes("soon")) {
      return `Got it! Timing is crucial for intern hiring. A few quick questions to refine the plan:

• Is this for a specific semester/summer program?
• Do you need them to start by a certain date?
• Are you competing with big tech companies for the same candidates?

Based on your urgency, I can suggest whether to focus on speed (direct university partnerships) or quality (more thorough screening process). What's your priority?`;
    }

    // Questions about tech stack or requirements
    if (lowerMessage.includes("tech") || lowerMessage.includes("stack") || lowerMessage.includes("skills") || lowerMessage.includes("requirements")) {
      return `Smart to clarify the tech requirements upfront! For SDE interns, here's what I typically recommend:

**Must-Haves:**
• One programming language proficiency (pick your primary one)
• Basic understanding of data structures & algorithms
• Git/version control familiarity

**Nice-to-Haves:**
• Experience with your specific frameworks
• Previous internship or project experience
• Strong communication skills

What technologies does your team primarily use? I can help tailor the job description and screening questions accordingly.`;
    }

    // Budget and compensation questions
    if (lowerMessage.includes("budget") || lowerMessage.includes("pay") || lowerMessage.includes("salary") || lowerMessage.includes("compensation")) {
      return `Intern compensation varies widely! Here's the current market:

**SDE Intern Hourly Rates (2024):**
• Startups: $15-25/hour
• Mid-size companies: $20-35/hour  
• Big tech: $35-60/hour
• Plus potential housing stipends

**Other Considerations:**
• Course credit vs. paid position
• Remote vs. on-site (affects rates)
• Length of internship
• Conversion potential to full-time

What's your company size and location? That'll help me give you more specific guidance.`;
    }

    // Screening and interview process
    if (lowerMessage.includes("screen") || lowerMessage.includes("interview") || lowerMessage.includes("assess") || lowerMessage.includes("evaluate")) {
      return `Great question! For SDE interns, here's an effective screening process:

**Phone/Video Screen (30 mins):**
• Basic coding problem (FizzBuzz level)
• Questions about their projects
• Culture fit assessment

**Technical Interview (60 mins):**
• Live coding session
• System design (simplified for intern level)
• Q&A about their experience

**Final Round (30 mins):**
• Meet the team
• Questions about the role
• Internship expectations

Would you like me to suggest specific coding problems or interview questions for any of these rounds?`;
    }

    // Thank you responses
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks") || lowerMessage.includes("appreciate")) {
      return "You're welcome! Happy to help with your intern hiring. Do you want to dive deeper into any specific part of the process? I can help with job descriptions, screening questions, or sourcing strategies.";
    }

    // Yes/positive responses - ask for more details
    if (lowerMessage.includes("yes") || lowerMessage.includes("yeah") || lowerMessage.includes("sure") || lowerMessage.includes("ok")) {
      return "Perfect! Tell me more details so I can give you specific advice. What aspect of the SDE intern hiring would be most helpful to discuss next?";
    }

    // General hiring questions
    if (lowerMessage.includes("hire") || lowerMessage.includes("recruit")) {
      return "I'd love to help with your hiring needs! Can you tell me more about the specific role? Is this the SDE intern position we discussed, or something else?";
    }

    // Default response that acknowledges context
    const hasHiringContext = this.conversationContext.some(msg => 
      msg.toLowerCase().includes("sde") || msg.toLowerCase().includes("intern") || msg.toLowerCase().includes("hire")
    );

    if (hasHiringContext) {
      return "I want to make sure I'm giving you the most relevant advice for your SDE intern hiring. Could you clarify what specific aspect you'd like to focus on? (timeline, requirements, budget, screening process, etc.)";
    }

    // Completely new conversation
    return "I'm here to help with your hiring challenges! What specific role or hiring situation would you like guidance on?";
  }
}
