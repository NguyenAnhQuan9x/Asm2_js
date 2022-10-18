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
                  <p class="card-text" id = "price">${ Intl.NumberFormat('de-DE').format(value.price)} VNĐ</p>
                  <button class="btn btn-primary" onclick = "addCart(${value.id})">Thêm vào giỏ hàng</button>
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
                  <p class="card-text" id = "price">${ Intl.NumberFormat('de-DE').format(value.price)} VNĐ</p>
                  <button class="btn btn-primary" onclick = "addCart(${value.id})">Thêm vào giỏ hàng</button>
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
                  <p class="card-text" id = "price">${ Intl.NumberFormat('de-DE').format(value.price)} VNĐ</p>
                  <button class="btn btn-primary" onclick = "addCart(${value.id})">Thêm vào giỏ hàng</button>
                </div>
              </div>
        `
        }
    })
}
//Add to cart
cart = document.querySelector('#show-cart');
if (getOrder('order') != null) {
    var orderLists = getDish('order');
    showCart();
} else {
    var orderLists = [];
}
function addCart(id){
    alert("Bạn muốn thêm sản phẩm này vào giỏ hàng");
    dishList.forEach(function(value,index){
        if(id == value.id){
            orderLists.push(dishList[index]);
            localStorage.setItem("order",JSON.stringify(orderLists))
            location.reload();
        }
    })
}
function getOrder(id){
    return JSON.parse(localStorage.getItem(id))
}
function showCart(){
    orderLists = getOrder('order');
    if(orderLists != ""){
        document.querySelector('#notify').innerHTML = "";
    }else{
        document.querySelector('#notify').innerHTML = "Không có sản phẩm trong giỏ hàng"
    }
    var amount = 0;
    var cash_amount = document.querySelector('#cash-amount');
    orderLists.forEach(function(value,index){
        amount += Number(value.price);
        cart.innerHTML +=`
        <div id = "productCart" class="card mb-3" style="max-width: 540px; height: 120px;">
                                <div class="row g-0">
                                  <div class="col-md-4">
                                    <img src="${value.image}" class="img-fluid rounded-start" alt="..." width="100px" height="100%">
                                  </div>
                                  <div class="col-md-8">
                                    <div class="card-body">
                                      <h5 class="card-title">${value.name}</h5>
                                      <p class="card-text">${value.description}</p>
                                      <p class="card-text"><small class="text-muted">Giá: ${ Intl.NumberFormat('de-DE').format(value.price)} VNĐ</small></p>
                                      <button onclick = "clearCart(${index})" id = "clearCart">Xóa</button
                                    </div>
                                  </div>
                                </div>
                              </div>
        `
    })
    console.log(amount)
    cash_amount.innerHTML += Intl.NumberFormat('de-DE').format(amount)+' VNĐ';
}
//Delete productCart
function clearCart(id){
    if(confirm("Bạn có chắc chắn muốn xóa không?") == true){
        orderLists.splice(id,1);
        localStorage.setItem('order',JSON.stringify(orderLists));
        location.reload();
    }
}