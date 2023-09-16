import { API_KEY, apiUrl } from "./configure.js";

export const state={
  articles:null
};

export async function fetchNews(query){
  
    try{
    const data = await fetch(`${apiUrl}${query}&apiKey=${API_KEY}`);
    state.articles= (await data.json()).articles;
    }catch(error){
      throw error;
    }
  
}