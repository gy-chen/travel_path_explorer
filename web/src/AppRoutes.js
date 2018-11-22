import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './container/Navbar';
import Explore from './container/Explore';
import Intro from './component/Intro';
import RedirectToCurrentLocale from './component/RedirectToCurrentLocale';
import { hasPreferLocales, AppLocalizationProvider } from './i18n';


class AppRoutes extends Component {

    // [[name, Component], ...]
    // name will be used to construct route, final route url will become /<locale>/<name>
    static URLS = [
        ['explore', Explore],
        ['', Intro]
    ]

    constructor(props) {
        super(props);

        this._renderAppRoutes = this._renderAppRoutes.bind(this);
        this._hasPreferLocales = this._hasPreferLocales.bind(this);

        this.state = {
            hasPreferLocales: this._hasPreferLocales()
        };
    }

    _hasPreferLocales() {
        const { match: { params: { locale } } } = this.props;
        return hasPreferLocales([locale]);
    }

    _renderAppRoutes() {
        const { match } = this.props;

        const routes = [];
        for (const [name, Component] of AppRoutes.URLS) {
            const path = `${match.url}/${name}`;
            routes.push(<Route key={path} exact path={path} component={Component} />);
        }
        return routes;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.locale !== this.props.match.params.locale) {
            this.setState({
                hasPreferLocales: this._hasPreferLocales()
            });
        }
    }

    render() {
        const { hasPreferLocales } = this.state;
        if (!hasPreferLocales) {
            return <RedirectToCurrentLocale />;
        }

        const { match: { params: { locale } } } = this.props;

        return (
            <AppLocalizationProvider locale={locale}>
                <div>
                    <Navbar />
                    <Switch>
                        {this._renderAppRoutes()}
                        <Route path="/" component={RedirectToCurrentLocale} />
                    </Switch>
                </div>
            </AppLocalizationProvider>
        );
    }
}

export default AppRoutes;