#!/bin/bash

# Digital Footprint Hub - ElevenLabs Setup Test
echo "🔍 Digital Footprint Hub - Testing ElevenLabs Integration"
echo "================================================="

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "   Please create .env file with your API keys"
    exit 1
fi

# Check for required environment variables
echo "🔑 Checking API Keys..."

# Function to check if env var exists and is not placeholder
check_env_var() {
    local var_name=$1
    local var_value=$(grep "^$var_name=" .env | cut -d'=' -f2)
    
    if [ -z "$var_value" ]; then
        echo "❌ $var_name: Not found"
        return 1
    elif [[ "$var_value" == *"your_"* ]] || [[ "$var_value" == *"_here"* ]]; then
        echo "⚠️  $var_name: Placeholder value (needs real key)"
        return 1
    else
        echo "✅ $var_name: Configured"
        return 0
    fi
}

# Check ElevenLabs credentials
elevenlabs_key=0
elevenlabs_agent=0

if check_env_var "VITE_ELEVENLABS_API_KEY"; then
    elevenlabs_key=1
fi

if check_env_var "VITE_ELEVENLABS_AGENT_ID"; then
    elevenlabs_agent=1
fi

# Check Cohere fallback
cohere_key=0
if check_env_var "VITE_COHERE_API_KEY"; then
    cohere_key=1
fi

echo ""
echo "📊 Setup Status:"
echo "=================="

if [ $elevenlabs_key -eq 1 ] && [ $elevenlabs_agent -eq 1 ]; then
    echo "🚀 ElevenLabs Conversational AI: READY"
    echo "   Your app will use Claude-like intelligence!"
elif [ $elevenlabs_key -eq 1 ]; then
    echo "⚠️  ElevenLabs: Missing Agent ID"
    echo "   You need to create an agent in ElevenLabs dashboard"
else
    echo "❌ ElevenLabs: Not configured"
    echo "   App will fallback to Cohere or local responses"
fi

if [ $cohere_key -eq 1 ]; then
    echo "✅ Cohere AI Fallback: READY"
else
    echo "⚠️  Cohere AI Fallback: Not configured"
fi

echo "✅ Enhanced Local Fallback: ALWAYS READY"

echo ""
echo "🎯 Next Steps:"
echo "=============="

if [ $elevenlabs_key -eq 0 ] || [ $elevenlabs_agent -eq 0 ]; then
    echo "1. Visit https://elevenlabs.io"
    echo "2. Create account and new Conversational AI agent"
    echo "3. Copy API key and Agent ID to .env file"
    echo "4. Run this test again"
    echo ""
    echo "📖 See ELEVENLABS_SETUP.md for detailed instructions"
else
    echo "🎉 Ready to go! Start your app:"
    echo "   npm run dev"
    echo ""
    echo "🧪 Test commands:"
    echo '   Try: "investigate John Smith"'
    echo '   Try: "check dating profile safety"'
    echo '   Try: "analyze business legitimacy"'
fi

echo ""
echo "🔧 Troubleshooting:"
echo "   - Check browser console for API errors"
echo "   - Verify API keys are active in dashboards"
echo "   - ElevenLabs has usage limits on free tier"
echo ""
echo "💡 The app will ALWAYS work with intelligent fallbacks"
echo "   even without API keys - but ElevenLabs gives you"
echo "   the most Claude-like, conversational experience!"
