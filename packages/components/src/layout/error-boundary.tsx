import type { ReactNode } from "react";
import { Component } from "react";
import type { Any } from "@sparrow/core";
import { BlueScreen } from "./blue-screen";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Any | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { error: null, hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    const errorInfo: Any = {
      message: error.message || "Something went wrong that we couldn't prevent :(",
      name: error.name || "UnknownError",
    };

    if (error.stack) {
      errorInfo.stack = error.stack
        .split("\n")
        .slice(1)
        .map((s) => s.trim());
    }

    return {
      error: errorInfo,
      hasError: true,
    };
  }

  onClose = () => {
    this.setState({ hasError: false });
  };

  onReset = () => {
    this.setState({ hasError: false });
    // resetState();
  };

  render() {
    if (this.state.hasError) {
      return <BlueScreen error={this.state.error} />;
    }

    return <>{this.props.children}</>;
  }
}
