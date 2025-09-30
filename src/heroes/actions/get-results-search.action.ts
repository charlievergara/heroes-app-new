import { heroAPI } from "../heroes.api"
import type { Hero } from "../types/hero.interface"

const BASE_URL = import.meta.env.VITE_API_URL

export interface Options {
    name?:string;
    team?:string;
    category?:string;
    universe?:string;
    status?:string;
    strength?:string;
}


export const getResultsSearchAction = async(options:Options={})=> {

    const {data} = await heroAPI.get<Hero[]>(`/search`, {params:{
        ...options
    }})

    const heroes = data.map((hero:Hero)=>{
        return {
            ...hero,
            image: `${BASE_URL}/images/${hero.image}`
        }
    })

    return {
        heroes
    }
}