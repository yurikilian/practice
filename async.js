const fetch = require('node-fetch');



const fetchFromGithub = async (endpoint) => {
    const url = `https://api.github.com${endpoint}`;
    const response = await fetch(url);
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message);
    }

    return body;
}


async function showUserAndRepos(username) {
    const [user, repos] = await Promise.all([
        fetchFromGithub(`/users/${username}`),
        fetchFromGithub(`/users/${username}/repos`)
    ]);
    
    console.log(user.name);
    console.log(`${repos.length} repos`);
}



showUserAndRepos('yurikilian');