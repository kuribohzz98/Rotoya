export function convertTimeToFloat(inpDate: number | Date): Number {
    let date: Date;
    if (typeof inpDate == 'number') {
        date = new Date(inpDate);
    } else {
        date = inpDate;
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return parseFloat(`${hours}.${minutes}`);
}

export function convertFloatToTime(number: number): string {
    try {
        if (number > 24 || number < 0) {
            throw new Error(`${number} is not define time`);
        }
        const temp = `${number}`;
        const split_temp = temp.split('.');
        if (split_temp.length != 2) {
            throw new Error(`${number} is not float number`);
        }
        return `${split_temp[0]}:${split_temp[1]}`;
    } catch (e) {
        return e.message;
    }

}