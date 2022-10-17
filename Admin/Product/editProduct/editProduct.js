// Edit Categories
var edit = document.querySelector('#editProduct')
var ProductId = localStorage.getItem("idProduct");
var dishName = document.querySelector('#dishName');
var dishPrice = document.querySelector('#dishPrice');
var dishAmount = document.querySelector('#dishAmount');
var description = document.querySelector('#description');
var selectCate = document.querySelector('#selectCate');
var dishImage = document.querySelector('#dishImage');
var preview_image = document.querySelector('#preview-image');
console.log(ProductId)
//Upload image
function uploadImage(url, base64) {
    return fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: base64})
    }).then((res) => res.json())
}
// Handle image
var image = document.querySelector('#dishImage');
var image_url = '';
image.onchange = function(e) {
    var file = e.target.files[0]
    preview_image.style.display = "block";
    var reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = function() {
       var result = uploadImage('https://image-uploader-anhhtus.herokuapp.com/api/upload',reader.result);
       result.then(function(res){
           preview_image.src = res.secure_url;
           preview_image.style.display = "block";
           image_url = res.secure_url;
       })
   }
}
//Lấy món ăn chi tiết
function getProduct(id) {
    return fetch('http://localhost:3000/dishes/'+id).then(function(res) {
        return res.json()
    })
}
getProduct(ProductId).then(function(result) {
    preview_image.style.display = "block";
    console.log(result);
    dishName.value = result.name
    dishPrice.value = Number(result.price)
    dishAmount.value = Number(result.amount)
    selectCate.value = result.cate
    description.value = result.description
    preview_image.src = result.image
    image_url = result.image
})
//Lấy danh mục
function getCate() {
    return fetch('http://localhost:3000/categories').then(function(res) {
        return res.json()
    })
}
var cates = document.querySelector('#selectCate');
//Lấy danh mục
getCate().then(function(result) {
    console.log(result);
    render(result);
})
function render(data){
    cates.innerHTML = "";
    data.forEach(function(value) {
        cates.innerHTML +=`
        <option value = "${value.name}" ${(value.name == selectCate.value)? 'selected':''}>${value.name}</option>
        `
    });
}

function editProduct(data,id) {
    return fetch('http://localhost:3000/dishes/'+id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(function(res) {
        return res.json()
    })
}

edit.onsubmit = function(e) {
    e.preventDefault()
    var data = {
        name:dishName.value,
        cate:selectCate.value,
        price:dishPrice.value,
        amount:dishAmount.value,
        description:description.value,
        //image: preview_image.getAttribute('src')
        image:image_url
    }
    editProduct(data,ProductId).then(function() {
    })
    location.href = "/Asm2/Admin/Product/showProduct/showProduct.html"
}