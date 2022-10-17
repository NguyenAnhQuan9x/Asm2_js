//Lấy danh mục
function getCate() {
    return fetch('http://localhost:3000/categories').then(function(res) {
        return res.json()
    })
}
var cates = document.querySelector('.nav');
//Lấy danh mục
getCate().then(function(result) {
    console.log(result);
    showCate(result);
})
function showCate(data){
    data.forEach(function(value) {
        cates.innerHTML +=`
        <li><a href = "#" onclick = "Type('${value.name}')">${value.name}</a></li>
        `
    });
}
//Lấy sản phẩm
//Lấy sản phẩm
function getDish() {
    return fetch('http://localhost:3000/dishes').then(function(res) {
        console.log(res)
        return res.json()
    })
}
var productList = document.querySelector('#product-lists');
var dishList = "";
getDish().then(function(result) {
    console.log(result);
    dishList = result;
    render(result);
})
function render(data){
    productList.innerHTML = "";
    data.forEach(function(value) {
        productList.innerHTML +=`
        <div class="card col-lg-3">
                <a href = ""id = "product-image"><img class="card-img-top" src="${value.image}" alt="Card image" width="100%" height="200px"></a>
                <div class="card-body">
                  <h4 class="card-title">${value.name}</h4>
                  <p class="card-text">${value.description}</p>
                  <p class="card-text" id = "price">${value.price}</p>
                  <button class="btn btn-primary">Chọn</button>
                </div>
              </div>
        `
    });
}
//Lọc món ăn
function Type(cate){
    console.log('quan');
    productList.innerHTML = "";
    dishList.forEach(function(value){
        if(value.cate == cate){
            productList.innerHTML +=`
        <div class="card col-lg-3">
                <a href = ""id = "product-image"><img class="card-img-top" src="${value.image}" alt="Card image" width="100%" height="200px"></a>
                <div class="card-body">
                  <h4 class="card-title">${value.name}</h4>
                  <p class="card-text">${value.description}</p>
                  <p class="card-text" id = "price">${value.price}</p>
                  <button class="btn btn-primary">Chọn</button>
                </div>
              </div>
        `
        }
    })
}
//Lọc theo giá trị tìm kiếm người dùng nhập vào
var searchInput = document.querySelector('#search-form');
var searchValue = document.querySelector('#search')
searchInput.onsubmit = function(e){
    e.preventDefault()
    productList.innerHTML = "";
    dishList.forEach(function(value){
        if(value.name.includes(searchValue.value)){
            console.log('lọc')
            productList.innerHTML +=`
        <div class="card col-lg-3">
                <a href = ""id = "product-image"><img class="card-img-top" src="${value.image}" alt="Card image" width="100%" height="200px"></a>
                <div class="card-body">
                  <h4 class="card-title">${value.name}</h4>
                  <p class="card-text">${value.description}</p>
                  <p class="card-text" id = "price">${value.price}</p>
                  <button class="btn btn-primary">Chọn</button>
                </div>
              </div>
        `
        }
    })
}