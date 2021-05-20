function createNewBoard(arr, size){
    for (let index = 0; index < size; index++) {
        let obj = {
            color:"white",
            id:index,
            html:`<div id="${index}" class="box"></div>`
        }
        arr.push(obj);
      }
}


module.exports = createNewBoard