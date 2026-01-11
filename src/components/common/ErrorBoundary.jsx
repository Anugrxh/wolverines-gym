import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    if (process.env.NODE_ENV === 'production') {
      // Log to error reporting service (e.g., Sentry, LogRocket)
      // logErrorToService(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-oswald font-bold text-gray-800 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="text-left bg-gray-100 p-4 rounded mb-4">
                <summary className="cursor-pointer font-semibold text-red-600 mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs text-red-800 whitespace-pre-wrap">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-primary text-black py-3 px-6 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Refresh Page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-transparent border-2 border-harvest-gold text-harvest-gold py-3 px-6 rounded-full font-semibold hover:bg-harvest-gold hover:text-black transition-all duration-300"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;