export function generateRandomHex() {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`
}