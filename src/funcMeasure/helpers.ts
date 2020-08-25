export function addLeadingchars(str: string, length: number, chars: string|number = ' '): string {
    return (chars.toString().repeat(length) + str).substr(-length)
}