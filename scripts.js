const getProducts = () => {
    axios.get(`https://acme-users-api-rev.herokuapp.com/api/products`)
        .then(response => {
            renderProdcuts(response.data);
        })


}

const getCompanies = () => {
    axios.get(`https://acme-users-api-rev.herokuapp.com/api/companies`)
        .then(response => {
            renderCompanies(response.data)
        })
}

const renderProdcuts = products => {
    const results = document.querySelector('#results');
    const header = document.querySelector('h2');
    header.innerHTML = 'Products';
    location.hash = 'products';

    results.innerHTML = ''
    const html = products.map(product => 
        // eslint-disable-next-line no-unused-expressions
        `<tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.suggestedPrice}</td>
            <td>${product.createdAt}</td>
            <td>${product.updatedAt}</td>
        </tr>`
    ).join('')

    results.innerHTML = `<table class = 'table table-striped'>
    <thead>
    <tr>
        <th scope='col'>Id</th>
        <th scope='col'>Name</th>
        <th scope='col'>Description</th>
        <th scope='col'>Suggested Price</th>
        <th scope='col'>CreatedAt</th>
        <th scope='col'>UpdatedAt</th>
    </tr>
    </thead>
    <tbody>${html}</tbody>
    </table>`

}

const renderCompanies = companies => {
    const results = document.querySelector('#results');
    results.innerHTML = ''
    const header = document.querySelector('h2');
    header.innerHTML = 'Companies'


    // const html = companies.map(company =>
    //     `<div class='company row'>
    //     <div class='col'>${company.id}</div>
    //     <div class='col'>${company.name}</div>
    //     <div class='col'>${company.phone}</div>
    //     <div class='col'>${company.state}</div>
    //     <div class='col'>${company.catchPhrase}</div>
    //     <div class='col'>${company.createdAt}</div>
    //     <div class='col'>${company.updatedAt}</div>
    // </div>`
    // ).join('');

    const html = companies.map(company =>
        `<tr>
        <td>${company.id}</td>
        <td>${company.name}</td>
        <td>${company.phone}</td>
        <td>${company.state}</td>
        <td>${company.catchPhrase}</td>
        <td>${company.createdAt}</td>
        <td>${company.updatedAt}</td>
    </tr>`
    ).join('');

    // results.innerHTML = `<div class='col'>Id</div>
    // <div class='col'>Name</div>
    // <div class='col'>Phone</div>
    // <div class='col'>State</div>
    // <div class='col'>CatchPhrase</div>
    // <div class='col'>CreatedAt</div>
    // <div class='col'>UpdatedAt</div>
    // ${html}`

    results.innerHTML = `<table class = 'table table-striped'>
    <thead>
    <tr>
        <th scope='col'>Id</th>
        <th scope='col'>Name</th>
        <th scope='col'>Phone</th>
        <th scope='col'>State</th>
        <th scope='col'>CatchPhrase</th>
        <th scope='col'>CreatedAt</th>
        <th scope='col'>UpdatedAt</th>
    </tr>
    </thead>
    <tbody>${html}</tbody>
    </table>`
}

window.addEventListener('hashchange', ev => {
    let hash = window.location.hash.slice(1);
    if (hash === 'products') {
        getProducts()
    }
    else if (hash === 'companies') {
        getCompanies()
    }
})

if (!window.location.hash.slice(1)) {
    getProducts()
}

// const sort = () => {
//     let table, rows, switching, i, x, y, shouldSwitch;
//     table = document.querySelector('table');
//     switching = true;
//     while (switching) {
//         switching = false;
//         rows = table.rows;
//         for (let i = 0; i < (rows.length - 1); i++) {
//             shouldSwitch = false;
//             x = rows[i].getElementsByTagName('TD')[0];
//             y = rows[i + 1].getElementsByTagName('TD')[0];

//             if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//                 shouldSwitch = true;
//                 break;
//             }
//         }
//         if (shouldSwitch) {
//             rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//             switching = true;
//         }
//     }
// }

const sort = () => {
    const table = document.querySelector('tbody');
    const rows = [...table.querySelectorAll('tr')];
    const newRows = rows.sort((tr1, tr2) => { 
        if (tr1.children[1].innerHTML > tr2.children[1].innerHTML) { // better to give each tabledata a class and then
            // queryslectorall on the class
            return 1
        }
        else {
            return -1
        }
    })
    table.innerHTML = '';

    newRows.forEach(row => {
        table.appendChild(row);
    })
}

// const sort = (arg) => {
//     const table = document.querySelector('tbody');
//     const rows = [...table.querySelectorAll('tr')];
// }