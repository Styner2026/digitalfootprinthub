import React from 'react';

interface AkoolLiveAvatarProps {
  visible: boolean;
  assistantText: string;
  className?: string;
}

export const AkoolLiveAvatar: React.FC<AkoolLiveAvatarProps> = ({ 
  visible, 
  assistantText, 
  className = "" 
}) => {
  if (!visible) return null;

  return (
    <div className={`relative bg-gradient-to-br from-gray-700/20 to-gray-800/20 rounded-full border-2 border-gray-600/30 ${className}`}>
      <div className="w-full h-full flex items-center justify-center">
        {/* Placeholder avatar - using neutral colors */}
        <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
          <div className="text-2xl">🤖</div>
        </div>
      </div>
      
      {/* Speaking indicator - using resolved green */}
      {assistantText && (
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-resolved rounded-full border-2 border-white animate-pulse"></div>
      )}
      
      {/* Voice waves animation when speaking - using resolved green */}
      {assistantText && (
        <div className="absolute inset-0 rounded-full border-2 border-resolved animate-ping opacity-20"></div>
      )}
    </div>
  );
};
