import PropTypes from 'prop-types';

const MatomoTracker = ({ host, siteId = '1' }) => {
    if (process.env.NODE_ENV !== 'production') {
        return null;
    }

    if (window._paq !== undefined) {
        return null;
    }

    const u = `//${host}/`
    const _paq = [];
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    _paq.push(['setTrackerUrl', `${u}piwik.php`]);
    _paq.push(['setSiteId', siteId]);
    window._paq = _paq;

    const script = document.createElement('script');
    script.src = `${u}piwik.js`;
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;

    document.head.appendChild(script);
    return null;
};

MatomoTracker.propTypes = {
    host: PropTypes.string.isRequired,
    siteId: PropTypes.string
};

export default MatomoTracker;