# GitHub Serverless Application

In this repository I am exploring to see whehter it is possible to develop a GitHub Application
(one that appears in the GitHub Marketplace) which would be just a basic GitHub Pages hosted
static site.

GitHub Apps are given permissions using OAuth and there are client-only OAuth flows, so in
theory this should work as long as GitHub provides a way to use one of those. This is a stream
of thoughts kind of a document where I add information as I progress with the experiment. If you
only want to find out what the result it, scroll all the way below and if there is a resolution,
you'll find it there.

You can find the GitHub Pages hosted static site of this repository at this link:

https://tomashubelbauer.github.io/github-serverless-app/

The starting point to learn about GitHub App development is available at this link:

https://developer.github.com/apps/

Turns out GitHub differentiates between GitHub Apps and OAuth Apps. Hopefully the distinction
is not that one can only be built with a real backend. I know what they call "OAuth Apps"
(basically any client of the GitHub API) can be built using only frontend technologies, because
I have built such apps before.

From the descriptions of the differences found at the following link:

https://developer.github.com/apps/about-apps/

It looks like GitHub Apps are supoosed to be mostly tooling around a single repository and
a major part of their function is to act on webhooks. For my purposes (listing and categorizing
users repositories), it seems as though an OAuth App is a better fit.

Additionally, a developer may choose to just write a script of sorts, which uses the GitHub PAT
(personal access token) to carry out any work impersonating the users within the granted scopes.
This is not at its face value that useful here, but we could built just a regulat static site
hosted on GitHub Pages and obtain the token for it storing it in local storage thus allowing
access to the GitHub API without constant reauthorization.

In the draft of the application files prepared in this repository, I will try to prototype
using the PAT authorization and remembering the user's session.

The application needs to be registered first at:

https://github.com/settings/applications/new

In order to obtain a `client_id`. This one's `client_id` is `a215a59b08486dd4079b`.

The app registration requires a valid callback URL for the authentication flow, which cannot
be a file URL, but a static file server can be used and `localhost` is allowed. In order to
test this application locally without having to deploy to GitHub Pages first each time,
serve it using:

```powershell
npx serve
# Set the GitHub application registration a callback URL value of `http://localhost:5000`
# Use http://localhost:5000 to access the local deployment of the site
```

The authorization flow involves exchanging a temporary code for an access token based on a
client ID and a client secret. The client secret should never be leaked, which is impossible
without a server-to-server call, so in this scenario - since I will be the only one using this
application - I am going to keep the client secret in the local storage of the machines where
I will be using the application and will not be including it in the application's deployment.

In a scenario where the application was supposed to be used by other users, an OAuth server
component to carry out the flow using S2S communication would have been required.

I hit a problem when calling `POST https://github.com/login/oauth/access_token` whereby a
CORS error prevents my client code from making that call. The following SO answer:

https://stackoverflow.com/a/14709863/2715716

From a GitHub support specialist implies a solution, which I have attempted (renamed all
the fields to the localhost application URL) to no avail. I am guessing the localhost URL
might be an issue so I will try again with the GitHub Pages URL.

The OAuth application URL: https://github.com/settings/applications/993810
There is no risk of exposing the ID as the application is only accessible to me.

Alternatively, a combination of ID and secret might be an usable alternative:

https://developer.github.com/v3/#oauth2-keysecret

Surprisingly, this method doesn't appear to work either, but not due to CORS, but instead
it reports "authorization required" even with the `client_id` and `client_secret` params
included. Maybe it is locked to server to server calls only, which would be understandable,
but unfortunate seeing as I can't make the code exchange one work.

I have contacted GitHub support with a request for assistence.

## To-Do

### Figure out next steps
