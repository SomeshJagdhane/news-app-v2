import { fetchNews, state } from "./model.js";
import { hideLoader, renderNews, showLoader} from "./view.js";
// ------ Menu Functionality ------

export function openMenu(navLinks){
    navLinks.style.right = 0;
}
export function closeMenu(navLinks){
    const navLinksWidth = window.getComputedStyle(navLinks).getPropertyValue(`width`);
    navLinks.style.right=`-${navLinksWidth}`;
}

// ------- load data -------
export async function loadQuery(query){
    try{
    showLoader();
    await fetchNews(query);
    hideLoader();
    renderNews(state.articles);
    }catch(error){
        alert(error);
    }
    
}
loadQuery(`india`);

export async function handleLink(link, searchInput){
    const parentLink = link.closest(`.nav-links`);
    const navLinks = parentLink.querySelectorAll(`.nav-link`);
    navLinks.forEach(navLink => {
        navLink.classList.remove(`active`);
    });
    link.classList.add(`active`);
    const query = link.dataset.query;
    searchInput.value=query;
   
   loadQuery(query);
}



