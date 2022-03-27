const loadPageData = () => {

    const pageId = document.getElementById('pageId').value
    
    fetch(`http://localhost:3001/all-media?page_id=${pageId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let list = document.getElementById('list')
            list.innerHTML = ""
            for(let i = 0;  i < data.length; i++){
                let html = `
                <div class="bg-red-100 flex justify-between px-10 mx-4 mb-2 border-red-500 border rounded">
                    <h5 >${data[i].author_name}</h5>
                    <p id=""text>${data[i].text}</p>
                </div>
                `
                list.appendChild(parseHTML(html))
            }
        })
        .catch(err => console.log(err))
}

function parseHTML(html) {
    var t = document.createElement('template');
    t.innerHTML = html;
    return t.content;
}