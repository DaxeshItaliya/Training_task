const first = () => {
    console.log("First");
}

const wait = () => {

    setTimeout(() => {
        console.log("second : waiting");
    }, 2000)

}

(() => {
    console.log("Start exicution")
    first();
    wait();
    console.log("End exicution");
})();