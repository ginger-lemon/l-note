export function getPublishDate() {

    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    const pubishedDate = year + "-" + month + "-" + date;

    return pubishedDate;
}

export function getPublishTime() {
    
    let date = new Date();
    const publishTime = date.getTime();

    return publishTime;
}