import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './authContext';
import { Spinner } from '@nextui-org/react';

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const router = useRouter();
    const { user, loading } = useAuth();

    if (loading) {
      console.log('Loading authentication state, showing loading spinner');
      return (
        <div className="h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      );
    }

    // If user is not authenticated, redirect
    if (!user) {
      console.log('User not authenticated, redirecting to /signin');
      router.push('/signin');
      return null; // You may choose to return null or another component here
    }

    // Render the WrappedComponent when authenticated
    console.log('User authenticated, rendering WrappedComponent');
    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuth;
};

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default withAuth;
