// Based on https://github.com/inveniosoftware/base32-lib/blob/308d3314f67f749cafab811ca7b66652eddf04d1/base32_lib/base32.py

const ENCODING_CHARS: string = "0123456789abcdefghjkmnpqrstvwxyz";
const DECODING_CHARS: Record<string, number> = {};
for (let i = 0; i < ENCODING_CHARS.length; i++) {
    DECODING_CHARS[ENCODING_CHARS[i]] = i;
}

export function encode(num: number, min_length: number = 0): string {
    if (!Number.isInteger(num) || num < 0) {
        throw new TypeError("Invalid 'num'. Must be a non-negative integer.");
    }

    let encoded: string = "";

    if (num === 0) {
        encoded = "0";
    } else {
        while (num > 0) {
            const remainder: number = num % 32;
            num = Math.floor(num / 32); // quotient of integer division
            encoded = ENCODING_CHARS.charAt(remainder) + encoded;
        }
    }

    if (min_length > 0) {
        // 0-pad beginning of string to obtain the minimum desired length
        encoded = encoded.padStart(min_length, "0");
    }

    return encoded;
}

export function normalize(encoded: string): string {
    const table: Record<string, string> = {
        I: "1",
        i: "1",
        L: "1",
        l: "1",
        O: "0",
        o: "0",
    };

    const normalizedEncoded: string = encoded
        .replace(/-/g, "")
        .replace(/[IiLlOo]/g, (match) => table[match] || match)
        .toLowerCase();

    if (!normalizedEncoded.split("").every((c) => ENCODING_CHARS.includes(c))) {
        throw new Error("'encoded' contains undecodable characters.");
    }

    return normalizedEncoded;
}

export function decode(encoded: string): number {
    const normalizedEncoded: string = normalize(encoded);

    let num: number = 0;
    for (let i = 0; i < normalizedEncoded.length; i++) {
        const c: string = normalizedEncoded.charAt(
            normalizedEncoded.length - i - 1,
        );
        num += DECODING_CHARS[c] * Math.pow(32, i);
    }

    return num;
}
