const grabSearchOnClick = () => {
    // spinner on
    document.getElementById('spinner').style.visibility = 'visible';
    //  search count box clear
    const searchCount = document.getElementById('search-count');
    searchCount.innerHTML = '';
    //  Error box clear
    const errorMsg = document.getElementById('error-msg');
    errorMsg.innerText = ''
    // post clear in short way
    document.getElementById('books').innerHTML='';
    
    // SearchText capture
    const grabSearch = document.getElementById('grab-search');
    const grabValue = grabSearch.value;
    const searchText = grabValue;
    //passing search text for database match
    grabData(searchText);

}

const grabData = searchText => {
    const url = (`https://openlibrary.org/search.json?q=${searchText}`)
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayResult(data))
    .catch(error => dsiplayError(error))
}

//Error handling if api link not working or no internet
const dsiplayError = error =>{
    const errorMsg = document.getElementById('error-msg');
    errorMsg.innerText = 'Something went wrong'

}

const displayResult = books => 
{
    
    const bookArray = books.docs;
    const displaybooks = document.getElementById('books');
    displaybooks.classList.add('row')
    displaybooks.innerHTML='';
    
    // loop run for elements
    let i=0;
    // Error handling
    if(bookArray.length === 0){
        const errorMsg = document.getElementById('error-msg');
        errorMsg.innerText = 'Please insert proper Keywords ! Try Again ! Cheers !'
    }
    bookArray.forEach(element => {
        //counting for showing 20 results
        if(i < 20)
        {
        const divContain = document.createElement('div')
        divContain.classList.add('col-md-3')
        divContain.classList.add('p-3')
        divContain.innerHTML=

            `   <div class="card" style="width: 18rem height: 36rem;">
                <img style="height: 20rem" src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top bg-light " alt="...">
                <div class="card-body">
                    <h5 class="card-title m-0 text-secondary">${element.title}</h5>
                    
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>Author :</b> ${element.author_name ? element.author_name : 'Not available' } </li>
                    <li class="list-group-item"><b>Publisher :</b> ${element.publisher}</li>
                    <li class="list-group-item"><b>Publish Year :</b> ${element.publish_year}</li>
                </ul>
                
                </div>   `
                displaybooks.appendChild(divContain);
                i++;
        }
        else{console.log('no entry')}
        
    });
    // search count setting
    const searchCount = document.getElementById('search-count');
    searchCount.innerHTML = `<p class="fst-italic text-secondary mb-0"> ${i} results are shown out of ${books.numFound}</p>
    <hr>`
    // search box cleared after post loaded
    document.getElementById('grab-search').value='';
    //spinner off
    document.getElementById('spinner').style.visibility = 'hidden';
}
