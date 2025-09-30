import { heroAPI } from "../heroes.api"
import type { Hero } from "../types/hero.interface"

const BASE_URL = import.meta.env.VITE_API_URL

export const getHeroBySlug = async (slug:string)=> { 

    const { data }  = await heroAPI.get<Hero>(`/${slug}`)

    return {
        ...data,
        image: `${BASE_URL}/images/${data.image}`
    }

}