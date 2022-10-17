// Edit Categories
var editCate = document.querySelector('#editCate')
var cateName = document.querySelector('#cateName')
var cateId = localStorage.getItem("idCate");
console.log(cateId);
//Lấy danh mục chi tiết
function getCate() {
    return fetch('http://localhost:3000/categories/'+cateId).then(function(res) {
        return res.json()
    })
}
getCate().then(function(result) {
    console.log(result);
    cateName.value = result.name;
})
function postCate(data) {
    return fetch('http://localhost:3000/categories/'+cateId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(function(res) {
        return res.json()
    })
}

editCate.onsubmit = function(e) {
    e.preventDefault()
    var name = cateName.value
    var data = {name}
    postCate(data).then(function() {
    })
    location.href = "../showCate/showCate.html"
}