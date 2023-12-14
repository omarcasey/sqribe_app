import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './authContext';
import { Spinner } from '@nextui-org/react';

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
      console.log('Checking auth state:', user);
      if (!loading && !user) {
        console.log('User not authenticated, redirecting to /signin');
        router.push('/signin');
      }
    }, [router, user, loading]);

    if (loading) {
      console.log('Loading authentication state, showing loading spinner');
      return (
        <div className="h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      );
    }

    if (!user) {
      console.log('User not authenticated, redirecting to /signin');
      return (
        <div className="h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      );
    }

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
