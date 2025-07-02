import { useState, useEffect, useRef } from "react"
import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Separator } from "./components/ui/separator"
import { DetectiveWeaselAvatar } from "./components/DetectiveWeaselAvatar"
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

// Speech Recognition types
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList
    resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string
}

// Extend Window interface to include custom properties
declare global {
    interface Window {
        speechRecognition?: any
        elevenLabsWS?: WebSocket | null
        elevenLabsRecorder?: MediaRecorder | null
    }
}

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
    const [isCameraOn, setIsCameraOn] = useState(false)
    const [isRequestingCamera, setIsRequestingCamera] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState("English")
    const [selectedVoice, setSelectedVoice] = useState("Emma")
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
    const [isVoiceDropdownOpen, setIsVoiceDropdownOpen] = useState(false)
    const [latestAssistantMessage, setLatestAssistantMessage] = useState("")
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

    // ElevenLabs Voice Integration
    const [voiceState, setVoiceState] = useState<'inactive' | 'listening' | 'active' | 'paused'>('inactive')
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null)

    // Image upload state
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [uploadedImageName, setUploadedImageName] = useState<string | null>(null)

    // Chat ref for scroll management
    const chatRef = useRef<HTMLDivElement>(null)

    // Camera and video stream state
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null)
    const cameraRef = useRef<HTMLVideoElement>(null)

    // Suggestions data
    const suggestions = [
        "Tell me about the latest cyber threats",
        "How can I protect my organization from ransomware?",
        "What are the most common attack vectors?",
        "Analyze this suspicious email attachment",
        "Create a security awareness training plan",
        "Help me understand this vulnerability report",
        "What's the current threat landscape?",
        "Guide me through incident response procedures",
    ]

    // FAQ data
    const faqData = [
        {
            question: "What is Digital Footprint Hub?",
            answer: "Digital Footprint Hub is an AI-powered cybersecurity platform that helps organizations detect, analyze, and respond to digital threats while managing their online presence.",
        },
        {
            question: "How does the AI detective work?",
            answer: "Our AI detective uses advanced machine learning algorithms to analyze patterns, detect anomalies, and provide real-time threat intelligence across multiple data sources.",
        },
        {
            question: "Is my data secure?",
            answer: "Yes, we employ enterprise-grade encryption, zero-trust architecture, and comply with industry standards including SOC 2, ISO 27001, and GDPR.",
        },
        {
            question: "Can I integrate with existing security tools?",
            answer: "Absolutely! We offer APIs and integrations with popular SIEM, SOAR, and security orchestration platforms.",
        },
    ]

    // Capabilities data
    const capabilities = [
        "Advanced Threat Detection",
        "Real-time Monitoring",
        "Behavioral Analysis",
        "Incident Response",
        "Threat Intelligence",
        "Vulnerability Assessment",
        "Compliance Reporting",
        "Security Orchestration",
    ]

    // Limitations data
    const limitations = [
        "Requires internet connection for real-time updates",
        "AI recommendations should be verified by security professionals",
        "Some advanced features require premium subscription",
        "Processing time may vary based on data complexity",
    ]

    // Initialize speech recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
            const recognition = new SpeechRecognition()
            recognition.continuous = false
            recognition.interimResults = false
            recognition.lang = 'en-US'

            window.speechRecognition = recognition
        }
    }, [])

    // Scroll to bottom of chat when new messages are added
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
    }, [messages])

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return

        const userMessage = {
            id: Date.now(),
            type: "user" as const,
            content: inputValue,
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue("")
        setShowSuggestions(false)
        setIsThinking(true)

        // Add thinking message
        const thinkingMessage = {
            id: Date.now() + 1,
            type: "thinking" as const,
            content: "Detective Weasel is analyzing...",
        }
        setMessages(prev => [...prev, thinkingMessage])

        // Simulate AI response
        setTimeout(() => {
            setIsThinking(false)
            setMessages(prev => prev.filter(msg => msg.type !== "thinking"))

            const aiResponse = {
                id: Date.now() + 2,
                type: "ai" as const,
                content: "Based on my analysis, I've identified several key points regarding your inquiry. Let me provide you with a comprehensive breakdown of the situation and recommended next steps.",
            }

            setMessages(prev => [...prev, aiResponse])
            setLatestAssistantMessage(aiResponse.content)
        }, 2000)
    }

    const handleVoiceInput = () => {
        if (window.speechRecognition) {
            window.speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
                const transcript = event.results[0][0].transcript
                setInputValue(transcript)
            }

            window.speechRecognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error('Speech recognition error:', event.error)
            }

            window.speechRecognition.start()
        }
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setUploadedImage(e.target?.result as string)
                setUploadedImageName(file.name)
            }
            reader.readAsDataURL(file)
        }
    }

    const toggleCamera = async () => {
        if (isCameraOn) {
            // Turn off camera
            if (videoStream) {
                videoStream.getTracks().forEach(track => track.stop())
                setVideoStream(null)
            }
            setIsCameraOn(false)
        } else {
            // Turn on camera
            setIsRequestingCamera(true)
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                setVideoStream(stream)
                setIsCameraOn(true)

                if (cameraRef.current) {
                    cameraRef.current.srcObject = stream
                }
            } catch (error) {
                console.error('Error accessing camera:', error)
            } finally {
                setIsRequestingCamera(false)
            }
        }
    }

    const togglePlayback = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Left Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                        <h1 className="text-xl font-bold text-gray-900">Digital Footprint Hub</h1>
                        <Button size="sm" variant="outline">
                            <Plus className="w-4 h-4 mr-2" />
                            New
                        </Button>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex items-center space-x-2 mb-3">
                        <Button
                            variant={judgeMode ? "default" : "outline"}
                            size="sm"
                            onClick={() => setJudgeMode(true)}
                            className="flex items-center space-x-1"
                        >
                            <Shield className="w-4 h-4" />
                            <span>Judge Mode</span>
                        </Button>
                        <Button
                            variant={!judgeMode ? "default" : "outline"}
                            size="sm"
                            onClick={() => setJudgeMode(false)}
                            className="flex items-center space-x-1"
                        >
                            <Brain className="w-4 h-4" />
                            <span>Helper Mode</span>
                        </Button>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search sessions..."
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Sessions */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2">
                        {sessions.map((session) => (
                            <Card key={session.id} className={`cursor-pointer transition-colors ${session.active ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}>
                                <CardContent className="p-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-sm text-gray-900">{session.name}</h3>
                                            <p className="text-xs text-gray-500 mt-1">{session.description}</p>
                                        </div>
                                        {session.active && (
                                            <CheckCircle className="w-4 h-4 text-blue-600" />
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-gray-200">
                    <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                            <Lightbulb className="w-4 h-4 mr-2" />
                            Help & Tips
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="bg-white border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-gray-900">Detective Weasel</h2>
                                <p className="text-sm text-gray-500">AI Security Analyst</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsFaqOpen(!isFaqOpen)}
                            >
                                <ChevronDown className={`w-4 h-4 transition-transform ${isFaqOpen ? 'rotate-180' : ''}`} />
                                FAQ
                            </Button>
                            <Button variant="outline" size="sm">
                                <RefreshCw className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* FAQ Dropdown */}
                    {isFaqOpen && (
                        <div className="mt-4 bg-gray-50 rounded-lg p-4">
                            <h3 className="font-medium text-gray-900 mb-3">Frequently Asked Questions</h3>
                            <div className="space-y-3">
                                {faqData.map((faq, index) => (
                                    <div key={index}>
                                        <h4 className="font-medium text-sm text-gray-800">{faq.question}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4" ref={chatRef}>
                    <div className="max-w-4xl mx-auto space-y-4">
                        {messages.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Welcome to Digital Footprint Hub
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    I'm Detective Weasel, your AI security analyst. How can I help you today?
                                </p>

                                {/* Capabilities Section */}
                                <div className="mb-6">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsCapabilitiesOpen(!isCapabilitiesOpen)}
                                        className="mb-3"
                                    >
                                        <ChevronDown className={`w-4 h-4 mr-2 transition-transform ${isCapabilitiesOpen ? 'rotate-180' : ''}`} />
                                        My Capabilities
                                    </Button>

                                    {isCapabilitiesOpen && (
                                        <div className="bg-green-50 rounded-lg p-4 mb-4">
                                            <div className="grid grid-cols-2 gap-2">
                                                {capabilities.map((capability, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                        <span className="text-sm text-gray-700">{capability}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Limitations Section */}
                                <div className="mb-6">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsLimitationsOpen(!isLimitationsOpen)}
                                        className="mb-3"
                                    >
                                        <ChevronDown className={`w-4 h-4 mr-2 transition-transform ${isLimitationsOpen ? 'rotate-180' : ''}`} />
                                        Current Limitations
                                    </Button>

                                    {isLimitationsOpen && (
                                        <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                                            <div className="space-y-2">
                                                {limitations.map((limitation, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                                                        <span className="text-sm text-gray-700">{limitation}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Suggestions */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                                    {suggestions.slice(0, 6).map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setInputValue(suggestion)}
                                            className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                        >
                                            <span className="text-sm text-gray-700">{suggestion}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            messages.map((message) => (
                                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.type === "user"
                                            ? "bg-blue-600 text-white"
                                            : message.type === "thinking"
                                                ? "bg-gray-100 text-gray-600 italic"
                                                : "bg-white border border-gray-200 text-gray-900"
                                        }`}>
                                        {message.type === "thinking" && (
                                            <div className="flex items-center space-x-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                                                <span>{message.content}</span>
                                            </div>
                                        )}
                                        {message.type !== "thinking" && message.content}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="bg-white border-t border-gray-200 p-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Uploaded Image Preview */}
                        {uploadedImage && (
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <img src={uploadedImage} alt="Uploaded" className="w-12 h-12 object-cover rounded" />
                                        <span className="text-sm text-gray-700">{uploadedImageName}</span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setUploadedImage(null)
                                            setUploadedImageName(null)
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className="flex items-end space-x-2">
                            <div className="flex-1">
                                <div className="relative">
                                    <Input
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                        placeholder="Ask Detective Weasel about cybersecurity..."
                                        className="pr-20"
                                        onFocus={() => setShowSuggestions(true)}
                                    />
                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleVoiceInput}
                                            className="p-1"
                                        >
                                            <Mic className="w-4 h-4" />
                                        </Button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label htmlFor="image-upload">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="p-1"
                                                asChild
                                            >
                                                <span>📎</span>
                                            </Button>
                                        </label>
                                    </div>
                                </div>

                                {/* Suggestions dropdown */}
                                {showSuggestions && inputValue.length === 0 && (
                                    <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                                        {suggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setInputValue(suggestion)
                                                    setShowSuggestions(false)
                                                }}
                                                className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim()}
                                className="px-4"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar - Detective Weasel Avatar */}
            <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Detective Weasel</h3>
                    <p className="text-sm text-gray-600">Your AI Security Analyst</p>
                </div>

                {/* Avatar Display */}
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <DetectiveWeaselAvatar />

                    {/* Voice Controls */}
                    <div className="mt-6 w-full space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Language</span>
                            <div className="relative">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                                    className="w-24"
                                >
                                    {selectedLanguage}
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </Button>
                                {isLanguageDropdownOpen && (
                                    <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                        {["English", "Spanish", "French", "German"].map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => {
                                                    setSelectedLanguage(lang)
                                                    setIsLanguageDropdownOpen(false)
                                                }}
                                                className="w-full text-left px-3 py-2 hover:bg-gray-50"
                                            >
                                                {lang}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Voice</span>
                            <div className="relative">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsVoiceDropdownOpen(!isVoiceDropdownOpen)}
                                    className="w-24"
                                >
                                    {selectedVoice}
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </Button>
                                {isVoiceDropdownOpen && (
                                    <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                        {["Emma", "Brian", "Amy", "Andrew"].map((voice) => (
                                            <button
                                                key={voice}
                                                onClick={() => {
                                                    setSelectedVoice(voice)
                                                    setIsVoiceDropdownOpen(false)
                                                }}
                                                className="w-full text-left px-3 py-2 hover:bg-gray-50"
                                            >
                                                {voice}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <Separator />

                        {/* Camera Controls */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">Camera</span>
                                <Button
                                    variant={isCameraOn ? "default" : "outline"}
                                    size="sm"
                                    onClick={toggleCamera}
                                    disabled={isRequestingCamera}
                                >
                                    {isRequestingCamera ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                                    ) : (
                                        <User className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>

                            {/* Camera Preview */}
                            {isCameraOn && videoStream && (
                                <div className="relative">
                                    <video
                                        ref={cameraRef}
                                        autoPlay
                                        muted
                                        className="w-full h-32 bg-gray-100 rounded-lg object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        <Separator />

                        {/* Audio Controls */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">Audio</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={togglePlayback}
                                >
                                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                </Button>
                            </div>

                            <audio ref={audioRef} className="hidden">
                                <source src="/audio/detective-weasel-voice.mp3" type="audio/mpeg" />
                            </audio>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="p-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Connect</h4>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="p-2">
                            <Youtube className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="p-2">
                            <Linkedin className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="p-2">
                            <Twitter className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="p-2">
                            <Facebook className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="p-2">
                            <Instagram className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
