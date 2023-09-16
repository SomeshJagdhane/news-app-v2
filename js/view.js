import {openMenu, closeMenu,handleLink, loadQuery} from "./controller.js";

const btnMenu = document.getElementById(`btn-menu`);
const btnClose = document.getElementById(`btn-close`);
const navLinks = document.getElementById(`nav-links`);
const searchBtn = document.getElementById(`btn-search`);
const searchInput = document.getElementById(`input-search`);
const loader = document.getElementById(`loader-container`);
const newsContainer = document.getElementById(`news-container`);

export function renderNews(articles){
    newsContainer.innerHTML='';

    articles.forEach(article=>{
        if(!article.urlToImage) return;
        const cloneNode = document.querySelector(`template`).content.cloneNode(true);
        
        bindData(article, cloneNode);
        newsContainer.appendChild(cloneNode);
        
    });
    
}
function bindData(article, cloneNode){
    
    const newsImg = cloneNode.getElementById(`news-img`);
    const newsTitle = cloneNode.getElementById(`news-title`);
    const newsSrcDate = cloneNode.getElementById(`news-src-date`);
    const newsContent = cloneNode.getElementById(`news-content`);

    const src = article.source.name;
    const date = new Date(article.publishedAt).toLocaleDateString(`en-US`,{
        timeZone: `Asia/Jakarta`
    });

    newsImg.src=article?.urlToImage;
    newsTitle.innerHTML = article.title;
    newsContent.innerHTML = article.description;
    newsSrcDate.innerHTML = `${src}  - ${date}`;
    
    cloneNode.firstElementChild.addEventListener(`click`,function(){
        window.open(article.url);
    });
}

// -------- Menu Functionality ------
btnMenu.addEventListener(`click`,()=>openMenu(navLinks));

btnClose.addEventListener(`click`, ()=> closeMenu(navLinks));

// ---------- Top Links ----------
navLinks.addEventListener(`click`,function(e){
    const targetLink = e.target;
    if(!targetLink.classList.contains(`nav-link`)) return;
    handleLink(targetLink, searchInput);
    // closeMenu(navLinks);
    
});

// ------ Search functionality --------
searchBtn.addEventListener(`click`,function(e){
    e.preventDefault();
    const searchQuery = searchInput.value;
    if(!searchQuery)return;
    loadQuery(searchQuery);
});

// ----- Loading ---------
export function showLoader(){
    newsContainer.innerHTML=``;
    loader.classList.remove(`hidden`);
}
export function hideLoader(){
    loader.classList.add(`hidden`);   
}