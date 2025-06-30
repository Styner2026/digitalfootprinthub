# API Setup Instructions for Digital Footprint Hub

## What Your Dashboard Needs

Your Digital Footprint Hub is specifically designed for **conversational AI** that helps with cybersecurity, OSINT investigations, and digital safety. The ideal AI service needs to be:

✅ **Conversational & Natural** - Like talking to a human expert  
✅ **Cybersecurity Knowledge** - Understanding of digital investigations  
✅ **Long Response Capability** - Detailed explanations and analysis  
✅ **Reliable & Fast** - Quick responses for real-time chat  

## WHAT TYPE OF AI DOES YOUR DASHBOARD NEED?

**TECHNICAL NAME:** Large Language Model (LLM) with Conversational AI Capabilities

**SPECIFIC TYPE:** Multi-turn Conversational AI with Long-form Response Generation

### Key AI Capabilities Your Dashboard Requires:

🧠 **Large Language Model (LLM)**
- Must be a transformer-based neural network
- Needs 7B+ parameters for quality responses
- Examples: GPT-4, Claude-3.5, Llama-2 70B+

💬 **Conversational AI (Chat Completion)**
- Multi-turn conversation capability
- Context awareness across messages
- Natural dialogue flow (not just single Q&A)

📝 **Long-form Text Generation**
- Can generate 500-2000 word responses
- Maintains coherence across long explanations
- Structured reasoning and detailed analysis

🎯 **Domain-Specific Knowledge**
- Cybersecurity and OSINT expertise
- Investigation methodology understanding
- Digital safety and privacy knowledge

### WHAT WON'T WORK:

❌ **Simple Chatbots** - Too basic, scripted responses
❌ **Classification APIs** - Only categorize, don't generate text
❌ **Embedding Models** - For search/similarity, not conversation
❌ **Small Language Models** (<3B parameters) - Poor conversation quality
❌ **Translation APIs** - Wrong type of AI entirely
❌ **Image Recognition APIs** - Different AI type

### AI ARCHITECTURE REQUIREMENTS:

✅ **Transformer Architecture** - The foundation for modern conversational AI
✅ **Attention Mechanisms** - For understanding context and relationships
✅ **Pre-trained on Conversational Data** - Trained on dialogues, not just text
✅ **Fine-tuned for Chat** - Optimized for back-and-forth conversation
✅ **Instruction Following** - Can follow complex prompts and role-play

## BEST CHOICE: Anthropic Claude API

**Claude API** is perfect for your dashboard because:
- 🎯 **Most conversational AI** - Sounds natural like ElevenLabs
- 🛡️ **Excellent for safety/security topics** - Built-in expertise
- 📝 **Great at detailed explanations** - Perfect for OSINT guidance
- ⚡ **Fast and reliable** - Professional quality responses

### Get Claude API Key:
1. Go to https://console.anthropic.com/
2. Sign up and add billing (starts around $3/month for light usage)
3. Create an API key
4. Add to your `.env` file:
```
VITE_ANTHROPIC_API_KEY=sk-ant-your_claude_key_here
```

## ALTERNATIVE: OpenAI GPT-4

**OpenAI GPT-4** is also excellent:
- 🧠 **Very intelligent** - Great for complex investigations
- 🗣️ **Good conversational ability** - Natural responses
- 📚 **Extensive knowledge** - Covers cybersecurity well
- 🔧 **Easy to integrate** - Well-documented API

### Get OpenAI API Key:
1. Go to https://platform.openai.com/
2. Sign up and add billing (~$0.03 per 1K tokens)
3. Create an API key
4. Add to your `.env` file:
```
VITE_OPENAI_API_KEY=sk-your_openai_key_here
```

## EXCELLENT OPTION: Google Gemini API

**Google Gemini** is another great choice for your dashboard:
- 🧠 **Very intelligent** - Gemini Pro/Ultra models are top-tier
- 🗣️ **Natural conversation** - Good conversational abilities
- 🆓 **Generous free tier** - 15 requests/minute free
- 🔒 **Security focused** - Good for cybersecurity topics
- ⚡ **Fast responses** - Google's infrastructure

