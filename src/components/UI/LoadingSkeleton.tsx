import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'list' | 'text';
  count?: number;
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  type = 'card', 
  count = 1,
  className = '' 
}) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (type === 'card') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {skeletons.map((i) => (
          <div key={i} className="glass-card overflow-hidden animate-pulse">
            <div className="aspect-video bg-white/5"></div>
            <div className="p-6 space-y-4">
              <div className="h-6 bg-white/5 rounded w-3/4"></div>
              <div className="h-4 bg-white/5 rounded w-full"></div>
              <div className="h-4 bg-white/5 rounded w-2/3"></div>
              <div className="flex items-center space-x-3 pt-4">
                <div className="w-10 h-10 bg-white/5 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-white/5 rounded w-1/2"></div>
                  <div className="h-3 bg-white/5 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className={`space-y-4 ${className}`}>
        {skeletons.map((i) => (
          <div key={i} className="glass-card p-4 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/5 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-white/5 rounded w-3/4"></div>
                <div className="h-4 bg-white/5 rounded w-1/2"></div>
                <div className="h-3 bg-white/5 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {skeletons.map((i) => (
        <div key={i} className="h-4 bg-white/5 rounded animate-pulse"></div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;