async function * someGenerator() {
    await Bluebird.delay(1000);
    yield 1;
    await Bluebird.delay(1000);
    yield 2;
    await Bluebird.delay(1000);
    yield 3;
}



function main() {
    for await(const value of someGenerator()){
        console.log(value);
    }
}

main();