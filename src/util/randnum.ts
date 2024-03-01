export function randNum() {
    const min = 0;
    const max = 1048575;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
