function* createHello() {
    try {
        const word = yield
        console.log(`Hello ${word}`)
    } catch (err) {
        console.error('error', err);
    }
}

/*
const hello = createHello();
hello.next();
hello.throw('Something was wrong');
hello.next('Yuri')*/

function* create3To4Counter() {
    yield 3
    return 4
}

function* createCounter() {
    yield 1
    yield 2
    const four = yield* create3To4Counter();
    console.log(four);
    yield 5
}


const counter = createCounter();
for (let i of counter) {
    console.log(i);
}

const fetch = require('node-fetch');
const url = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

function* createQuoteFetcher() {
    const response = yield fetch(url);//1
    const quote = yield response.json();//2
    return `${quote.quoteText} -${quote.quoteAuthor}`;
}


/*
const coroutine = (gen) => {
    const generator = gen();
    const handle = (result) => {
        if (result.done) return Promise.resolve(result.value);
        return Promise.resolve(result.value)
            .then(res => handle(generator.next(res)));
    }
    return handle(gen().next());
}
*/
/*
const co = require('co');
//const quoteFetcher = coroutine(createQuoteFetcher);
const quoteFetcher = co(createQuoteFetcher);
quoteFetcher
    .then(quote => console.log(quote))
*/




function* createFetchGithubUser(url) {
    const response = yield fetch(url);
    const body = yield response.json();
    return body;
}

/*

const fetchGithubUser = createFetchGithubUser('https://api.github.com/users/yurikilian');
const fetchPromise = fetchGithubUser.next().value;
const toJsonPromise = fetchPromise.then(response => fetchGithubUser.next(response).value);
const bodyPromise = toJsonPromise.then(response => fetchGithubUser.next(response).value)
bodyPromise.then(response => console.log(response.name))
*/

const co = require('co');
const fetchGithubUser = co(createFetchGithubUser, 'https://api.github.com/users/yurikilian');
fetchGithubUser.then(response => console.log(response.name))