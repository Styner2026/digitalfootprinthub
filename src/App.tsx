import { useState, useEffect, useRef } from "react"
import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Separator } from "./components/ui/separator"
import {
  Search,
  Plus,
  Shield,
  CheckCircle,
  Lightbulb,
  Settings,
  AlertTriangle,
  Mic,
  Volume2,
  Send,
  Youtube,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  RefreshCw,
  Play,
  Pause,
  User,
  ChevronDown,
  Brain,
} from "lucide-react"

export default function App() {
  const [judgeMode, setJudgeMode] = useState(true)
  const [sessions, setSessions] = useState([
    {
      id: 1,
      name: "Threat Intel Session...",
      description: "Active investigation... 02:28",
      active: true,
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [messages, setMessages] = useState<Array<{ id: number; type: "user" | "ai" | "thinking"; content: string }>>([])
  const [showPlayButton, setShowPlayButton] = useState(true)

  // Avatar sidebar state
  // Dropdown states removed - display only
  // Audio stream removed - display only
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0)
  const [currentSongVersion, setCurrentSongVersion] = useState(0)

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // FAQ dropdown state
  const [isFaqOpen, setIsFaqOpen] = useState(false)

  // Dashboard dropdown states
  const [isCapabilitiesOpen, setIsCapabilitiesOpen] = useState(false)
  const [isLimitationsOpen, setIsLimitationsOpen] = useState(false)

  // ElevenLabs Voice Integration (display only)

  // Image upload state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadedImageName, setUploadedImageName] = useState<string | null>(null)

  // Chat ref for scroll management
  const chatRef = useRef<HTMLDivElement>(null)

  // Avatar Chat State - NEW CONVERSATIONAL AI
  // Using array destructuring to only use the state variables without the setters
  // since the avatar input functionality was removed
  const [avatarMessages] = useState<Array<{ id: number; type: "user" | "ai"; content: string; timestamp: Date }>>([])
  const [isAvatarThinking] = useState(false)
  // Avatar chat ref removed - display only

  // Audio control functions
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  // Handle audio ended
  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  // Update audio source when song version changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      audioRef.current.load() // Reload the audio element with new source
    }
  }, [currentSongVersion])

  // Song lyrics array for rotation
  const songLyrics = [
    {
      verse: "� \"On a moonlit phone of midnight, your thumb begins to roam,\nPast cryptic grins and glamour pics that beckon from the gloam.\nA profile draped in velvet red—such charm, such eerie grace!\nBut run the checks before you text; beware that pale, cold face.\"",
      attribution: "♪ Swipe of the Night - Verse 1 ♪"
    },
    {
      verse: "💀 \"He sends a late-night coffin emoji—cute or something worse?\nRun that number through our scrying glass; expose the lurking curse.\nIf every post screams 'mortal coil,' if red flags start to creak,\nBolt the gate, delete the chat, don't be the midnight snack this week!\"",
      attribution: "♪ Swipe of the Night - Verse 2 ♪"
    },
    {
      verse: "🕯️ \"First date in a graveyard? Nice aesthetic—listen though:\nMeet where living humans stroll and CCTV can glow.\nPing your hunter-friends, share live-location on your map;\nKeep a getaway carriage waiting—never trust a batty chap!\"",
      attribution: "♪ Swipe of the Night - Verse 3 ♪"
    },
    {
      verse: "🦇 \"Keep your wits, clutch your garlic—don't date before you stake!\nDigital Footprint Hub reveals the phantoms that look fake.\nSwipe alive, stay alive—let the lantern light your way,\nFor love is sweet, but scams will bite and bleed your heart away!\"",
      attribution: "♪ Swipe of the Night - Chorus ♪"
    }
  ]

  // Song versions for audio guide navigation
  const songVersions = [
    {
      name: "Acoustic Version",
      description: "Gothic acoustic guitar with haunting vocals - perfect for intimate listening",
      url: "https://pub-b5d9a50f6cc04d78835c4d16883b5aea.r2.dev/dfh-assets/dfh-music/SwipeoftheNight.mp3"
    },
    {
      name: "Electronic Version",
      description: "Dark synthwave beats with vampire vibes - energetic club remix",
      url: "https://pub-b5d9a50f6cc04d78835c4d16883b5aea.r2.dev/dfh-assets/dfh-music/smooth-SwipeoftheNight.mp3"
    }
  ]

  // Rotate lyrics every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLyricIndex((prev) => (prev + 1) % songLyrics.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [songLyrics.length])

  // Data arrays removed - display only

  // Camera toggle functionality (removed - display only)
  // Get camera icon color class (removed - display only)

  // Close dropdowns when clicking outside
  const handleClickOutside = () => {
    setShowSuggestions(false)
  }

  // Handle image upload for scam analysis
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (JPG, PNG, GIF, etc.)')
        return
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size must be less than 10MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string
        setUploadedImage(imageDataUrl)
        setUploadedImageName(file.name)

        // Auto-populate input with image analysis request
        setInputValue(`Can you check if this image "${file.name}" is fake or manipulated?`)
      }
      reader.readAsDataURL(file)
    }
  }

  // Clear uploaded image
  const clearUploadedImage = () => {
    setUploadedImage(null)
    setUploadedImageName(null)
    // Clear the file input
    const fileInput = document.getElementById('image-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  // Scroll chat to bottom
  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }

  // Scroll avatar chat to bottom


  // ElevenLabs-Powered Conversational AI (Claude-Level Intelligence)
  const generateAIResponse = async (userQuery: string): Promise<string> => {
    console.log('🔍 Starting ElevenLabs-Powered AI Response for:', userQuery)

    try {
      // Option 1: Try Google Gemini API (PAID PLAN - UNLIMITED!)
      const geminiKey = import.meta.env.VITE_GOOGLE_API_KEY || import.meta.env.GEMINI_API_KEY
      if (geminiKey && geminiKey.length > 10) {
        console.log('🧠 MAIN DASHBOARD: Trying Google Gemini AI...')
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 15000)

          // Build conversation context for better responses
          const conversationHistory = messages.slice(-6).map(msg =>
            msg.type === 'user' ? `User: ${msg.content}` :
              msg.type === 'ai' ? `Assistant: ${msg.content}` : ''
          ).filter(Boolean).join('\n')

          const geminiPrompt = `${conversationHistory ? `Previous conversation:\n${conversationHistory}\n\n` : ''}User: "${userQuery}"${uploadedImage ? `\n\n[User has uploaded an image: ${uploadedImageName}]` : ''}

You are a professional cybersecurity AI assistant with access to live OSINT and threat intelligence tools. Be conversational like ChatGPT/Claude/Copilot.

REAL-TIME TOOLS YOU CAN REFERENCE:
🔍 **Data Breach Analysis**: HaveIBeenPwned API for instant breach lookup
⚡ **Malware Analysis**: ANY.RUN interactive sandbox + VirusTotal 70+ engines  
📊 **Threat Intelligence**: Live ENISA, IC3, NIST threat feeds
🏢 **Company Verification**: SEC filings, BBB records, Whois data
📱 **Social Media OSINT**: Cross-platform profile analysis (Instagram, LinkedIn, Twitter, TikTok)
🔍 **Google Dorking**: Advanced search operators from OSINT Framework
₿ **Crypto Forensics**: Chainalysis + TRM Labs blockchain analysis
🕷️ **Dark Web Intel**: Tor network monitoring for leaked data
📋 **Full OSINT Reports**: Multi-source intelligence with PDF export
🛡️ **Security Audits**: App permissions, privacy, vulnerability scanning

Key behaviors:
- Natural conversation - no formal headers or lengthy explanations
- Be concise and direct, like Copilot's responses
- Understand context immediately (if they say "Chase Bank" they likely want to investigate it)
- **MENTION SPECIFIC TOOLS** when relevant (e.g., "I'll check HaveIBeenPwned for breaches")
- Provide actionable next steps with tool references
- Ask ONE clarifying question max, then provide help

${uploadedImage ? 'Analyze the uploaded image for scam indicators, deepfakes, or manipulation using reverse image search and metadata analysis.' : ''}

Respond naturally and conversationally, mentioning relevant tools.`

          const parts: Array<{ text?: string; inline_data?: { mime_type: string; data: string } }> = [{
            text: geminiPrompt
          }]

          // Add image to request if uploaded
          if (uploadedImage) {
            const base64Data = uploadedImage.split(',')[1]
            const mimeType = uploadedImage.split(',')[0].split(':')[1].split(';')[0]

            parts.push({
              inline_data: {
                mime_type: mimeType,
                data: base64Data
              }
            })
          }

          const requestBody = {
            contents: [{
              parts: parts
            }],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 600,
              topP: 0.9,
            }
          }

          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: controller.signal,
            body: JSON.stringify(requestBody)
          })

          clearTimeout(timeoutId)

          if (response.ok) {
            const data = await response.json()
            console.log('✅ MAIN DASHBOARD: Google Gemini AI Success!')

            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
              const aiResponse = data.candidates[0].content.parts[0].text.trim()
              console.log('📝 MAIN DASHBOARD: Generated Gemini response:', aiResponse.substring(0, 100) + '...')
              return aiResponse
            }
          } else {
            const errorText = await response.text()
            console.error('❌ MAIN DASHBOARD: Gemini AI Error:', response.status, errorText)
          }
        } catch (geminiError: unknown) {
          const errorMessage = geminiError instanceof Error ? geminiError.message : 'Unknown error'
          console.error('❌ MAIN DASHBOARD: Gemini AI Failed:', errorMessage)
        }
      }


      // Option 2: Try Cohere AI as backup
      const cohereKey = import.meta.env.VITE_COHERE_API_KEY ||
        import.meta.env.VITE_COHERE_API_KEY_ALT

      if (cohereKey && cohereKey.length > 10) {
        console.log('🧠 MAIN DASHBOARD: Trying Cohere AI...')
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 10000)

          const response = await fetch('https://api.cohere.ai/v1/generate', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${cohereKey}`,
              'Content-Type': 'application/json',
            },
            signal: controller.signal,
            body: JSON.stringify({
              model: 'command',
              prompt: `You're a professional cybersecurity expert with access to live OSINT tools. User said: "${userQuery}". 

Available tools: HaveIBeenPwned (breaches), ANY.RUN + VirusTotal (malware), ENISA/IC3/NIST (threats), SEC/BBB/Whois (companies), Social Media OSINT, Google Dorking, Chainalysis (crypto), Dark Web Intel, Security Audits.

Respond naturally like ChatGPT - mention specific tools when relevant, be helpful and conversational.`,
              max_tokens: 400,
              temperature: 0.8,
              truncate: 'END'
            })
          })

          clearTimeout(timeoutId)

          if (response.ok) {
            const data = await response.json()
            console.log('✅ MAIN DASHBOARD: Cohere AI Success!')

            if (data.generations && data.generations[0] && data.generations[0].text) {
              const aiResponse = data.generations[0].text.trim()
              console.log('📝 MAIN DASHBOARD: Generated Cohere response:', aiResponse.substring(0, 100) + '...')
              return aiResponse
            }
          } else {
            const errorText = await response.text()
            console.error('❌ MAIN DASHBOARD: Cohere AI Error:', response.status, errorText)
          }
        } catch (cohereError: unknown) {
          const errorMessage = cohereError instanceof Error ? cohereError.message : 'Unknown error'
          console.error('❌ MAIN DASHBOARD: Cohere AI Failed:', errorMessage)
        }
      }

      // Enhanced fallback with tool mentions
      console.log('🤖 Using Enhanced Fallback with Tool References')

      // Smart fallback based on query content
      if (userQuery.toLowerCase().includes('breach') || userQuery.toLowerCase().includes('password') || userQuery.toLowerCase().includes('email')) {
        return `I'd normally check HaveIBeenPwned's database for you, but I'm having connection issues. Try asking again and I'll look up any breaches for that email instantly.`
      }

      if (userQuery.toLowerCase().includes('malware') || userQuery.toLowerCase().includes('virus') || userQuery.toLowerCase().includes('file')) {
        return `I'd run this through ANY.RUN's sandbox and VirusTotal's 70+ antivirus engines, but I'm having connection issues. Give me a sec to reconnect and I'll analyze that file for you.`
      }

      if (userQuery.toLowerCase().includes('company') || userQuery.toLowerCase().includes('business') || userQuery.toLowerCase().includes('legit')) {
        return `I'd check SEC filings, BBB records, and Whois data for you, but I'm having connection issues. Try again and I'll verify that company's legitimacy.`
      }

      if (userQuery.toLowerCase().includes('crypto') || userQuery.toLowerCase().includes('bitcoin') || userQuery.toLowerCase().includes('transaction')) {
        return `I'd analyze this with Chainalysis and TRM Labs' blockchain forensics, but I'm having connection issues. Ask again and I'll trace that crypto transaction.`
      }

      return `Having some connection issues with my OSINT tools right now. Mind trying that again? I've got HaveIBeenPwned, ANY.RUN, ENISA feeds, and more ready to help.`

    } catch (error) {
      console.error('❌ Critical Error in AI Response:', error)
      return `Sorry, my OSINT toolkit is having technical difficulties. Can you try asking again? I've got some powerful tools ready to help you investigate.`
    }
  }

  const handleVerification = async () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: "user" as const,
      content: inputValue,
    }
    setMessages((prev) => [...prev, userMessage])

    // Add thinking bubble
    const thinkingMessage = {
      id: Date.now() + 1,
      type: "thinking" as const,
      content: "",
    }
    setMessages((prev) => [...prev, thinkingMessage])
    setInputValue("")
    setIsThinking(true)

    // Scroll to bottom after adding user message and thinking bubble
    setTimeout(() => scrollToBottom(), 100)

    try {
      // Record start time for minimum thinking bubble duration
      const startTime = Date.now()
      const minThinkingDuration = 2500 // 2.5 seconds minimum

      // Generate real AI response
      const aiResponse = await generateAIResponse(userMessage.content)

      // Clear uploaded image after processing
      if (uploadedImage) {
        clearUploadedImage()
      }

      // Calculate remaining time to ensure minimum bubble display
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, minThinkingDuration - elapsedTime)

      // Wait for remaining time if needed, then remove thinking bubble
      setTimeout(() => {
        setIsThinking(false)

        // Remove thinking message and add AI response
        setMessages((prev) => {
          const withoutThinking = prev.filter((msg) => msg.type !== "thinking")
          return [
            ...withoutThinking,
            {
              id: Date.now() + 2,
              type: "ai" as const,
              content: aiResponse,
            },
          ]
        })

        // Scroll to bottom after adding message
        setTimeout(() => scrollToBottom(), 100)
      }, remainingTime)

    } catch (error) {
      console.error('Verification Error:', error)

      // Even on error, maintain minimum thinking time
      setTimeout(() => {
        setIsThinking(false)

        // Fallback error response
        const errorResponse = `Something went wrong on my end. Mind trying that again?`

        setMessages((prev) => {
          const withoutThinking = prev.filter((msg) => msg.type !== "thinking")
          return [
            ...withoutThinking,
            {
              id: Date.now() + 2,
              type: "ai" as const,
              content: errorResponse,
            },
          ]
        })

        // Scroll to bottom after adding error message
        setTimeout(() => scrollToBottom(), 100)
      }, 2500) // 2.5 seconds minimum even on error
    }
  }

  const handleRefresh = () => {
    // Clear all messages and reset to initial state
    setMessages([])
    setInputValue("")
    setIsThinking(false)
    // Reset sessions to initial state
    setSessions([
      {
        id: 1,
        name: "Threat Intel Session...",
        description: "Active investigation... 02:28",
        active: true,
      },
    ])
  }

  // Voice conversation functions removed - display only mode

  return (
    <div className="min-h-screen bg-dark-bg" onClick={handleClickOutside}>
      {/* Top Navigation Bar - Rounded and contained with dividers */}
      <div className="pt-4 px-6 flex justify-center">
        <header
          className="flex items-center px-8 py-3 rounded-lg border mx-auto max-w-fit overflow-hidden relative z-50 bg-dark-header border-dark-bg-lighter"
        >
          <div className="flex items-center">
            <div className="flex items-center space-x-3 pr-8">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-black" />
              </div>
              <span className="text-white font-medium text-base whitespace-nowrap">Digital Footprint Hub</span>
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-gray-600 mr-8"></div>

            <nav className="flex items-center space-x-8 text-sm">
              <a href="#" className="text-white hover:text-green-400">
                Home
              </a>
              <a href="#" className="text-white hover:text-green-400">
                Features
              </a>
              <a href="#" className="text-white hover:text-green-400">
                About
              </a>
              <a href="#" className="text-white hover:text-green-400">
                Contact
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-3 ml-6">
            {/* Divider */}
            <div className="w-px h-5 bg-gray-600 mr-4"></div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-white bg-transparent text-xs h-7 whitespace-nowrap"
              >
                <Search className="w-3 h-3 mr-1" />
                Global Footprint Alerts
              </Button>

              {/* Divider */}
              <div className="w-px h-5 bg-gray-600 mx-2"></div>

              <div className="flex items-center space-x-3 mx-4">
                <span className="text-sm text-white whitespace-nowrap">Judge Mode</span>
                <div
                  className={`w-8 h-4 rounded-full cursor-pointer transition-colors ${judgeMode ? "bg-green-500" : "bg-gray-600"}`}
                  onClick={() => setJudgeMode(!judgeMode)}
                >
                  <div
                    className={`w-3 h-3 bg-white rounded-full mt-0.5 transition-transform ${judgeMode ? "translate-x-4" : "translate-x-0.5"}`}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-5 bg-gray-600 mx-2"></div>

              {/* Refresh Button - Added to top navigation */}
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-white bg-transparent text-xs h-7 whitespace-nowrap hover:bg-gray-700"
                onClick={handleRefresh}
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Refresh
              </Button>

              {/* Divider */}
              <div className="w-px h-5 bg-gray-600 mx-2"></div>

              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-black text-xs h-7 whitespace-nowrap">
                Upgrade
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-white bg-transparent text-xs h-7 whitespace-nowrap"
              >
                My Website
              </Button>
            </div>
          </div>
        </header>
      </div>

      {/* Main Dashboard Container - Now separate from navbar */}
      <div className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-8 relative z-0">
          {/* Dashboard Card - No header inside */}
          <div
            className="rounded-lg border overflow-hidden relative z-10 bg-dark-content border-dark-bg-lighter h-[calc(100vh-200px)] shadow-2xl shadow-black/40 hover:shadow-3xl hover:shadow-black/50 transition-all duration-500"
          >
            {/* Dashboard Header with Tab Navigation */}
            <div className="border-b border-dark-bg-lighter bg-[#1a1a1a] px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center space-x-1 bg-[#2a2a2a] rounded-lg p-1">
                    <button
                      className="flex items-center space-x-2 px-4 py-2 bg-[#404040] text-white rounded-md text-sm font-medium hover:bg-[#4a4a4a] transition-colors cursor-pointer"
                      onClick={() => window.open('https://www.fbi.gov/investigate/cyber', '_blank')}
                      title="Visit FBI Cyber Investigations"
                    >
                      <Search className="w-4 h-4" />
                      <span>Live Investigations</span>
                    </button>
                    <button
                      className="flex items-center space-x-2 px-4 py-2 bg-[#404040] text-white rounded-md text-sm font-medium hover:bg-[#4a4a4a] transition-colors cursor-pointer"
                      onClick={() => window.open('https://www.cisa.gov/cybersecurity', '_blank')}
                      title="Visit CISA Cybersecurity Center"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Threat Intelligence</span>
                    </button>
                    <button
                      className="flex items-center space-x-2 px-4 py-2 bg-[#404040] text-white rounded-md text-sm font-medium hover:bg-[#4a4a4a] transition-colors cursor-pointer"
                      onClick={() => window.open('https://www.nist.gov/cyberframework', '_blank')}
                      title="Visit NIST Cybersecurity Framework"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Risk Assessment</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live Dashboard</span>
                </div>
              </div>
            </div>

            {/* Main Content - Remove the header section */}
            <div className="flex h-full">
              {/* Left Sidebar */}
              <div className="w-64 border-r p-4 bg-dark-sidebar border-dark-bg-lighter">
                <div className="mb-6">
                  <h1 className="text-lg font-semibold mb-1 text-white">Digital Investigation Controls</h1>
                  <p className="text-xs text-gray-400">Comprehensive cybersecurity investigations and OSINT analysis</p>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-white">Active Investigations</span>
                    <RefreshCw
                      className="w-4 h-4 text-green-500 cursor-pointer hover:text-green-400 transition-colors"
                      onClick={handleRefresh}
                    />
                  </div>

                  <div className="relative mb-3">
                    <Search className="w-3 h-3 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      placeholder="Search sessions"
                      className="pl-8 h-8 text-xs bg-[#2a2a2a] text-white placeholder-gray-500 focus:ring-green-500 focus:border-green-500 border-dark-bg-lighter"
                    />
                  </div>

                  <div className="space-y-2">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className={`rounded p-2 hover:bg-[#1f1f1f] cursor-pointer transition-colors ${session.active ? "bg-[#2a2a2a]" : "bg-[#1a1a1a]"
                          }`}
                        onClick={() => {
                          setSessions(
                            sessions.map((s) => ({
                              ...s,
                              active: s.id === session.id,
                            })),
                          )
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${session.active ? "bg-green-500" : "bg-gray-600"}`}
                          />
                          <div>
                            <div className="text-xs text-white">{session.name}</div>
                            <div className="text-xs text-gray-500">{session.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Content */}
              <div className="flex-1 bg-dark-content">
                {/* Chat Messages Area */}
                <div className="h-full flex flex-col">
                  <div
                    ref={chatRef}
                    className={`flex-1 p-8 ${messages.length > 0 ? 'overflow-y-auto custom-scrollbar' : ''}`}
                  >
                    {messages.length === 0 ? (
                      <>
                        <div className="text-center mb-12">
                          <div
                            className="w-16 h-16 border rounded-full mx-auto mb-6 flex items-center justify-center border-dark-bg-lighter"
                          >
                            <Shield className="w-8 h-8 text-gray-400" />
                          </div>
                          <h2 className="text-2xl font-semibold mb-3 text-white">What digital investigation can I help you with today?</h2>
                          <p className="text-gray-400">Comprehensive threat intelligence and OSINT investigations powered by AI</p>
                        </div>

                        {/* Dropdowns for Capabilities and Limitations */}
                        <div className="flex justify-center space-x-8 mb-12">
                          {/* Capabilities Dropdown */}
                          <div className="relative">
                            <button
                              onClick={() => setIsCapabilitiesOpen(!isCapabilitiesOpen)}
                              className="flex items-center space-x-2 px-6 py-3 bg-[#2a2a2a] hover:bg-[#1f1f1f] rounded-lg border border-[#404040] transition-all duration-300"
                            >
                              <Settings className="w-4 h-4 text-white" />
                              <span className="font-medium text-white">Capabilities</span>
                              <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${isCapabilitiesOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isCapabilitiesOpen && (
                              <div className="absolute top-full left-0 mt-2 w-80 bg-[#1a1a1a] border border-[#404040] rounded-lg shadow-xl z-50">
                                <div className="p-4 space-y-3">
                                  <div className="p-3 bg-[#2a2a2a] rounded-lg">
                                    <p className="text-sm text-white">I can analyze emails, images, social media, and help verify people and companies</p>
                                  </div>
                                  <div className="p-3 bg-[#2a2a2a] rounded-lg">
                                    <p className="text-sm text-white">I spot deepfakes, scams, and suspicious activities across multiple platforms</p>
                                  </div>
                                  <div className="p-3 bg-[#2a2a2a] rounded-lg">
                                    <p className="text-sm text-white">I provide real-time insights to help you make safer digital decisions</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Limitations Dropdown */}
                          <div className="relative">
                            <button
                              onClick={() => setIsLimitationsOpen(!isLimitationsOpen)}
                              className="flex items-center space-x-2 px-6 py-3 bg-[#2a2a2a] hover:bg-[#1f1f1f] rounded-lg border border-[#404040] transition-all duration-300"
                            >
                              <AlertTriangle className="w-4 h-4 text-white" />
                              <span className="font-medium text-white">Limitations</span>
                              <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${isLimitationsOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isLimitationsOpen && (
                              <div className="absolute top-full left-0 mt-2 w-80 bg-[#1a1a1a] border border-[#404040] rounded-lg shadow-xl z-50">
                                <div className="p-4 space-y-3">
                                  <div className="p-3 bg-[#2a2a2a] rounded-lg">
                                    <p className="text-sm text-white">I only work with publicly available information - nothing invasive or illegal</p>
                                  </div>
                                  <div className="p-3 bg-[#2a2a2a] rounded-lg">
                                    <p className="text-sm text-white">I need you to share the content you want me to analyze</p>
                                  </div>
                                  <div className="p-3 bg-[#2a2a2a] rounded-lg">
                                    <p className="text-sm text-white">I help you stay safe, but you make the final decisions</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Examples - Horizontal Layout in Pairs */}
                        <div className="mb-12">
                          <div className="flex items-center justify-center space-x-2 mb-8">
                            <Lightbulb className="w-5 h-5 text-white" />
                            <span className="text-lg font-medium text-white">Investigation Examples</span>
                          </div>

                          {/* Grid of investigation cards - 4 columns with 8 cards total (2 rows) */}
                          <div className="grid grid-cols-4 gap-4 max-w-6xl mx-auto">
                            {/* Card 1: Email Scam Detection */}
                            <Card
                              className="bg-[#2a2a2a] cursor-pointer hover:bg-[#1f1f1f] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 shadow-lg shadow-black/30 border border-[#404040]/50 relative overflow-hidden"
                              onClick={() => setInputValue("Is this email a scam or phishing attempt?")}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
                              <CardContent className="p-3 relative z-10">
                                <p className="text-sm text-white font-medium leading-relaxed">"Is this email a scam or phishing attempt?"</p>
                              </CardContent>
                            </Card>

                            {/* Card 2: Company Verification */}
                            <Card
                              className="bg-[#2a2a2a] cursor-pointer hover:bg-[#1f1f1f] transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 shadow-lg shadow-black/30 border border-[#404040]/50 relative overflow-hidden"
                              onClick={() => setInputValue("Check if this company is legit")}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
                              <CardContent className="p-3 relative z-10">
                                <p className="text-sm text-white font-medium leading-relaxed">"Check if this company is legit"</p>
                              </CardContent>
                            </Card>

                            {/* Card 3: Image Analysis */}
                            <Card
                              className="bg-[#2a2a2a] cursor-pointer hover:bg-[#1f1f1f] transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-1 shadow-lg shadow-black/30 border border-[#404040]/50 relative overflow-hidden"
                              onClick={() => setInputValue("Is this image fake or edited?")}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent"></div>
                              <CardContent className="p-3 relative z-10">
                                <p className="text-sm text-white font-medium leading-relaxed">"Is this image fake or edited?"</p>
                              </CardContent>
                            </Card>

                            {/* Card 4: Person Verification */}
                            <Card
                              className="bg-[#2a2a2a] cursor-pointer hover:bg-[#1f1f1f] transition-all duration-300 hover:shadow-xl hover:shadow-red-500/20 hover:-translate-y-1 shadow-lg shadow-black/30 border border-[#404040]/50 relative overflow-hidden"
                              onClick={() => setInputValue("Who can I help you verify today?")}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"></div>
                              <CardContent className="p-3 relative z-10">
                                <div className="flex items-center space-x-2">
                                  <Shield className="w-4 h-4 text-red-400" />
                                  <p className="text-sm text-white font-medium leading-relaxed">"Who can I help you verify today?"</p>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Card 5: Profile Analysis */}
                            <Card
                              className="bg-[#2a2a2a] cursor-pointer hover:bg-[#1f1f1f] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 shadow-lg shadow-black/30 border border-[#404040]/50 relative overflow-hidden"
                              onClick={() => setInputValue("Which profile can I analyze for you?")}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
                              <CardContent className="p-3 relative z-10">
                                <div className="flex items-center space-x-2">
                                  <User className="w-4 h-4 text-blue-400" />
                                  <p className="text-sm text-white font-medium leading-relaxed">"Which profile can I analyze for you?"</p>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Card 6: Social Media Checker */}
                            <Card
                              className="bg-[#2a2a2a] cursor-pointer hover:bg-[#1f1f1f] transition-all duration-300 hover:shadow-xl hover:shadow-purple-600/20 hover:-translate-y-1 shadow-lg shadow-black/30 border border-[#404040]/50 relative overflow-hidden"
                              onClick={() => setInputValue("Social Media Checker")}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent"></div>
                              <CardContent className="p-3 relative z-10">
                                <div className="flex items-center space-x-2">
                                  <Brain className="w-4 h-4 text-purple-400" />
                                  <p className="text-sm text-white font-medium leading-relaxed">"Social Media Checker"</p>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Card 7: Data Breach Check */}
                            <Card
                              className="bg-[#2a2a2a] cursor-pointer hover:bg-[#1f1f1f] transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 shadow-lg shadow-black/30 border border-[#404040]/50 relative overflow-hidden"
                              onClick={() => setInputValue("Has this email been in any data breaches?")}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
                              <CardContent className="p-3 relative z-10">
                                <div className="flex items-center space-x-2">
                                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-0.257-0.257A6 6 0 1118 8zM10 2a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
                                  </svg>
                                  <p className="text-sm text-white font-medium leading-relaxed">"Has this email been in any data breaches?"</p>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Card 8: Dating & Safety Checks */}
                            <Card
                              className="bg-[#2a2a2a] cursor-pointer hover:bg-[#1f1f1f] transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1 shadow-lg shadow-black/30 border border-[#404040]/50 relative overflow-hidden"
                              onClick={() => setInputValue("Dating & Safety Checks")}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent"></div>
                              <CardContent className="p-3 relative z-10">
                                <div className="flex items-center space-x-2">
                                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                  </svg>
                                  <p className="text-sm text-white font-medium leading-relaxed">"Dating & Safety Checks"</p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-6">
                        {messages.map((message) => (
                          <div key={message.id} className="flex flex-col space-y-2">
                            {message.type === "user" && (
                              <div className="flex justify-end">
                                <div className="bg-green-500 text-black px-4 py-2 rounded-lg max-w-md shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300 hover:-translate-y-0.5">
                                  <p className="text-sm">{message.content}</p>
                                </div>
                              </div>
                            )}
                            {/* LOCK:THINKING_BUBBLE_ANIMATION */}
                            {message.type === "thinking" && (
                              <div className="flex justify-start">
                                <div className="bg-green-500 rounded-full p-4 flex items-center justify-center animate-pulse shadow-2xl shadow-green-500/40">
                                  <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-white rounded-full animate-bounce shadow-sm"></div>
                                    <div
                                      className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.1s] shadow-sm"
                                    ></div>
                                    <div
                                      className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s] shadow-sm"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {/* END LOCK */}
                            {message.type === "ai" && (
                              <div className="flex justify-start">
                                <div className="bg-[#0f0f0f] border border-green-500 rounded-lg p-4 max-w-2xl shadow-2xl shadow-green-500/20 hover:shadow-3xl hover:shadow-green-500/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent"></div>
                                  <div className="flex items-center space-x-2 mb-2 relative z-10">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/50"></div>
                                    <span className="text-green-400 font-semibold text-sm">
                                      Digital Footprint AI
                                    </span>
                                    <div className="text-xs text-gray-400 bg-green-500/10 px-2 py-1 rounded">
                                      OSINT Expert
                                    </div>
                                  </div>
                                  <div className="text-white whitespace-pre-line text-sm leading-relaxed relative z-10">
                                    {message.content}
                                  </div>
                                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-green-500/20 relative z-10">
                                    <div className="text-xs text-gray-500">
                                      Cybersecurity Investigation Assistant
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                      <span className="text-xs text-green-400 ml-1">Live</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Input Area - Fixed at bottom - Adjusted position */}
                  <div className="px-4 pt-4 pb-2 border-t-2 border-dark-bg-lighter sticky bottom-0 bg-dark-content z-10">
                    {/* Image Preview Section */}
                    {uploadedImage && (
                      <div className="mb-4 p-4 bg-[#1a1a1a] rounded-lg border border-green-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-green-400 font-medium">
                            📸 Image uploaded for analysis: {uploadedImageName}
                          </span>
                          <button
                            onClick={clearUploadedImage}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            ✕ Clear
                          </button>
                        </div>
                        <div className="flex items-center space-x-3">
                          <img
                            src={uploadedImage}
                            alt="Uploaded for analysis"
                            className="w-16 h-16 object-cover rounded border border-gray-600"
                          />
                          <div className="text-xs text-gray-400">
                            Ready for scam analysis, deepfake detection, and image verification
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-1 hover:bg-gray-600 rounded transition-colors cursor-pointer"
                        onClick={() => setShowSuggestions(!showSuggestions)}
                        title="Click to see search suggestions"
                      >
                        <Search className="w-5 h-5 text-gray-400 hover:text-green-400 transition-colors" />
                      </button>
                      <Input
                        placeholder="What digital investigation do you need help with?"
                        className="bg-[#2a2a2a] text-white placeholder-gray-500 pl-12 pr-32 h-16 text-base focus:ring-green-500 focus:border-green-500 border-dark-bg-lighter py-4"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && inputValue.trim() && !isThinking) {
                            handleVerification()
                            setShowSuggestions(false)
                          }
                          if (e.key === "Escape") {
                            setShowSuggestions(false)
                          }
                        }}
                        disabled={isThinking}
                      />

                      {/* Suggested Searches Dropdown */}
                      {showSuggestions && (
                        <div className="absolute bottom-full left-0 mb-2 w-72 bg-[#1a1a1a] border border-[#404040] rounded-lg shadow-xl z-50 max-h-72 overflow-y-auto">
                          <div className="p-2 border-b border-[#404040]">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xs font-medium text-white">Quick Templates</h3>
                              <button
                                onClick={() => setShowSuggestions(false)}
                                className="text-gray-400 hover:text-white text-xs"
                              >
                                ✕
                              </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">Click to use</p>
                          </div>
                          <div className="p-1 space-y-0.5">
                            {[
                              "Email Scam Check",
                              "Company Verification",
                              "Image Analysis",
                              "Person Verification",
                              "Profile Analysis",
                              "General Verification",
                              "Search Template",
                              "Breach Check",
                              "Malware Analysis",
                              "Upload Image",
                              "Phone Scam Check",
                              "Latest Threats",
                              "Investment Check",
                              "Address Check",
                              "Crypto Analysis",
                              "Dark Web Check",
                              "Full OSINT Report",
                              "App Security Risk"
                            ].map((suggestion) => (
                              <button
                                key={suggestion}
                                onClick={() => {
                                  setInputValue(suggestion)
                                  setShowSuggestions(false)
                                }}
                                className="w-full text-left px-2 py-1.5 text-xs text-white hover:bg-[#2a2a2a] rounded transition-colors duration-200 border border-transparent hover:border-green-500/30"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                        {/* Image Upload Button */}
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer p-1 hover:bg-gray-600 rounded transition-colors"
                          title="Upload image for scam analysis"
                        >
                          <svg className="w-5 h-5 text-gray-400 hover:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          aria-label="Upload image for scam analysis"
                        />
                        <Mic className="w-5 h-5 text-gray-400 cursor-pointer hover:text-green-400 transition-colors" />
                        <Volume2 className="w-5 h-5 text-gray-400 cursor-pointer hover:text-green-400 transition-colors" />
                        <div
                          className="rounded-full p-2 bg-[#404040] cursor-pointer hover:bg-green-500 transition-colors"
                          onClick={() => {
                            if (inputValue.trim() && !isThinking) {
                              handleVerification()
                            }
                          }}
                        >
                          <Send className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - AI Assistant Display */}
              <aside className="w-64 transition-all duration-300 ease-in-out border-l right-sidebar flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="right-sidebar-content flex flex-col h-full" onClick={(e) => e.stopPropagation()}>
                  <div className="ai-assistant-header p-4 border-b border-dark-bg-lighter">
                    <h2 className="text-sm font-medium text-white mr-2">AI Assistant</h2>
                    <div className="ai-assistant-status">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400 font-medium">OSINT AI Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Spacer to push content down but not all the way to bottom */}
                  <div className="flex-1 max-h-16"></div>

                  {/* Avatar Display Section - Positioned lower but not at bottom */}
                  <div className="avatar-display-section p-4">

                    {/* Detective Weasel Avatar */}
                    <div className="avatar-container mb-6 flex justify-center">
                      <img
                        src="https://pub-b5d9a50f6cc04d78835c4d16883b5aea.r2.dev/dfh-assets/dfh-avator/2.Detective-Weasel-Avator.png"
                        alt="Detective Weasel Avatar"
                        className="w-80 h-80"
                      />
                    </div>

                    {/* AI Status Information */}
                    <div className="ai-status-info mt-6 p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-white">AI Intelligence Status</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">OSINT Analysis</span>
                          <span className="text-green-400">Active</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Threat Detection</span>
                          <span className="text-green-400">Ready</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Conversation</span>
                          <span className="text-blue-400">Standby</span>
                        </div>
                      </div>
                    </div>

                    {/* Digital Footprint Hub Logo */}
                    <div className="mt-4 flex justify-center">
                      <img
                        src="https://pub-b5d9a50f6cc04d78835c4d16883b5aea.r2.dev/dfh-assets/white_circle_360x360%20(2).png"
                        alt="Digital Footprint Hub Logo"
                        className="w-20 h-20 opacity-70 hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>

                    {/* Chat Messages Display (Read-only) */}
                    {avatarMessages.length > 0 && (
                      <div className="chat-display mt-4">
                        <div className="text-xs text-gray-400 mb-2">Recent Conversations ({avatarMessages.length})</div>
                        <div className="h-32 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 p-2 bg-gray-800/30 rounded">
                          {avatarMessages.slice(-3).map((message) => (
                            <div key={message.id} className={`text-xs mb-2 ${message.type === 'user' ? 'text-blue-300' : 'text-gray-300'}`}>
                              <span className="font-medium">{message.type === 'user' ? 'User' : 'AI'}:</span> {message.content.substring(0, 50)}...
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Thinking Indicator */}
                    {isAvatarThinking && (
                      <div className="thinking-display mt-4 p-2 bg-blue-900/30 rounded">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]"></div>
                            <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]"></div>
                            <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]"></div>
                          </div>
                          <span className="text-xs text-blue-400">AI is processing...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </div>

          {/* Add Button - Now Interactive */}
          <div className="absolute bottom-4 left-4 z-20">
            <Button
              size="icon"
              className="w-12 h-12 bg-green-500 hover:bg-green-600 text-black rounded-full transition-all hover:scale-110"
              onClick={() => {
                const newSession = {
                  id: sessions.length + 1,
                  name: `Investigation ${sessions.length + 1}`,
                  description: `Threat analysis... 00:00`,
                  active: false,
                }
                setSessions([...sessions, newSession])
              }}
            >
              <Plus className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Music Generator Section - New Addition */}
      {/* Music Generator Section - Now in a Box */}
      <div className="py-8 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-8">
          {/* Main Container Box - Same style as Live Scam Detection Feed */}
          <div
            className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-3 shadow-dark-soft"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Left side - Content */}
              <div>
                <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                  Digital Footprint Hub Meets
                  <br />
                  Your Safety & Verification Needs
                </h2>

                <p className="text-gray-400 text-base mb-6 leading-relaxed">
                  From dating safety to business verification, from social media checks to investment protection, our
                  AI-powered platform provides comprehensive background verification across various scenarios, helping
                  you make informed decisions and stay protected in today's digital world.
                </p>

                {/* Category Buttons */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-4 p-3 bg-[#2a2a2a] rounded-lg border border-[#404040] cursor-pointer hover:bg-[#1f1f1f] transition-all duration-300 shadow-md shadow-black/20 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-0.5">
                    <div className="w-5 h-5 text-white">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10.2V11H16V16H8V11H9.2V10.2C9.2 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.4 8.7 10.4 10.2V11H13.6V10.2C13.6 8.7 12.8 8.2 12 8.2Z" />
                      </svg>
                    </div>
                    <span className="text-white font-medium">Dating & Relationship Safety</span>
                  </div>

                  <div className="flex items-center space-x-4 p-3 bg-[#161616] rounded-lg border border-[#2a2a2a] cursor-pointer hover:bg-[#1f1f1f] transition-colors">
                    <div className="w-5 h-5 text-gray-400">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
                      </svg>
                    </div>
                    <span className="text-gray-400 font-medium">Investment & Financial Protection</span>
                  </div>

                  <div className="flex items-center space-x-4 p-3 bg-[#161616] rounded-lg border border-[#2a2a2a] cursor-pointer hover:bg-[#1f1f1f] transition-colors">
                    <div className="w-5 h-5 text-gray-400">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" />
                      </svg>
                    </div>
                    <span className="text-gray-400 font-medium">General Background Checks</span>
                  </div>
                </div>
              </div>

              {/* Right side - Avatar Video Area */}
              <div className="relative">
                {/* Avatar Video Container */}
                <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-resolved/20 to-medium-risk/20 border border-resolved/30">
                  <div className="aspect-video relative">
                    {/* Tavus AI Avatar Video */}
                    <video
                      className="w-full h-full rounded-lg object-cover"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      onClick={(e) => {
                        const video = e.target as HTMLVideoElement;
                        if (video.muted) {
                          video.muted = false;
                          setShowPlayButton(false);
                        }
                      }}
                    >
                      <source
                        src="https://pub-b5d9a50f6cc04d78835c4d16883b5aea.r2.dev/dfh-assets/dfh-videos/styner_replica_training_video.mp4"
                        type="video/mp4"
                      />
                      {/* Fallback for browsers that don't support video */}
                      <div className="text-center p-8">
                        <div className="w-32 h-32 bg-gradient-to-br from-resolved to-medium-risk rounded-full mx-auto mb-6 flex items-center justify-center">
                          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-white text-xl font-semibold mb-2">AI Safety Assistant</h3>
                        <p className="text-gray-300 text-sm">Click to learn how Digital Footprint Hub protects you</p>
                      </div>
                    </video>

                    {/* Transparent Play Button Overlay - Only show when muted */}
                    {showPlayButton && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-20 h-20 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40 transition-all duration-300">
                          <svg className="w-8 h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-medium">Ready to Help</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.85 14,18.71V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Dating & Relationship Safety</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Protect yourself before meeting someone new. Our comprehensive verification system analyzes social
                    media profiles, background records, and digital footprints to help you make informed decisions about
                    potential romantic partners and avoid dangerous situations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Romance Scam Awareness Dashboard */}
      <div className="py-16 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Most Trending Romance Scam Awareness from Community</h2>
            <p className="text-gray-400 max-w-4xl mx-auto">
              From dating app safety to investment fraud warnings, our community shares real experiences and expert
              advice to help you identify and avoid romance scams before they happen.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-1 bg-[#2a2a2a] rounded-lg p-1">
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#404040] text-white rounded-md text-sm font-medium">
                <Youtube className="w-4 h-4" />
                <span>Scam Alerts</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white rounded-md text-sm font-medium">
                <Shield className="w-4 h-4" />
                <span>Safety Tips</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white rounded-md text-sm font-medium">
                <AlertTriangle className="w-4 h-4" />
                <span>Red Flags</span>
              </button>
            </div>
          </div>
   className="group cursor-pointer"
            
          {/* YouTube Thumbnails Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Video 1 */}
            <a
              href="https://www.youtube.com/watch?v=_6hKErybcBo"
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer"
            >
              <div className="relative bg-[#161616] rounded-lg overflow-hidden border border-[#2a2a2a] hover:border-red-500 transition-all duration-300 shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-red-500/20 hover:-translate-y-2">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src="https://img.youtube.com/vi/_6hKErybcBo/maxresdefault.jpg"
                    alt="Romance scam victim lost $500,000"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    12:34
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-white font-semibold mb-2 group-hover:text-red-400 transition-colors h-12 flex items-center">
                    How I Lost $50K to a Romance Scammer
                  </h4>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>2.1M views</span>
                    <span>3 days ago</span>
                  </div>
                </div>
              </div>
            </a>

            {/* Video 2 */}
            <a
              href="https://youtu.be/GGrWRJfe9So?si=RYhiqmvv30qT0VM4"
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer"
            >
              <div className="relative bg-[#161616] rounded-lg overflow-hidden border border-[#2a2a2a] hover:border-orange-500 transition-all duration-300 shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-2">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src="https://img.youtube.com/vi/GGrWRJfe9So/maxresdefault.jpg"
                    alt="Fake Investment Romance Scam Exposed"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    18:45
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-white font-semibold mb-2 group-hover:text-orange-400 transition-colors h-12 flex items-center">
                    Fake Investment Romance Scam Exposed
                  </h4>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>890K views</span>
                    <span>1 week ago</span>
                  </div>
                </div>
              </div>
            </a>

            {/* Video 3 */}
            <a
              href="https://youtu.be/K4KIh-aVueQ?si=59hTabqMCxDfrCC1"
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer"
            >
              <div className="relative bg-[#161616] rounded-lg overflow-hidden border border-[#2a2a2a] hover:border-green-500 transition-all duration-300 shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-2">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src="https://img.youtube.com/vi/K4KIh-aVueQ/maxresdefault.jpg"
                    alt="10 Red Flags of Romance Scammers"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    15:22
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-white font-semibold mb-2 group-hover:text-green-400 transition-colors h-12 flex items-center">
                    10 Red Flags of Romance Scammers
                  </h4>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>1.5M views</span>
                    <span>5 days ago</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Dating & Relationship Safety Section - Enhanced with Premium 2D Effects */}
      <div className="py-16 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-[#3a3a3a] shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-black/60 transition-all duration-500 relative overflow-hidden">
              {/* Subtle background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-[#4dd0e1]/5 rounded-2xl"></div>

              {/* Header */}
              <div className="mb-8 relative z-10 text-center">
                <h1 className="text-3xl font-semibold mb-2">
                  <span className="text-[#d4af37] drop-shadow-lg">🎵 Stay Safe, Stay Smart</span>
                </h1>
                <p className="text-[#a0a0a0] text-lg font-light">
                  Your Dating Safety Anthem
                </p>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                {/* Left Section - Song Lyrics */}
                <div className="space-y-4">
                  {/* Safety Information Box with Rectangular Border - Fixed Height */}
                  <div className="border-2 border-[#4a4a4a] rounded-lg p-6 bg-[#1f1f1f]/50 shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-[#d4af37]/10 transition-all duration-300 hover:border-[#d4af37]/50 h-[280px] flex flex-col">
                    <div className="text-[#808080] text-sm font-medium mb-6">🎵 Song Lyrics</div>
                    <div className="text-[#b0b0b0] leading-relaxed flex-1 flex flex-col justify-center">
                      <div className="rotating-lyrics transition-all duration-500 ease-in-out">
                        <p className="mb-3 whitespace-pre-line text-center">
                          <em>{songLyrics[currentLyricIndex].verse}</em>
                        </p>

                        <p className="text-[#d4af37] text-sm font-medium text-center">
                          {songLyrics[currentLyricIndex].attribution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section - Audio Guide */}
                <div className="space-y-4">
                  {/* Audio Guide Box with Rectangular Border - Fixed Height */}
                  <div className="border-2 border-[#4a4a4a] rounded-lg p-6 bg-[#1f1f1f]/50 shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-[#4dd0e1]/10 transition-all duration-300 hover:border-[#4dd0e1]/50 h-[280px] flex flex-col">
                    <div className="text-[#808080] text-sm font-medium mb-3">🎧 Audio Guide</div>

                    {/* Title with Navigation Arrows */}
                    <div className="flex items-center justify-center mb-4 space-x-4">
                      <button
                        className="p-2 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#4a4a4a] transition-all duration-300 hover:shadow-lg hover:shadow-[#4dd0e1]/20 hover:-translate-y-0.5"
                        title="Previous version"
                        aria-label="Previous song version"
                        onClick={() => setCurrentSongVersion((prev) => (prev - 1 + songVersions.length) % songVersions.length)}
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 111.414-1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>

                      <div className="text-white text-xl font-semibold text-center">
                        Listen & Learn
                        <div className="text-xs text-[#4dd0e1] font-normal mt-1">
                          {songVersions[currentSongVersion].name} ({currentSongVersion + 1} of {songVersions.length})
                        </div>
                      </div>

                      <button
                        className="p-2 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#4a4a4a] transition-all duration-300 hover:shadow-lg hover:shadow-[#4dd0e1]/20 hover:-translate-y-0.5"
                        title="Next version"
                        aria-label="Next song version"
                        onClick={() => setCurrentSongVersion((prev) => (prev + 1) % songVersions.length)}
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    {/* Audio Player - Enhanced with Premium Effects */}
                    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#3a3a3a] shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-[#4dd0e1]/20 transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden mb-4">
                      {/* Subtle inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4dd0e1]/5 to-transparent rounded-lg"></div>

                      {/* Hidden audio element */}
                      <audio
                        ref={audioRef}
                        onEnded={handleAudioEnded}
                        preload="metadata"
                      >
                        <source src={songVersions[currentSongVersion].url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>

                      <div className="flex items-center space-x-4 relative z-10">
                        <button
                          className="bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-full p-3 transition-all duration-300 border border-[#3a3a3a] shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-[#4dd0e1]/20 hover:-translate-y-0.5 hover:scale-105"
                          onClick={togglePlayPause}
                          title={isPlaying ? "Pause dating safety audio guide" : "Play dating safety audio guide"}
                          aria-label={isPlaying ? "Pause dating safety audio guide" : "Play dating safety audio guide"}
                        >
                          {isPlaying ? (
                            <Pause className="w-5 h-5 text-white fill-white drop-shadow-sm" />
                          ) : (
                            <Play className="w-5 h-5 text-white fill-white drop-shadow-sm" />
                          )}
                        </button>

                        {/* Waveform Visualization - Enhanced */}
                        <div className={`flex-1 flex items-center justify-center h-12 bg-[#0f0f0f] rounded overflow-hidden shadow-inner border border-[#2a2a2a]/50 relative ${isPlaying ? 'waveform-playing' : ''}`}>
                          {/* Subtle background gradient */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#4dd0e1]/10 via-transparent to-[#4dd0e1]/10"></div>

                          <div className="flex items-end space-x-0.5 h-8 w-full justify-center relative z-10">
                            {Array.from({ length: 80 }).map((_, i) => (
                              <div
                                key={i}
                                className="dating-waveform-bar"
                                data-height={Math.random() * 70 + 15}
                                data-opacity={Math.random() * 0.5 + 0.5}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-[#b0b0b0] leading-relaxed text-center flex-1 flex items-center justify-center text-sm">
                      {songVersions[currentSongVersion].description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Footprint Protection Banner - Exact Color Match */}
      <div className="py-16 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-8">
          <div
            className="relative rounded-2xl overflow-hidden bg-golden-gradient min-h-[400px]"
          >
            {/* Background decorative elements - golden stars */}
            <div className="absolute inset-0">
              <div className="absolute top-16 right-32 w-1 h-1 bg-white/60 rounded-full"></div>
              <div className="absolute top-24 right-48 w-1 h-1 bg-white/40 rounded-full"></div>
              <div className="absolute top-32 right-40 w-1 h-1 bg-white/70 rounded-full"></div>
              <div className="absolute bottom-24 right-56 w-1 h-1 bg-white/50 rounded-full"></div>
            </div>

            <div className="relative flex items-center h-full">
              {/* Left side - Text content */}
              <div className="flex-1 p-12 pr-8">
                <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                  Unlock Your Safety with
                  <br />
                  Digital Footprint Hub
                </h2>

                <p className="text-white/90 text-base mb-4 leading-relaxed">
                  Digital Footprint Hub makes personal safety verification easier than ever with AI-powered tools that
                  transform names, profiles, and social media into comprehensive background reports in seconds. Whether
                  you're dating, hiring, or investing, our AI verification and scam detection helps you make informed
                  decisions effortlessly—no investigative skills required.
                </p>

                <p className="text-white/90 text-base mb-4 leading-relaxed">
                  Digital Footprint Hub helps you save time and stay safe while providing you with a vast library of
                  verification tools, customizable search options, and multilingual support. Whether you're checking
                  someone's background, verifying social media profiles, or exploring red flags, Digital Footprint Hub
                  is your go-to tool for unlocking unlimited protective potential.
                </p>

                <p className="text-white/90 text-base leading-relaxed">
                  Start your safety journey today and discover how Digital Footprint Hub revolutionizes personal
                  verification—making it faster, easier, and more accessible than ever before.
                </p>
              </div>

              {/* Right side - Image with warm lighting */}
              <div className="flex-1 relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-yellow-500/30 to-amber-400/20 rounded-r-2xl"></div>

                {/* Main verification visual with warm golden tones */}
                <div className="relative h-full flex items-center justify-center p-8">
                  <div className="relative">
                    {/* Person using computer for verification with golden lighting */}
                    <div className="w-80 h-80 bg-gradient-to-br from-amber-500 via-orange-400 to-yellow-500 rounded-full flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="relative text-center text-white">
                        <Shield className="w-20 h-20 mx-auto mb-4" />
                        <div className="text-lg font-semibold">VERIFICATION</div>
                        <div className="text-lg font-semibold">COMPLETE</div>
                      </div>
                    </div>

                    {/* Floating verification status card with warm theme */}
                    <div className="absolute top-8 left-8 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-amber-400/50">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        <span className="text-amber-300 text-sm font-medium">Background Check</span>
                      </div>
                      <div className="text-white text-xs">Safety Score: 9.2/10</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Google Analytics Scam Dashboard */}
      <div className="py-16 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-8">
          {/* Live Analytics Feed */}
          <div
            className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-6 shadow-dark-medium"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-lg">Live Scam Detection Feed</h3>
              <div className="flex items-center space-x-4">
                <select
                  className="bg-[#2a2a2a] text-white text-sm rounded px-3 py-1 border border-[#404040]"
                  aria-label="Filter scam detection by platform"
                >
                  <option>All Platforms</option>
                  <option>Dating Apps</option>
                  <option>Social Media</option>
                  <option>Email</option>
                </select>
                <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-1 rounded text-sm font-medium">
                  Export Data
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Live Feed Item 1 */}
              <div className="flex items-center space-x-4 p-4 bg-[#161616] rounded-lg border-l-4 border-red-500">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-red-400 font-semibold">CRITICAL ALERT</span>
                    <span className="text-gray-400 text-sm">2 seconds ago</span>
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">Romance Scam</span>
                  </div>
                  <p className="text-white text-sm">
                    New romance investment scam detected on Tinder - 47 users at risk
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                    <span>📍 Location: Global</span>
                    <span>👥 Affected: 47 users</span>
                    <span>💰 Avg Loss: $2,340</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">98.7%</div>
                  <div className="text-gray-400 text-xs">Confidence</div>
                </div>
              </div>

              {/* Live Feed Item 2 */}
              <div className="flex items-center space-x-4 p-4 bg-[#161616] rounded-lg border-l-4 border-orange-500">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-orange-400 font-semibold">HIGH RISK</span>
                    <span className="text-gray-400 text-sm">15 seconds ago</span>
                    <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs">Crypto Scam</span>
                  </div>
                  <p className="text-white text-sm">
                    Fake crypto recovery service spreading across LinkedIn and Twitter
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                    <span>📍 Location: US, UK, CA</span>
                    <span>👥 Affected: 23 users</span>
                    <span>💰 Avg Loss: $5,670</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">94.2%</div>
                  <div className="text-gray-400 text-xs">Confidence</div>
                </div>
              </div>

              {/* Live Feed Item 3 */}
              <div className="flex items-center space-x-4 p-4 bg-[#161616] rounded-lg border-l-4 border-yellow-500">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-yellow-400 font-semibold">MEDIUM RISK</span>
                    <span className="text-gray-400 text-sm">1 minute ago</span>
                    <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">Fake Profile</span>
                  </div>
                  <p className="text-white text-sm">
                    Suspicious profile verification requests detected on professional networks
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                    <span>📍 Location: EU</span>
                    <span>👥 Affected: 12 users</span>
                    <span>💰 Avg Loss: $890</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">87.5%</div>
                  <div className="text-gray-400 text-xs">Confidence</div>
                </div>
              </div>

              {/* Live Feed Item 4 */}
              <div className="flex items-center space-x-4 p-4 bg-[#161616] rounded-lg border-l-4 border-green-500">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-green-400 font-semibold">RESOLVED</span>
                    <span className="text-gray-400 text-sm">3 minutes ago</span>
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Emergency Block</span>
                  </div>
                  <p className="text-white text-sm">
                    Emergency money request scam successfully blocked - 156 users protected
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                    <span>📍 Location: Global</span>
                    <span>👥 Protected: 156 users</span>
                    <span>💰 Saved: $45,230</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">99.1%</div>
                  <div className="text-gray-400 text-xs">Confidence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs About Digital Footprint Hub */}
      <div className="py-16 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-8">
          {/* FAQ Container Box with Dropdown */}
          <div className="bg-[#2a2a2a] rounded-2xl border border-[#3a3a3a] shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-black/60 transition-all duration-500 relative overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/3 to-purple-500/5 rounded-2xl"></div>

            {/* Header - Always Visible */}
            <div
              className="p-8 cursor-pointer relative z-10 hover:bg-[#333333]/50 transition-all duration-300 rounded-t-2xl"
              onClick={() => setIsFaqOpen(!isFaqOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">FAQs About Digital Footprint Hub</h2>
                  <p className="text-gray-400 max-w-3xl mx-auto">
                    Get answers to the most common questions about our platform, safety verification services, and how to protect yourself in the digital world.
                  </p>
                </div>

                {/* Dropdown Arrow */}
                <div className="ml-6">
                  <div className={`w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 ${isFaqOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Collapsible Content */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isFaqOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-8 pb-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* FAQ Item 1 */}
                  <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#4a4a4a] shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-green-500/30">
                          <span className="text-black font-bold text-sm">Q</span>
                        </div>
                        What is Digital Footprint Hub?
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        Digital Footprint Hub is an AI-powered platform that helps you verify people's backgrounds before dating, hiring, or investing. We analyze social media profiles, public records, and digital footprints to provide comprehensive safety reports in seconds.
                      </p>
                    </div>
                  </div>

                  {/* FAQ Item 2 */}
                  <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#4a4a4a] shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-blue-500/30">
                          <span className="text-white font-bold text-sm">Q</span>
                        </div>
                        How accurate are the verification results?
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        Our AI analyzes over 47 data sources and uses advanced algorithms to provide 95%+ accuracy in background verification. However, results should always be used as one factor in your decision-making process alongside your personal judgment.
                      </p>
                    </div>
                  </div>

                  {/* FAQ Item 3 */}
                  <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#4a4a4a] shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-purple-500/30">
                          <span className="text-white font-bold text-sm">Q</span>
                        </div>
                        Is my personal information safe?
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        Absolutely. We use enterprise-grade encryption and never store your search history or personal data. All verification requests are anonymized and processed securely. Your privacy and security are our top priorities.
                      </p>
                    </div>
                  </div>

                  {/* FAQ Item 4 */}
                  <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#4a4a4a] shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute inset0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-orange-500/30">
                          <span className="text-white font-bold text-sm">Q</span>
                        </div>
                        What types of checks can I perform?
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        You can verify dating profiles, check business partners, analyze social media authenticity, run background checks, detect investment scams, and verify professional credentials. Our platform covers all major verification needs.
                      </p>
                    </div>
                  </div>

                  {/* FAQ Item 5 */}
                  <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#4a4a4a] shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent rounded-xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-teal-500/30">
                          <span className="text-white font-bold text-sm">Q</span>
                        </div>
                        How fast are the verification results?
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        Most verification reports are generated in 2-5 seconds using our AI-powered analysis. Complex background checks may take up to 30 seconds depending on the depth of information available across our data sources.
                      </p>
                    </div>
                  </div>

                  {/* FAQ Item 6 */}
                  <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#4a4a4a] shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-red-500/30">
                          <span className="text-white font-bold text-sm">Q</span>
                        </div>
                        What if someone has no digital footprint?
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        A lack of digital presence can be a red flag itself. Our system will alert you when someone has unusually limited online activity, which could indicate fake profiles, privacy-conscious individuals, or potential scammers using stolen identities.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Help Section - Inside the dropdown */}
                <div className="mt-8">
                  <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] shadow-xl shadow-black/40 max-w-2xl mx-auto relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/15 via-blue-500/10 to-purple-500/15 rounded-xl"></div>
                    <div className="relative z-10 text-center">
                      <h3 className="text-xl font-semibold text-white mb-3">Still have questions?</h3>
                      <p className="text-gray-300 mb-6 text-sm">
                        Our support team is here to help you stay safe in the digital world. Get personalized assistance with your verification needs.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 text-sm">
                          Contact Support
                        </button>
                        <button className="border border-gray-600 text-white hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/20 hover:-translate-y-0.5 text-sm">
                          Live Chat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* White Section */}
      {/* Modernized CTA Section - Premium Dark Gradient */}
      <div className="py-16 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-8">
          <div
            className="relative rounded-2xl overflow-hidden bg-dark-gradient border border-dark-bg-lighter min-h-[300px] shadow-dark-subtle"
          >
            {/* Subtle animated background effects */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.1),transparent_70%)]"></div>
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(34,197,94,0.05),transparent_70%)]"></div>
            </div>

            {/* Content */}
            <div className="relative text-center max-w-4xl mx-auto px-6 py-16">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-green-500/25">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-white leading-tight">
                Enhance your digital safety with
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-300">
                  Digital Footprint Hub
                </span>
              </h2>
              <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                "Don't date before you scrape. Don't hire before you inquire. Don't invest before you test."
              </p>
              <p className="text-white font-semibold text-xl">
                Digital Footprint Hub —<span className="text-green-400">Investigate before you trust.</span>
              </p>

              {/* Subtle decorative elements */}
              <div className="flex justify-center mt-8 space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-green-400 rounded-full animate-pulse [animation-delay:0.5s]"
                ></div>
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse [animation-delay:1s]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HACKATHON WINNER BANNER - ULTRA FAST & DYNAMIC */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-black py-16 overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.3),transparent_70%)] animate-pulse-fast"></div>
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(34,197,94,0.2),transparent_70%)] animate-pulse-fast [animation-delay:0.5s]"
          ></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(34,197,94,0.1),transparent)] animate-pulse"></div>
        </div>

        {/* ULTRA FAST Scrolling Content - INFINITE SEAMLESS */}
        <div className="relative flex animate-scroll">
          <div className="flex whitespace-nowrap">
            <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-green-400 mx-12 tracking-widest drop-shadow-2xl">
              🚀 DIGITAL FOOTPRINT HUB
            </span>
            <span className="text-8xl font-black text-green-400 mx-8 animate-pulse-fast">⚡</span>
            <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-green-400 to-white mx-12 tracking-widest">
              BOLT HACKATHON READY
            </span>
            <span className="text-8xl font-black text-green-400 mx-8 animate-pulse-fast">🔥</span>
            <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-green-400 mx-12 tracking-widest">
              INVESTIGATE • VERIFY • WIN
            </span>
            <span className="text-8xl font-black text-green-400 mx-8 animate-pulse-fast">💎</span>
            <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-green-400 to-white mx-12 tracking-widest">
              DIGITAL FOOTPRINT HUB
            </span>
            <span className="text-8xl font-black text-green-400 mx-8 animate-pulse-fast">🏆</span>
          </div>
          <div className="flex whitespace-nowrap">
            <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-green-400 mx-12 tracking-widest drop-shadow-2xl">
              🚀 DIGITAL FOOTPRINT HUB
            </span>
            <span className="text-8xl font-black text-green-400 mx-8 animate-pulse-fast">⚡</span>
            <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-green-400 to-white mx-12 tracking-widest">
              BOLT HACKATHON READY
            </span>
            <span className="text-8xl font-black text-green-400 mx-8 animate-pulse-fast">🔥</span>
            <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-green-400 mx-12 tracking-widest">
              INVESTIGATE • VERIFY • WIN
            </span>
            <span className="text-8xl font-black text-green-400 mx-8 animate-pulse-fast">💎</span>
            <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-green-400 to-white mx-12 tracking-widest">
              DIGITAL FOOTPRINT HUB
            </span>
            <span className="text-8xl font-black text-green-400 mx-8 animate-pulse-fast">🏆</span>
          </div>
        </div>

        {/* Dynamic Glow Effects */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 via-green-400 to-green-500 opacity-80 animate-pulse-fast"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60 animate-pulse"></div>

        {/* Enhanced Side Fades */}
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-black to-transparent z-10"></div>
      </div>

      {/* Footer */}
      <footer className="text-white py-12 bg-dark-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-2">
              <h3 className="text-xl font-bold mb-4">Digital Footprint Hub:</h3>
              <ul className="space-y-2 text-green-400">
                <li>• Discover</li>
                <li>• Verify</li>
                <li>• Protect</li>
              </ul>
              <div className="mt-6 flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-black" />
                </div>
                <span className="text-sm">hello@digitalfootprinthub.com</span>
              </div>
              <div className="flex items-center space-x-4 mt-4">
                <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-300">INTELLIGENCE TOOLS</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Search
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Intelligence
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Investigation Hub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-300">SAFETY TOOLS</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Scam Detection
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Phone Validator
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Image Scanner
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 mt-6 text-gray-300">COMPANY</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-black" />
              </div>
              <span className="font-medium">Digital Footprint Hub</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© 2025 - Powered by Digital Footprint Hub</span>
              <a href="#" className="hover:text-white">
                Back to top ↑
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
