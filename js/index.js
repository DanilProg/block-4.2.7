const search = document.querySelector('.search__git')
const outputField = document.querySelector('.res')
const link = 'https://api.github.com/search/repositories'
const searchMain = document.querySelector('.search__main')

const searchGitFetch= async () =>{
    const response =  await fetch(`${link}?q=${search.value}&per_page=5`)
    const searching = await response.json()
    showContentFn(searching.items)
}

const debounceFn = (ms=500) => {
    let flag = false
    let timer
    return function (){
        if(flag){
            clearTimeout((timer))
            timer = setTimeout(() => {
                flag = false
                searchGitFetch()
            }, ms)
        }else {
            flag = true
            timer = setTimeout(() =>{
                flag = false
                searchGitFetch()
            }, ms)
        }
    }
}

const showContentFn = (searching) => {
    outputField.innerHTML = ''
    for(let i = 0; i < searching.length; i++){
        const li = document.createElement('li')
        li.classList.add('output-field')
        li.innerHTML = `${searching[i].name}}`
        outputField.appendChild(li)
        li.addEventListener('click', ()=>{
            addBtn(searching[i].name, searching[i].owner.login, searching[i].stargazers_count)
        })
    }
}
search.addEventListener('input', debounceFn())

const createSpan = () => {
}
const addBtn = (name, login, count) => {
    const div = document.createElement('div')
    const buttnon = document.createElement('button')
    const spanName = document.createElement('span')
    const spanLogin = document.createElement('span')
    const spanStars = document.createElement('span')
    spanName.classList.add('span__style')
    spanLogin.classList.add('span__style')
    spanStars.classList.add('span__style')
    spanName.innerHTML = `Name:${name}`
    spanLogin.innerHTML = `Owner:${login}`
    spanStars.innerHTML = `Stars:${count}`
    div.appendChild(spanName)
    div.appendChild(spanLogin)
    div.appendChild(spanStars)
    buttnon.classList.add('btn')
    div.appendChild(buttnon)
    div.classList.add('search__inner')
    searchMain.appendChild(div)
    buttnon.addEventListener('click', ()=>{
        deleteBtn(div)
    })
    createSpan(div)
}

const deleteBtn = (div) => {
    div.remove()

}

