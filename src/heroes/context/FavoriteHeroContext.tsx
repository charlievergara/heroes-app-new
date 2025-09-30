import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";


interface FavoriteContext {
    favorites: Hero[];
    favoriteCount:number;
    
    //methods
    isFavorite: (hero:Hero) => boolean;
    toggleFavorite: (hero:Hero) => void;

}

export const FavoriteHeroContext = createContext({} as FavoriteContext)

const getFavoritesFromLocalStorage = ():Hero[]=> {
    const favorites = localStorage.getItem('favorites')

    return favorites ? JSON.parse(favorites): []
}

export const FavoriteHeroProvider = ({children}:PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage())

    const toggleFavorite = (hero: Hero) => {
        
        // const heroExist = favorites.find((currentHero:Hero) => currentHero.id === hero.id)

        if(isFavorite(hero)){
            const newFavorites = favorites.filter(h=>h.id !== hero.id)
            setFavorites(newFavorites)
        }else{
            setFavorites([...favorites, hero])
        }
    }

    const isFavorite = (hero:Hero) => {
        return favorites.some((currentHero:Hero) => currentHero.id === hero.id)
    }

    useEffect(() => {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])
    

  return (
    <FavoriteHeroContext value={{
        favoriteCount:favorites.length,
        favorites,
        toggleFavorite,
        isFavorite
    }}>
        {children}
    </FavoriteHeroContext>
  )
}
