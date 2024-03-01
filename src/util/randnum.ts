export function randNum(digits: number): number {
    const min = 0;
    const max = Math.pow(32, digits) - (Math.pow(32, 3) + 1);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
