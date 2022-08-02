function scrollTop(scrollTab,tbody,speed,count) {
    var t = scrollTab.offsetTop;//top值
    scrollTab.style.top = t - speed + 'px';//滚动

    var trs = tbody.getElementsByTagName('tr');//每次都重新取出所有内容行				
    var newTr = trs[count].cloneNode(true);//复制行，得到新的行对象
    //将滚动的行追加到表格底部
    tbody.appendChild(newTr);
    count++;
}