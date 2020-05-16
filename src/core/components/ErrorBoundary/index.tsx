import React, { Component } from 'react';

import { HTTP }             from '@core/services';
import { EHTTPMethod }      from '@core/enums/http';
import { Props, State }     from './types.js';

class ErrorBoundary extends Component<Props, State> {
    state = {
        hasError: false
    }

    componentDidCatch(err: Error): void {
        const http = new HTTP();

        this.setState({ hasError: true });

        const stack = err.stack!.split(/\n/);

        http.setBody({
            stack,
        });

        http.fetch({
            method   : EHTTPMethod.Post,
            path     : '/handle_error',
            requestTo: 'root'
        });
    }

    render(): JSX.Element {
        if (this.state.hasError) {
            return <div>Oops, something goes wrong</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
