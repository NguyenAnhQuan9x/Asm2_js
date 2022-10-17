
function getDishes() {
    return fetch('http://localhost:3000/dishes').then(function(res) {
        return res.json()
    })
}
// lấy món ăn
getDishes().then(function(result) {
    console.log(result);
    //render(result)
})
function render(data) {
    var content = ""
    if(data) {
        data.forEach(function(item, index) {
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td><a class="hover:text-red-400" href="./update/update.html?id=${item.id}">${item.name}</a></td>
                    <td>${item.description}</td>
                </tr>
            `
        })
    }
    document.querySelector('#table').innerHTML = content
}

