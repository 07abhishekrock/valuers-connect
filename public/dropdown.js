var checkList = document.getElementById('list1');
checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (checkList.classList.contains('visible'))
    checkList.classList.remove('visible');
  else
    checkList.classList.add('visible');
}
var checkList1 = document.getElementById('list2');
checkList1.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (checkList1.classList.contains('visible'))
    checkList1.classList.remove('visible');
  else
    checkList1.classList.add('visible');
}
var checkList2 = document.getElementById('list3');
checkList2.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (checkList2.classList.contains('visible'))
    checkList2.classList.remove('visible');
  else
    checkList2.classList.add('visible');
}

var checkList3 = document.getElementById('list4');
checkList3.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (checkList3.classList.contains('visible'))
    checkList3.classList.remove('visible');
  else
    checkList3.classList.add('visible');
}

var checkList4 = document.getElementById('list5');
checkList4.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (checkList4.classList.contains('visible'))
    checkList4.classList.remove('visible');
  else
    checkList4.classList.add('visible');
}




