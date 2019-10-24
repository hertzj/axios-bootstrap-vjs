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
            <td class='id'>${product.id}</td>
            <td class='name'>${product.name}</td>
            <td class='description'>${product.description}</td>
            <td class='suggestedPrice'>${product.suggestedPrice}</td>
            <td class='created'>${product.createdAt}</td>
            <td class='updated'>${product.updatedAt}</td>
        </tr>`
    ).join('')

    results.innerHTML = `<table class = 'table table-striped'>
    <thead>
    <tr>
        <th data-type ='id' class='id' scope='col'>Id</th>
        <th data-type ='name' class='name' scope='col'>Name</th>
        <th data-type ='description' class='description' scope='col'>Description</th>
        <th data-type ='suggestedPrice' class='suggestedPrice' scope='col'>Suggested Price</th>
        <th data-type ='created' class='created' scope='col'>CreatedAt</th>
        <th data-type ='updated' class='updated' scope='col'>UpdatedAt</th>
    </tr>
    </thead>
    <tbody>${html}</tbody>
    </table>`

    let sortedBy = ''

    const tableHead = document.querySelector('thead');
    tableHead.addEventListener('click', ev => {
        const filter = ev.target.dataset.type;
        if (sortedBy === false || sortedBy !== filter) {
            sort(filter);
            sortedBy = filter;
        }
        else if (sortedBy === filter) {
            revSort(filter)
        }

    })

}

const renderCompanies = companies => {
    const results = document.querySelector('#results');
    results.innerHTML = ''
    const header = document.querySelector('h2');
    header.innerHTML = 'Companies'

    const html = companies.map(company =>
        `<tr>
        <td class='id'>${company.id}</td>
        <td class='name'>${company.name}</td>
        <td class='phone'>${company.phone}</td>
        <td class='state'>${company.state}</td>
        <td class='phrase'>${company.catchPhrase}</td>
        <td class='created'>${company.createdAt}</td>
        <td class='updated'>${company.updatedAt}</td>
    </tr>`
    ).join('');

    results.innerHTML = `<table class = 'table table-striped'>
    <thead>
    <tr>
        <th data-type='id' class='id' scope='col'>Id</th>
        <th data-type='name' class='name' scope='col'>Name</th>
        <th data-type='phone' class='phone' scope='col'>Phone</th>
        <th data-type='state' class='state' scope='col'>State</th>
        <th data-type='phrase' class='phrase' scope='col'>CatchPhrase</th>
        <th data-type='created' class='created' scope='col'>CreatedAt</th>
        <th data-type='updated' class='updated' scope='col'>UpdatedAt</th>
    </tr>
    </thead>
    <tbody>${html}</tbody>
    </table>`

    let sortedBy = ''

    const tableHead = document.querySelector('thead');
    tableHead.addEventListener('click', ev => {
        const filter = ev.target.dataset.type;
        if (sortedBy === false || sortedBy !== filter) {
            sort(filter);
            sortedBy = filter;
        }
        else if (sortedBy === filter) {
            revSort(filter)
        }

    })
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


const sort = filter => {
    const table = document.querySelector('tbody');
    const rows = [...table.querySelectorAll('tr')];
    const newRows = rows.sort((tr1, tr2) => {
        if (tr1.querySelector(`.${filter}`).innerHTML > tr2.querySelector(`.${filter}`).innerHTML) {
            return 1
        }
        else {
            return -1
        }
    })
    table.innerHTML = '';

    newRows.forEach(row => {
        table.appendChild(row)
    })
}

const revSort = filter => {
    const table = document.querySelector('tbody');
    const rows = [...table.querySelectorAll('tr')];
    const newRows = rows.sort((tr1, tr2) => {
        if (tr1.querySelector(`.${filter}`).innerHTML > tr2.querySelector(`.${filter}`).innerHTML) {
            return 1
        }
        else {
            return -1
        }
    }).reverse();
    table.innerHTML = '';

    newRows.forEach(row => {
        table.appendChild(row)
    })
}

// const sortTemplate = () => {
//     const table = document.querySelector('tbody');
//     const rows = [...table.querySelectorAll('tr')];
//     const newRows = rows.sort((tr1, tr2) => { 
//         if (tr1.children[1].innerHTML > tr2.children[1].innerHTML) { // better to give each tabledata a class and then
//             // queryslectorall on the class
//             return 1
//         }
//         else {
//             return -1
//         }
//     })
//     table.innerHTML = '';

//     newRows.forEach(row => {
//         table.appendChild(row);
//     })
// }