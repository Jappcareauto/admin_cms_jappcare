export function changeDateForm (dateString: string) {
    const date = new Date(dateString);
    return date.toString().slice(0, 15);
}