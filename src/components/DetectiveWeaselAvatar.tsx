import React from 'react';

interface DetectiveWeaselAvatarProps {
  visible: boolean;
  assistantText: string;
  className?: string;
}

export const DetectiveWeaselAvatar: React.FC<DetectiveWeaselAvatarProps> = ({
  visible,
  assistantText,
  className = ""
}) => {
  if (!visible) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Avatar Image */}
      <div className="flex justify-center items-center -mt-8">
        <img
          src="https://pub-b5d9a50f6cc04d78835c4d16883b5aea.r2.dev/dfh-assets/dfh-avator/2.Detective-Weasel-Avator.png"
          alt="Detective Weasel Avatar"
          className="w-full h-auto max-w-none object-contain rounded-lg"
          style={{ minWidth: '300px', minHeight: '300px' }}
          onError={(e) => {
            console.error('Failed to load avatar image');
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Voice waves animation when speaking */}
      {assistantText && (
        <div className="absolute inset-0 rounded-lg">
          <div className="absolute inset-2 rounded-lg border border-green-400/30 animate-ping"></div>
          <div className="absolute inset-4 rounded-lg border border-green-400/20 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-6 rounded-lg border border-green-400/10 animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
      )}
    </div>
  );
};
