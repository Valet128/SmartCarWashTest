var host = window.location.origin;
// Получение всех продуктов
async function getProducts() {
    const response = await fetch(host + "/api/product", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    
    if (response.ok === true) {
        const products = await response.json();
        const rows = document.querySelector("tbody");
        products.forEach(product => rows.append(row(product)));
    }
}
// Получение одного продукта
async function getProduct(id) {
    const response = await fetch(host + "/api/product/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const product = await response.json();
        const form = document.forms["productForm"];
        form.elements["id"].value = product.id;
        form.elements["name"].value = product.name;
        form.elements["price"].value = product.price;
    }
    else {
        const error = await response.json();
        console.log(error.message); 
    }
}
// Добавление продукта
async function createProduct(productName, productPrice) {

    const response = await fetch(host + "/api/product", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: productName,
            price: parseFloat(productPrice)
        })
    });
    if (response.ok === true) {
        const product = await response.json();
        reset();
        document.querySelector("tbody").append(row(product));
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}
// Изменение продукта
async function editProduct(productId, productName, productPrice) {
    const response = await fetch(host + "/api/product", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: productId,
            name: productName,
            price: parseFloat(productPrice)
        })
    });
    if (response.ok === true) {
        const product = await response.json();
        reset();
        document.querySelector("tr[data-rowid='" + product.id + "']").replaceWith(row(product));
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}
// Удаление продукта
async function deleteProduct(id) {
    const response = await fetch(host + "/api/product/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const product = await response.json();
        document.querySelector("tr[data-rowid='" + product.id + "']").remove();
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}

// сброс данных формы после отправки
function reset() {
    const form = document.forms["productForm"];
    form.reset();
    form.elements["id"].value = 0;
}
// создание строки для таблицы
function row(product) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", product.id);

    const nameTd = document.createElement("td");
    nameTd.setAttribute("style", "cursor:pointer;padding:15px");
    nameTd.append(product.name);

    tr.append(nameTd);

    const priceTd = document.createElement("td");
    priceTd.append(product.price);
    tr.append(priceTd);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        getProduct(product.id);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        deleteProduct(product.id);
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}
// сброс значений формы
document.getElementById("reset").addEventListener("click", e => {

    e.preventDefault();
    reset();
})

// отправка формы
document.forms["productForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["productForm"];
    const id = form.elements["id"].value;
    const name = form.elements["name"].value;
    const price = form.elements["price"].value;
    if (id == 0)
        createProduct(name, price);
    else
        editProduct(id, name, price);
});

// загрузка продуктов
getProducts();