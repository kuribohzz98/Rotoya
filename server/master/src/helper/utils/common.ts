import { ObjectLiteral } from 'typeorm';

export function cloneFilterObject(obj: ObjectLiteral, keys?: string[]): any {
    if (!obj) return null;
    const filterPaging = keys ? (key, value) => {
        if (keys.includes(key)) return undefined;
        return value;
    } : null;
    return JSON.parse(JSON.stringify(obj, filterPaging));
}

export function cloneGetObject(obj: ObjectLiteral, keys?: string[]): any {
    if (!obj) return null;
    const filterPaging = keys ? (key, value) => {
        if (![...keys, ''].includes(key)) return undefined;
        return value;
    } : null;
    return JSON.parse(JSON.stringify(obj, filterPaging));
}

export function RandomPassword(): string {
    let length = 10,
        charset = 'abcdefghijklmnopqrstuvwxyz',
        capitalize_letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        special_character = `!@#$%^&*()_-=+`,
        retVal = '';
    for (var i = 0, c = 0, cl = 0, sc = 0, num = 0; i < length; i++) {
        const random = Math.floor(Math.random() * 4);
        if (random == 0 && c < 4) {
            retVal += charset.charAt(Math.floor(Math.random() * charset.length));
            c++;
        } else if (random == 1 && cl < 2) {
            retVal += capitalize_letter.charAt(Math.floor(Math.random() * capitalize_letter.length));
            cl++;
        } else if (random == 2 && sc < 2) {
            retVal += special_character.charAt(Math.floor(Math.random() * special_character.length));
            sc++;
        } else {
            if (num < 2) {
                retVal += Math.floor(Math.random() * 10);
                num++;
            } else {
                if (c < 4) {
                    retVal += charset.charAt(Math.floor(Math.random() * charset.length));
                    c++;
                }
                if (cl < 2) {
                    retVal += capitalize_letter.charAt(Math.floor(Math.random() * capitalize_letter.length));
                    cl++;
                }
                if (sc < 2) {
                    retVal += special_character.charAt(Math.floor(Math.random() * special_character.length));
                    sc++;
                }
            }
        }
    }
    return retVal;
}

export function isObject(val) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
}