window.addEventListener('load', async _event => {
    const searchParams = new URLSearchParams(location.search);
    const clientId = 'a215a59b08486dd4079b';
    const clientSecret = localStorage.getItem('client_secret');

    // Ensure the client secret has been manually entered to the local storage so it is not in the source code
    // Read about why the client secret should not be in the source code at https://stackoverflow.com/a/39344108/2715716
    if (clientSecret === null) {
        alert('There is no client secret. Talk to the administrator to fix your deployment.');
        return;
    }

    // Listen to the GitHub authorization callback and exchange the code for an access token
    if (searchParams.has('code')) {
        document.body.appendChild(document.createTextNode('Exchanging temporary code for an access token.'));
        const code = searchParams.get('code');
        const response = await fetch(`https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`, { method: 'POST' });
        const text = await response.text();
        alert(text);

        // TODO: https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
        // TODO: localStorage.setItem('access_key', );

        // Refresh to remove the code from the URL and rely on the local storage access key recovery behavior
        location.href = location.origin + location.pathname;
        return;
    } else if (localStorage.getItem('access_key') !== null) {
        // Recover the access key of a previously authorized session from the local storage
        
    } else {
        // Display the "Login with GitHub button"
        const loginButton = document.createElement('button');
        loginButton.textContent = 'Login with GitHub';
        loginButton.addEventListener('click', _event => {
            // Include the `repo` scope in order to be able to access private repositories
            window.location = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`;
        });

        document.body.appendChild(loginButton);
        return;
    }

    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Log out';
    logoutButton.addEventListener('click', _event => {
        localStorage.removeItem('code');
        location.reload();
    });

    document.body.appendChild(document.createTextNode('You are authorized.'));
    document.body.appendChild(logoutButton);
});
