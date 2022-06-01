var host = window.location.origin;
// Получение всех точек
async function getSalesPoints() {
    const response = await fetch(host + "/api/SalesPoint", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    
    if (response.ok === true) {
        const SalesPoints = await response.json();
        const rows = document.querySelector("tbody");
        SalesPoints.forEach(SalesPoint => rows.append(row(SalesPoint)));
    }
}
// Получение одной точки
async function getSalesPoint(id) {
    const response = await fetch(host + "/api/SalesPoint/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const SalesPoint = await response.json();
        const form = document.forms["SalesPointForm"];
        form.elements["id"].value = SalesPoint.id;
        form.elements["name"].value = SalesPoint.name;
    }
    else {
        const error = await response.json();
        console.log(error.message); 
    }
}
// Добавление точки
async function createSalesPoint(SalesPointName) {

    const response = await fetch(host + "/api/SalesPoint", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: SalesPointName
        })
    });
    if (response.ok === true) {
        const SalesPoint = await response.json();
        reset();
        document.querySelector("tbody").append(row(SalesPoint));
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}
// Изменение точки
async function editSalesPoint(SalesPointId, SalesPointName) {
    const response = await fetch(host + "/api/SalesPoint", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: SalesPointId,
            name: SalesPointName
        })
    });
    if (response.ok === true) {
        const SalesPoint = await response.json();
        reset();
        document.querySelector("tr[data-rowid='" + SalesPoint.id + "']").replaceWith(row(SalesPoint));
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}
// Добавление продукта в точку
async function addProductToSalesPoint(salesPointId) {
    document.location.href = host + "/admin/providedproductcontrol"
    localStorage.setItem("salesPointId", salesPointId)
} 
//Список продуктов в точке
async function ListProductSalesPoint(salesPointId) {
    document.location.href = host + "/admin/providedproductlistcontrol"
    localStorage.setItem("salesPointId", salesPointId)
} 
// Удаление точки
async function deleteSalesPoint(id) {
    const response = await fetch(host + "/api/SalesPoint/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const SalesPoint = await response.json();
        document.querySelector("tr[data-rowid='" + SalesPoint.id + "']").remove();
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}

// сброс данных формы после отправки
function reset() {
    const form = document.forms["SalesPointForm"];
    form.reset();
    form.elements["id"].value = 0;
}
// создание строки для таблицы
function row(SalesPoint) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", SalesPoint.id);

    const nameTd = document.createElement("td");
    nameTd.setAttribute("style", "cursor:pointer;padding:15px");
    nameTd.append(SalesPoint.name);

    tr.append(nameTd);


    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        getSalesPoint(SalesPoint.id);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        deleteSalesPoint(SalesPoint.id);
    });

    linksTd.append(removeLink);

    const AddProductLink = document.createElement("a");
    AddProductLink.setAttribute("style", "cursor:pointer;padding:15px;");
    AddProductLink.append("Добавить продукт в точку продаж");
    AddProductLink.addEventListener("click", e => {

        e.preventDefault();
        addProductToSalesPoint(SalesPoint.id);
    });

    linksTd.append(AddProductLink);

    const ListProductLink = document.createElement("a");
    ListProductLink.setAttribute("style", "cursor:pointer;padding:15px;");
    ListProductLink.append("Список доступного продукта");
    ListProductLink.addEventListener("click", e => {

        e.preventDefault();
        ListProductSalesPoint(SalesPoint.id);
    });

    linksTd.append(ListProductLink);

    tr.appendChild(linksTd);

    return tr;
}

// сброс значений формы
document.getElementById("reset").addEventListener("click", e => {

    e.preventDefault();
    reset();
})

// отправка формы
document.forms["SalesPointForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["SalesPointForm"];
    const id = form.elements["id"].value;
    const name = form.elements["name"].value;
    if (id == 0)
        createSalesPoint(name);
    else
        editSalesPoint(id, name);
});

// загрузка точек
getSalesPoints();