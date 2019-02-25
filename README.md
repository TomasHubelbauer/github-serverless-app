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
