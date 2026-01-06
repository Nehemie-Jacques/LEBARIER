'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

interface SocialLoginButtonsProps {
  onGoogleLogin?: () => void;
  onFacebookLogin?: () => void;
  disabled?: boolean;
}

export default function SocialLoginButtons({
  onGoogleLogin,
  onFacebookLogin,
  disabled = false,
}: SocialLoginButtonsProps) {
  const handleGoogleLogin = () => {
    if (!disabled && onGoogleLogin) {
      onGoogleLogin();
    }
  };

  const handleFacebookLogin = () => {
    if (!disabled && onFacebookLogin) {
      onFacebookLogin();
    }
  };

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">OU</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={disabled}
          className="flex items-center justify-center gap-2 bg-background hover:bg-muted border border-border text-foreground font-medium py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FcGoogle className="w-5 h-5" />
          <span className="text-sm">Google</span>
        </button>
        <button
          type="button"
          onClick={handleFacebookLogin}
          disabled={disabled}
          className="flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1664D8] text-white font-medium py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaFacebook className="w-5 h-5" />
          <span className="text-sm">Facebook</span>
        </button>
      </div>
    </div>
  );
}
