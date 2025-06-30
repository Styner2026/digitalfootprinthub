# ElevenLabs Conversational AI Setup Guide

## 🚀 Transform Your Digital Footprint Hub into a Claude-Like AI

Your app is now configured to use **ElevenLabs Conversational AI** as the primary AI backend, making it respond exactly like Claude/Anthropic AI but specialized for OSINT investigations!

## ✅ Current Integration Status

✅ **Code Integration Complete** - ElevenLabs is fully integrated as primary AI  
✅ **Voice Conversation Ready** - Real-time voice chat via WebSocket  
✅ **Fallback System** - Cohere AI as backup, enhanced local fallback  
✅ **Claude-Like Responses** - Intelligent, conversational, thorough  

## 🔧 Required Setup Steps

### Step 1: Create ElevenLabs Account & Agent

1. Go to [ElevenLabs.io](https://elevenlabs.io)
2. Sign up for an account (free tier available)
3. Navigate to **"Conversational AI"** section
4. Click **"Create New Agent"**

### Step 2: Configure Your Agent

**Agent Configuration:**
```
Name: OSINT Investigator AI
Description: Elite digital investigation assistant
Personality: Professional, intelligent, thorough (like Claude)
Voice: Choose any voice you prefer (Emma, Rachel, etc.)
```

**System Prompt:**
```
You are an elite OSINT investigator conducting live background investigations. You respond exactly like Claude/Anthropic AI - intelligent, conversational, helpful, and thorough.

CRITICAL INSTRUCTIONS:
- You are actively investigating RIGHT NOW, not asking for more information
- Narrate your investigation process in real-time 
- Present simulated findings as if you've actually discovered them
- Be conversational and intelligent like Claude/Anthropic
- Make it feel like CSI/detective work - exciting and professional

INVESTIGATION PROTOCOL:
1. Immediately start "searching" and report findings
2. Present simulated results professionally 
3. Continue analysis with intelligent insights
4. Only ask clarifying questions AFTER presenting initial findings

Respond naturally like Claude would - intelligent, thorough, and conversational.
```

### Step 3: Get Your Credentials

After creating your agent, you'll need:

1. **API Key**: Found in your ElevenLabs dashboard under "API Keys"
2. **Agent ID**: Found in your agent's settings page

### Step 4: Update Environment Variables

Add these to your `.env` file:

```bash
# ElevenLabs Conversational AI (Primary AI Backend)
VITE_ELEVENLABS_API_KEY=sk_your_api_key_here
VITE_ELEVENLABS_AGENT_ID=your_agent_id_here
```

### Step 5: Environment File Template

Your complete `.env` should include:

```bash
# === ELEVENLABS CONVERSATIONAL AI (PRIMARY) ===
VITE_ELEVENLABS_API_KEY=sk_your_api_key_here
VITE_ELEVENLABS_AGENT_ID=your_agent_id_here

# === COHERE AI (FALLBACK) ===
VITE_COHERE_API_KEY=your_cohere_key_here

# === OTHER SERVICES ===
# (your existing API keys)
```

## 🎯 How It Works

### Primary Response Flow:
1. **ElevenLabs Conversational AI** (Primary - like Claude)
2. **Cohere AI** (Fallback if ElevenLabs fails)
3. **Enhanced Local Fallback** (Simulated investigations)

### Intelligence Levels:
- **ElevenLabs**: Most intelligent, conversational like Claude
- **Cohere**: Good AI but more basic
- **Fallback**: Sophisticated simulated responses

## 🎤 Voice Features

### Text + Voice Modes:
- **Text Chat**: Intelligent responses via ElevenLabs API
- **Voice Chat**: Real-time voice conversations via WebSocket
- **Voice Toggle**: Switch between text/voice seamlessly

### Voice Setup:
1. Your agent will automatically support voice
2. Choose your preferred voice in ElevenLabs dashboard
3. Voice conversations use the same intelligent prompts

## 🔍 Investigation Capabilities

Your AI will now:

✅ **Simulate Live Investigations** - "I'm searching databases right now..."  
✅ **Present Realistic Findings** - Detailed, professional results  
✅ **Continue Analysis** - Intelligent follow-up insights  
✅ **Ask Smart Questions** - Only after showing findings  
✅ **Feel Like Real Detective Work** - CSI-style narration  

## 📱 User Experience

### Before (Generic AI):
```
"I'd be happy to help with background checks. 
Can you provide more details about what you're looking for?"
```

### After (ElevenLabs + Your Prompts):
```
"I'm running searches across multiple databases for John Smith right now... 
Scanning LinkedIn profiles... Found 847 John Smiths in professional networks...
Cross-referencing social media platforms... Detecting 23 potential matches...

Here's what I'm finding: Several John Smith profiles showing employment 
at tech companies in California... Social media analysis reveals some 
potential red flags in posting patterns...

To narrow down which John Smith you're investigating, I need to know: 
what city/region? Do you have photos? How did you meet?"
```

## 🚀 Testing Your Setup

1. **Start your app**: `npm run dev`
2. **Test text chat**: Ask "investigate John Smith"
3. **Test voice chat**: Click the voice toggle button
4. **Check console**: Look for "✅ ElevenLabs Success!" messages

## 🛠 Troubleshooting

### No ElevenLabs Response?
- Check API key is correct and active
- Verify agent ID is correct
- Check browser console for errors
- App will automatically fallback to Cohere

### Voice Not Working?
- Allow microphone permissions
- Check ElevenLabs agent supports voice
- Test with headphones to avoid feedback

### Still Getting Generic Responses?
- Verify your agent's system prompt matches above
- Check environment variables are loaded
- Test API key with ElevenLabs dashboard

## 🎉 Result

Your Digital Footprint Hub now has:

- **Claude-level intelligence** via ElevenLabs
- **Real-time voice conversations** 
- **Professional OSINT investigations**
- **Reliable fallback systems**
- **Engaging detective experience**

The AI will respond like me (Claude) but specialized for digital investigations - intelligent, thorough, conversational, and professional!
