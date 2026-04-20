import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Optional custom fallback. Receives the error and a reset callback. */
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Catches render errors in its subtree and shows a branded fallback UI
 * instead of crashing the whole app to a blank screen.
 *
 * Usage: <ErrorBoundary><Routes /></ErrorBoundary>
 */
class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface to console for debugging; integrate with a logger here later.
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    if (this.props.fallback) return this.props.fallback(error, this.reset);

    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="glass clip-angle-lg border border-primary/20 p-8 max-w-md text-center">
          <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">
            System Fault
          </div>
          <h1 className="font-display text-3xl font-black text-aurora mb-3">
            Something broke
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            An unexpected error occurred. Try reloading the page or returning home.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={this.reset}
              className="bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest clip-angle px-5 py-2 text-xs hover:shadow-neon-cyan transition-shadow"
            >
              Try again
            </button>
            <a
              href="/"
              className="glass border border-primary/30 text-foreground hover:text-primary hover:border-primary font-tech uppercase tracking-widest clip-angle px-5 py-2 text-xs transition-colors"
            >
              Home
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
