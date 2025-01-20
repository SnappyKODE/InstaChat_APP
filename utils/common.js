export const formatDate = (date) => {
    var day = date.getDate();
    var monthName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var month = monthName[date.getMonth()];

    var formattedDate = day + ' ' + month;
    return formattedDate;
}

export const currentDate = ()=>{
    var date = new Date()
    var day = date.getDate();
    var monthName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var month = monthName[date.getMonth()];

    var currentDate = day + ' ' + month;
    return currentDate;
}

export const getRoomId = (Id1, Id2)=>{
    const sortedIds = [Id1, Id2].sort();
    const roomId = sortedIds.join('-');
    return roomId;
}


//will work on future because of month last and first date logic
// export const yesterdayDate = ()=>{
//     var date = new Date()
//     var day = date.getDate() - 1;
//     var monthName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//     var month = monthName[date.getMonth()];

//     var yesterdayDate = day + ' ' + month;
//     return yesterdayDate;
// }