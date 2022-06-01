var host = window.location.origin;
// Получение всех продуктов
async function getProducts() {
    const response = await fetch(host + "/api/buyer", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    
    if (response.ok === true) {
        const products = await response.json();
        const rows = document.querySelector("tbody");
        products.forEach(product => rows.append(row(product)));
    }
}

// Удаление продукта
async function deleteProduct(id) {
    const response = await fetch(host + "/api/buyer/" + id, {
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
function ListSalesOfBuyer(id)
{
    document.location.href = host + "/admin/listsalesofbuyer";
    localStorage.setItem("BuyerId", id)
}

// создание строки для таблицы
function row(product) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", product.id);

    const nameTd = document.createElement("td");
    nameTd.setAttribute("style", "cursor:pointer;padding:15px");
    nameTd.append(product.name);

    tr.append(nameTd);

    const linksTd = document.createElement("td");

    
    const removeLink = document.createElement("a");
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        deleteProduct(product.id);
    });

    linksTd.append(removeLink);

    const ListSalesLink = document.createElement("a");
    ListSalesLink.setAttribute("style", "cursor:pointer;padding:15px;");
    ListSalesLink.append("Список заказов");
    ListSalesLink.addEventListener("click", e => {

        e.preventDefault();
        ListSalesOfBuyer(product.id);
    });

    linksTd.append(ListSalesLink);

    
    tr.appendChild(linksTd);

    return tr;
}


// загрузка продуктов
getProducts();