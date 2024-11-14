export function formatDate(date: Date): string {
    const day: string = String(date.getDate()).padStart(2, '0');
    const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year: string = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    
    let hours: number = date.getHours();
    const minutes: string = String(date.getMinutes()).padStart(2, '0');
    const ampm: string = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? hours : 12; // The hour '0' should be '12'
    
    // Convert hours back to string for formatting
    const formattedHours: string = String(hours).padStart(2, '0');
    
    return `${day}/${month}/${year}, ${formattedHours}:${minutes} ${ampm}`;
}


export const minimumDate=(date:Date):string=>{
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}