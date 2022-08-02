function getTime(){
    const data = new Date();
    let y = data.getFullYear();
    let M = data.getMonth() + 1;
    let d = data.getDate();
    let h = data.getHours();
    let m = data.getMinutes();
    let s = data.getSeconds();
    return `${y}年${handelZero(M)}月${handelZero(d)}日-${handelZero(h)}时${handelZero(m)}分${handelZero(s)}秒`
}
function handelZero(num){
   return num <= 9 ? '0' + num : num;
}