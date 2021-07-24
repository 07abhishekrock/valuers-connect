var checkList2 = document.getElementById('list3');
console.log(checkList2);
checkList2.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (checkList2.classList.contains('visible'))
    checkList2.classList.remove('visible');
  else
    checkList2.classList.add('visible');
}

var checkList4 = document.getElementById('list5');
checkList4.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (checkList4.classList.contains('visible'))
    checkList4.classList.remove('visible');
  else
    checkList4.classList.add('visible');
}




