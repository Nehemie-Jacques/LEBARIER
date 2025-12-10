'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default class ErrorBoundary extends Component<Props> {
  render() {
    return this.props.children;
  }
}
