import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from '../../store/thunks/authThunk';
import { AppDispatch } from '../../store/store';

const AuthInitializer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Check authentication status when the component mounts
    dispatch(checkAuthStatus());

    // Also check authentication status when the tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        dispatch(checkAuthStatus());
      }
    };

    // Add event listener for visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch]);

  // This component doesn't render anything
  return null;
};

export default AuthInitializer;
