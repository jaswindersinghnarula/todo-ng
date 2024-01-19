export default function config() {
    const appName = process.env.REACT_APP_APP_NAME;
    const appVersion = process.env.REACT_APP_APP_VERSION;
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    return {
        appName,
        appVersion,
        serverUrl,
    };
}
