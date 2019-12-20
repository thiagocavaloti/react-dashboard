import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import getPageContext from '../src/getPageContext';
import initStore from '../utils/store';

class MyApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
            <div>
                <Head>
                    <title>Front End Test</title>
                </Head>
                {/* Wrap every page in Jss and Theme providers */}
                <JssProvider
                    registry={this.pageContext.sheetsRegistry}
                    generateClassName={this.pageContext.generateClassName}
                >
                    {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
                    <MuiThemeProvider theme={this.pageContext.theme}>
                        {/*
                        CssBaseline kickstart an elegant, consistent,
                        and simple baseline to build upon.
                        */}
                        <CssBaseline />
                        {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
                        <Provider store={store}>
                            <Component pageContext={this.pageContext} {...pageProps} />
                        </Provider>
                    </MuiThemeProvider>
                </JssProvider>
            </div>
    );
  }
}


export default withRedux(initStore)(MyApp);
