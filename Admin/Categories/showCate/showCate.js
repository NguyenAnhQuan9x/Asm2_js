//Lấy danh mục
function getCate() {
    return fetch('http://localhost:3000/categories').then(function(res) {
        return res.json()
    })
}
var content = document.querySelector('#showCate');
//Lấy danh mục
getCate().then(function(result) {
    console.log(result);
    render(result);
})
function render(data){
    content.innerHTML = "";
    data.forEach(function(value,index) {
        content.innerHTML +=`
        <tr>
            <td>${index+1}</td>
            <td>${value.name}</td>
            <td><button onclick = "editCate(${value.id})" id = "edit">Sửa</button></td>
            <td><button onclick = "deleteCate(${value.id})" id = "delete">Xóa</button></td>
        </tr>
        `
    });
}
//Xóa danh mục
function deleteCate(id) {
    alert('Bạn có chắc chắn muốn xóa');
    return fetch('http://localhost:3000/categories/'+id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function() {
        location.href = "../showCate/showCate.html"
    })
}
//Edit danh mục
function editCate(id) {
    localStorage.setItem('idCate',JSON.stringify(id));
    location.href = "../editCate/editCate.html";
}