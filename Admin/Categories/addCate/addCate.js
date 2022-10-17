// Add Categories
var addCate = document.querySelector('#addCate')
var cateName = document.querySelector('#cateName')

function postCate(data) {
    return fetch('http://localhost:3000/categories', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(function(res) {
        return res.json()
    })
}
//Validate
addCate.onsubmit = function(e) {
    e.preventDefault()
    cateName.nextElementSibling.innerHTML = "";
    if(cateName.value == ""){
        cateName.nextElementSibling.innerHTML ="Trường dữ liệu bắt buộc"
    }else{
        var name = cateName.value
        var data = {name}
        postCate(data).then(function() {
        })
        location.href = "../showCate/showCate.html"
    }
}