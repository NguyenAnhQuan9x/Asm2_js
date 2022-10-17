//Lấy sản phẩm
function getDish() {
    return fetch('http://localhost:3000/dishes').then(function(res) {
        console.log(res)
        return res.json()
    })
}
var content = document.querySelector('#showProduct');

getDish().then(function(result) {
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
            <td>${value.cate}</td>
            <td>${value.price}</td>
            <td>${value.amount}</td>
            <td>${value.description}</td>
            <td><image src= "${value.image}" width = "100px" height = "100px"></td>
            <td><button onclick = "editProduct(${value.id})">Sửa</button></td>
            <td><button onclick = "deleteProduct(${value.id})">Xóa</button></td>
        </tr>
        `
    });
}
//Xóa món ăn
function deleteProduct(id) {
    alert('Bạn có chắc chắn muốn xóa');
    return fetch('http://localhost:3000/dishes/'+id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function() {
        location.href = "../showProduct/showProduct.html"
    })
}
//Edit món ăn
function editProduct(id) {
    localStorage.setItem('idProduct',JSON.stringify(id));
    location.href = "/Asm2/Admin/Product/editProduct/editProduct.html";
}