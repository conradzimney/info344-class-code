# OAuth Configurations

To authenticate users with GitHub, [register a new application](https://github.com/settings/developers) on your profile. Make sure your Authorization Callback URL matches exactly what you use to configure the Passport GitHubStrategy. 

After registering your OAuth application on GitHub, copy the `oauth-github.json.template` file to `oauth-github.json` and enter your `clientID` and `clientSecret` values.

Use `require()` to load this configuration, and add a `callbackURL` property, set to the same URL you entered when you registered the application on GitHub.