export function getPublishDate() {

    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    const pubishDate = year + "-" + month + "-" + date;

    return pubishDate;
}

export function getPublishTime() {
    
    let date = new Date();
    const publishTime = date.getTime();

    return publishTime;
}