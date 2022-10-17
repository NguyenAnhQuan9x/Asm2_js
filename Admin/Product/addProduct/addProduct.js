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
        <option value = "${value.name}">${value.name}</option>
        `
    });
}
/* var preview_image = document.querySelector('#preview-image');
var image = document.querySelector('#dishImage');
function preview() {
        var file = image.files[0];
         var reader = new FileReader();
         reader.addEventListener("load",function(){
            //convert image file to base64
            preview_image.src = reader.result;
            console.log(reader.result);
            preview_image.style.display = "block";
         });
         if(file){
            reader.readAsDataURL(file);
         }

} */
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
var preview_image = document.querySelector('#preview-image');
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
//Add product

var productInfor = ['dishName','selectCate','dishPrice','dishAmount','description','dishImage']
function getValue(id) {
    return document.querySelector("#" + id).value;
}
var addProduct = document.querySelector("#addProduct")
function postProduct(data) {
    return fetch('http://localhost:3000/dishes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(function(res) {
        return res.json()
    })
}
//Validate form
function showError(id,content){
    var element = document.querySelector('#'+id);
    element.nextElementSibling.innerHTML = content;
}
function clearError(id){
    var element = document.querySelector('#'+id);
    element.nextElementSibling.innerHTML = "";
}
addProduct.onsubmit = function(e) {
    e.preventDefault()
    productInfor.forEach(function(value){
        clearError(value);
    })
    var i = 0;
    productInfor.forEach(function(value){
        var productValue= document.querySelector('#'+value)
        if(productValue.value == ""){
            showError(value,'Trường dữ liệu bắt buộc');
            i++;
        }
    })
    if(i == 0){
        var data = {
            name:getValue("dishName"),
            cate:getValue("selectCate"),
            price:getValue("dishPrice"),
            amount:getValue("dishAmount"),
            description:getValue("description"),
            //image: preview_image.getAttribute('src')
            image:image_url
        }
        postProduct(data).then(function() {
            location.href = "../showProduct/showProduct.html"
        })
    }
}
function getProduct() {
    return fetch('http://localhost:3000/dishes').then(function(res) {
        return res.json()
    })
}
//Lấy danh mục
getProduct().then(function(result) {
    console.log(result);
})