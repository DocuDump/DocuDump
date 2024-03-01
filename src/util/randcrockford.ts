export function randomCrockfordNumber(digits: number): number {
    const min = Math.pow(32, digits - 1);
    const max = Math.pow(32, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
