interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: { container: 'w-12 h-12', icon: 'w-6 h-6' },
  md: { container: 'w-16 h-16', icon: 'w-8 h-8' },
  lg: { container: 'w-20 h-20', icon: 'w-10 h-10' },
  xl: { container: 'w-24 h-24', icon: 'w-12 h-12' },
};

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const { container, icon } = sizes[size];

  return (
    <div className={`${container} ${className}`}>
      <div className="w-full h-full bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 rounded-lg flex items-center justify-center transform rotate-45 shadow-lg">
        <div className="transform -rotate-45">
          <svg
            className={`${icon} text-primary-foreground`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
