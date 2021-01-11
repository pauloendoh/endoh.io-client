import React from 'react'

export interface IWithLoadingProps {
    loading?: boolean;
  }
  
export const withLoading = <P extends object>(Component: React.ComponentType<P>) =>
    class WithLoading extends React.Component<P & IWithLoadingProps> {
      render() {
        const { loading, ...props } = this.props;
        return loading ? 'Loading' : <Component {...props as P} />;
      }
    };