### Which Gemini Model to Use:

🥇 **BEST: Gemini-1.5-Pro**
- Most intelligent and conversational
- Perfect for complex OSINT discussions
- 2 million token context (huge conversations)
- Cost: Free tier available, then ~$7/1M tokens

🥈 **GOOD: Gemini-1.0-Pro** 
- Solid conversational ability
- Good for general cybersecurity advice
- Lower cost than 1.5-Pro
- Cost: Free tier, then ~$0.50/1M tokens

❌ **AVOID: Gemini-1.0-Pro-Vision**
- Designed for images, not pure conversation
- Wrong model type for your dashboard

### Get Gemini API Key:
1. Go to https://ai.google.dev/
2. Click "Get API key in Google AI Studio"
3. Create a new project or use existing
4. Generate API key
5. Add to your `.env` file:
```
VITE_GOOGLE_API_KEY=your_gemini_api_key_here
```

### API Endpoint Format:
Gemini uses: `/v1/models/gemini-1.5-pro:generateContent`

## BUDGET OPTION: Cohere (Currently Not Working)

**Cohere AI** has a free tier but your current keys are expired:
- 💰 **Free tier available** - 100 API calls/month
- ⚠️ **Less conversational** - More basic responses  
- 🔧 **Requires new signup** - Your current keys are invalid

## SUMMARY RECOMMENDATION

**For your Digital Footprint Hub, I recommend:**

🥇 **FIRST CHOICE: Anthropic Claude API**
- Perfect match for conversational cybersecurity chat
- Most natural responses (like ElevenLabs quality)
- Built-in safety and security expertise
- Cost: ~$3-10/month for typical usage

🥈 **SECOND CHOICE: OpenAI GPT-4 API**  
- Excellent intelligence and knowledge
- Good conversational ability
- Well-documented and reliable
- Cost: ~$5-15/month for typical usage

🥉 **THIRD CHOICE: Google Gemini API**  
- Very intelligent, especially 1.5-Pro model
- Good conversational abilities
- Generous free tier available
- Cost: Free for 15 requests/minute, then usage-based

💰 **BUDGET CHOICE: New Cohere Account**
- Cheapest option (free tier)
- Basic conversational ability
- Will work but less natural than Claude/GPT-4
- Cost: Free for 100 calls/month

## IMPORTANT: Update Your Code

If you choose Claude or OpenAI instead of Cohere, I'll need to update your code to use the new API. The current code is set up for Cohere, but I can quickly adapt it for whichever service you choose.

## Current Status

**Working Right Now:** Your dashboard provides intelligent responses using the local fallback system (no API key needed)

**To Upgrade:** Choose an AI service above, get an API key, and I'll integrate it for even better responses!

### WHEN SHOPPING FOR APIs, LOOK FOR THESE EXACT TERMS:

🎯 **PRIMARY KEYWORDS TO FIND:**
- "Large Language Model" or "LLM" 
- "Conversational AI" or "Chat Completion"
- "Text Generation" with multi-turn support
- "GPT-style" or "Transformer-based" models
- "Gemini-1.5-Pro" or "Gemini-Pro" (Google's models)

🎯 **API ENDPOINT TYPES YOU NEED:**
- `/chat/completions` (OpenAI-style)
- `/messages` (Anthropic-style) 
- `/generate` with conversation support (Cohere-style)
- `/generateContent` (Google Gemini-style)
- NOT: `/classify`, `/embed`, `/translate`, `/moderate`

🎯 **MODEL SIZE INDICATORS:**
- 7B+ parameters (7 billion or more)
- "Large" or "XL" models
- NOT: "Small", "Base", "Mini" versions

🎯 **AVOID THESE API TYPES:**
- Classification APIs
- Sentiment Analysis APIs  
- Named Entity Recognition (NER)
- Text Embeddings/Vector APIs
- Translation APIs
- Image/Video APIs

### SIMPLE TEST QUESTION FOR ANY AI API:

Ask the provider: **"Can your API generate long, conversational responses like ChatGPT for cybersecurity advice?"**

✅ **If YES** = It's the right type of AI
❌ **If NO** = Wrong type of AI for your dashboard
