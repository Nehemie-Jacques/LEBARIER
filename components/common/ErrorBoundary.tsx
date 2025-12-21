import React from 'react';

type Props = { children: React.ReactNode };

export default class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any) {
        // You can log the error here
        console.error(error);
    }

    render() {
        if (this.state.hasError) {
            return <div className="error-boundary">Une erreur est survenue.</div>;
        }
        return this.props.children as React.ReactElement;
    }
}
