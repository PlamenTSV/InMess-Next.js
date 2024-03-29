export default function formatDate(date: Date){
    const day = (date.getDate() < 10)? `0${date.getDate()}` : date.getDate();
    const month = (date.getMonth() + 1 < 10)? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    
    const hours = (date.getHours() < 10)? `0${date.getHours()}` : date.getHours();
    const minutes = (date.getMinutes() < 10)? `0${date.getMinutes()}` : date.getMinutes();
    return `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}`;
}