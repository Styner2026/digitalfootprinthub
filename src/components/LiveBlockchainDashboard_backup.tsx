// Live Blockchain Dashboard Component
import React from 'react';
import { useBlockchain, VerificationRecord } from '../lib/blockchain';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Shield, Activity, Hash, Users, Zap, Clock, AlertTriangle, CheckCircle, Search, UserCheck } from 'lucide-react';

export default function BlockchainDashboard() {
    const {
        stats,
        activities,
        isConnected,
        isLoading,
        connect,
        createVerification,
        queryVerification
    } = useBlockchain();

    const [emailInput, setEmailInput] = React.useState('');
    const [socialProfileInput, setSocialProfileInput] = React.useState('');
    const [phoneInput, setPhoneInput] = React.useState('');
    const [queryInput, setQueryInput] = React.useState('');
    const [verificationResults, setVerificationResults] = React.useState<{ [key: string]: VerificationRecord }>({});
    const [queryResult, setQueryResult] = React.useState<VerificationRecord | null>(null);
    const [activeTab, setActiveTab] = React.useState<'verify' | 'search' | 'monitor'>('verify');

    const handleVerifyIdentity = async (type: 'email' | 'social' | 'phone', value: string) => {
        if (!value.trim()) return;

        try {
            const result = await createVerification({
                type: 'identity',
                content: value,
                metadata: {
                    source: 'digital-footprint-hub',
                    identityType: type,
                    timestamp: new Date().toISOString()
                }
            });
            setVerificationResults(prev => ({
                ...prev,
                [type]: result
            }));

            // Clear the input
            if (type === 'email') setEmailInput('');
            if (type === 'social') setSocialProfileInput('');
            if (type === 'phone') setPhoneInput('');
        } catch (error) {
            console.error('Verification failed:', error);
        }
    };

    const handleQueryVerification = async () => {
        if (!queryInput.trim()) return;

        try {
            const result = await queryVerification(queryInput);
            setQueryResult(result);
        } catch (error) {
            console.error('Query failed:', error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Connection Status */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg">Blockchain Verification Hub</h3>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                        Powered by Nodely + Algorand
                    </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                    <span>{isConnected ? 'Live on MainNet' : 'Disconnected'}</span>
                    {!isConnected && (
                        <Button
                            size="sm"
                            onClick={connect}
                            disabled={isLoading}
                            className="ml-2 bg-blue-500 hover:bg-blue-600"
                        >
                            {isLoading ? 'Connecting...' : 'Connect'}
                        </Button>
                    )}
                </div>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400">Total Verifications</p>
                                <p className="text-lg font-semibold text-white">{stats.totalVerifications.toLocaleString()}</p>
                            </div>
                            <Hash className="w-5 h-5 text-blue-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400">Active Nodes</p>
                                <p className="text-lg font-semibold text-white">{stats.activeNodes.toLocaleString()}</p>
                            </div>
                            <Users className="w-5 h-5 text-green-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400">Network TPS</p>
                                <p className="text-lg font-semibold text-white">{stats.networkTPS.toLocaleString()}</p>
                            </div>
                            <Zap className="w-5 h-5 text-yellow-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400">Block Height</p>
                                <p className="text-lg font-semibold text-white">{stats.blockHeight.toLocaleString()}</p>
                            </div>
                            <Activity className="w-5 h-5 text-purple-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Digital Footprint Analysis Tabs */}
            <div className="flex space-x-4 border-b border-[#2a2a2a] mb-6">
                <button
                    onClick={() => setActiveTab('verify')}
                    className={`pb-2 px-1 text-sm font-medium ${activeTab === 'verify'
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <UserCheck className="w-4 h-4 inline mr-2" />
                    Verify Your Identity
                </button>
                <button
                    onClick={() => setActiveTab('search')}
                    className={`pb-2 px-1 text-sm font-medium ${activeTab === 'search'
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <Search className="w-4 h-4 inline mr-2" />
                    Search Footprints
                </button>
                <button
                    onClick={() => setActiveTab('monitor')}
                    className={`pb-2 px-1 text-sm font-medium ${activeTab === 'monitor'
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <AlertTriangle className="w-4 h-4 inline mr-2" />
                    Monitor & Protect
                </button>
            </div>

            {/* Tab Content - Fixed Height Container */}
            <div className="min-h-[600px] max-h-[600px] overflow-y-auto custom-scrollbar p-1 transition-all duration-300 ease-in-out">
            {activeTab === 'verify' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
                    {/* Email Verification */}
                    <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                        <CardContent className="p-4">
                            <h4 className="text-white font-medium mb-3 flex items-center">
                                <Shield className="w-4 h-4 mr-2 text-blue-400" />
                                Email Verification
                            </h4>
                            <div className="space-y-3">
                                <Input
                                    placeholder="Enter your email address"
                                    type="email"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
                                />
                                <Button
                                    onClick={() => handleVerifyIdentity('email', emailInput)}
                                    disabled={isLoading || !emailInput.trim()}
                                    className="w-full bg-blue-500 hover:bg-blue-600"
                                >
                                    {isLoading ? 'Verifying...' : 'Verify Email'}
                                </Button>
                                {verificationResults.email && (
                                    <div className="p-3 bg-green-900/30 rounded border border-green-500/30">
                                        <p className="text-xs text-green-400 mb-1 flex items-center">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Email Verified on Blockchain!
                                        </p>
                                        <p className="text-xs text-gray-300">Trust Score: {verificationResults.email.score}/100</p>
                                        <p className="text-xs text-gray-300">Hash: {verificationResults.email.hash.substring(0, 20)}...</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Social Profile Verification */}
                    <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                        <CardContent className="p-4">
                            <h4 className="text-white font-medium mb-3 flex items-center">
                                <Users className="w-4 h-4 mr-2 text-purple-400" />
                                Social Profile
                            </h4>
                            <div className="space-y-3">
                                <Input
                                    placeholder="Social media profile URL"
                                    value={socialProfileInput}
                                    onChange={(e) => setSocialProfileInput(e.target.value)}
                                    className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
                                />
                                <Button
                                    onClick={() => handleVerifyIdentity('social', socialProfileInput)}
                                    disabled={isLoading || !socialProfileInput.trim()}
                                    className="w-full bg-purple-500 hover:bg-purple-600"
                                >
                                    {isLoading ? 'Verifying...' : 'Verify Profile'}
                                </Button>
                                {verificationResults.social && (
                                    <div className="p-3 bg-green-900/30 rounded border border-green-500/30">
                                        <p className="text-xs text-green-400 mb-1 flex items-center">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Profile Verified!
                                        </p>
                                        <p className="text-xs text-gray-300">Trust Score: {verificationResults.social.score}/100</p>
                                        <p className="text-xs text-gray-300">Hash: {verificationResults.social.hash.substring(0, 20)}...</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Phone Verification */}
                    <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                        <CardContent className="p-4">
                            <h4 className="text-white font-medium mb-3 flex items-center">
                                <Shield className="w-4 h-4 mr-2 text-green-400" />
                                Phone Number
                            </h4>
                            <div className="space-y-3">
                                <Input
                                    placeholder="Enter phone number"
                                    type="tel"
                                    value={phoneInput}
                                    onChange={(e) => setPhoneInput(e.target.value)}
                                    className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
                                />
                                <Button
                                    onClick={() => handleVerifyIdentity('phone', phoneInput)}
                                    disabled={isLoading || !phoneInput.trim()}
                                    className="w-full bg-green-500 hover:bg-green-600"
                                >
                                    {isLoading ? 'Verifying...' : 'Verify Phone'}
                                </Button>
                                {verificationResults.phone && (
                                    <div className="p-3 bg-green-900/30 rounded border border-green-500/30">
                                        <p className="text-xs text-green-400 mb-1 flex items-center">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Phone Verified!
                                        </p>
                                        <p className="text-xs text-gray-300">Trust Score: {verificationResults.phone.score}/100</p>
                                        <p className="text-xs text-gray-300">Hash: {verificationResults.phone.hash.substring(0, 20)}...</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {activeTab === 'search' && (
                <Card className="bg-[#1a1a1a] border-[#2a2a2a] animate-in fade-in duration-300">
                    <CardContent className="p-6">
                        <h4 className="text-white font-medium mb-4 flex items-center">
                            <Search className="w-5 h-5 mr-2 text-blue-400" />
                            Search Digital Footprints
                        </h4>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    placeholder="Search by email, phone, or verification hash"
                                    value={queryInput}
                                    onChange={(e) => setQueryInput(e.target.value)}
                                    className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
                                />
                                <Button
                                    onClick={handleQueryVerification}
                                    disabled={isLoading || !queryInput.trim()}
                                    className="bg-blue-500 hover:bg-blue-600"
                                >
                                    {isLoading ? 'Searching...' : 'Search Blockchain'}
                                </Button>
                            </div>
                            {queryResult && (
                                <div className="p-4 bg-blue-900/30 rounded border border-blue-500/30">
                                    <p className="text-sm text-blue-400 mb-2 flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Digital Footprint Found
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 text-xs">
                                        <div>
                                            <p className="text-gray-400">Type:</p>
                                            <p className="text-white">{queryResult.type}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Status:</p>
                                            <p className="text-white">{queryResult.status}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Trust Score:</p>
                                            <p className="text-white">{queryResult.score}/100</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Verified:</p>
                                            <p className="text-white">{new Date(queryResult.timestamp).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {activeTab === 'monitor' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                    <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                        <CardContent className="p-4">
                            <h4 className="text-white font-medium mb-3 flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-2 text-yellow-400" />
                                Identity Monitoring
                            </h4>
                            <div className="space-y-3">
                                <p className="text-sm text-gray-300">Monitor your digital footprint for unauthorized use</p>
                                <div className="p-3 bg-yellow-900/30 rounded border border-yellow-500/30">
                                    <p className="text-xs text-yellow-400">⚠️ Alert: New verification detected</p>
                                    <p className="text-xs text-gray-300">Someone attempted to verify your email address</p>
                                    <p className="text-xs text-gray-400">2 hours ago</p>
                                </div>
                                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                                    Enable Real-time Monitoring
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                        <CardContent className="p-4">
                            <h4 className="text-white font-medium mb-3 flex items-center">
                                <Shield className="w-4 h-4 mr-2 text-red-400" />
                                Protection Status
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-300">Email Protection</span>
                                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Active</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-300">Social Media Monitoring</span>
                                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Limited</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-300">Phone Number Shield</span>
                                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Inactive</span>
                                </div>
                                <Button className="w-full bg-red-500 hover:bg-red-600">
                                    Upgrade Protection
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
            </div>

            {/* Recent Activity */}
            <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                <CardContent className="p-4">
                    <h4 className="text-white font-medium mb-3 flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-purple-400" />
                        Recent Blockchain Activity
                    </h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                        {activities.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between p-2 bg-[#2a2a2a] rounded">
                                <div>
                                    <p className="text-sm text-white">{activity.type}</p>
                                    <p className="text-xs text-gray-400">{activity.description}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400">{activity.timestamp.toLocaleTimeString()}</p>
                                    {activity.txHash && (
                                        <p className="text-xs text-blue-400">{activity.txHash}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
