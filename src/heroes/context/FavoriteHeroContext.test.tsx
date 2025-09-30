import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { FavoriteHeroContext, FavoriteHeroProvider } from "./FavoriteHeroContext";
import { useContext } from "react";
import type { Hero } from "../types/hero.interface";


const mockHero = {
    id:'1',
    name:'batman'
} as Hero

const TestComponent = ()=>{
    const { favoriteCount, favorites, isFavorite, toggleFavorite} = useContext(FavoriteHeroContext)

    return (
        <div>
            <div data-testid="favorite-count">{favoriteCount}</div>
            <div data-testid="favorite-list">
                {
                    favorites.map((hero)=>(
                        <div key={hero.id} data-testid={`hero-${hero.id}`}>
                            {hero.name}
                        </div>
                    ))
                }
            </div>
            <button data-testid="toggle-favorite" onClick={()=>toggleFavorite(mockHero)}>Toggle</button>
            <div data-testid="is-favorite">{isFavorite(mockHero).toString()}</div>
        </div>
    )
}

const renderContextTest = ()=>{
    return render(<FavoriteHeroProvider><TestComponent></TestComponent></FavoriteHeroProvider>)
}

describe('FavoriteHeroContext', () => { 

    beforeEach(()=>{
        localStorage.clear()
    })

    test('should initialize with the default values', () => { 
        renderContextTest() 

        expect(screen.getByTestId('favorite-count').textContent).toBe("0")
        expect(screen.getByTestId('favorite-list').children.length).toBe(0)
     })    


     test('should add Hero to favorites when toggle favorite is called', () => { 
        renderContextTest()

        const button = screen.getByTestId('toggle-favorite')

        fireEvent.click(button)

        expect(screen.getByTestId('favorite-count').textContent).toBe('1')
        expect(screen.getByTestId('is-favorite').textContent).toBe('true')
        expect(screen.getByTestId('hero-1').textContent).toBe('batman')
        expect(localStorage.getItem('favorites')).toBe('[{"id":"1","name":"batman"}]')
      })
     
      test('should remove Hero from favorites when toggle favorite is called', () => { 

        localStorage.setItem('favorites', JSON.stringify([mockHero]))

        renderContextTest()

        expect(screen.getByTestId('favorite-count').textContent).toBe('1')
        expect(screen.getByTestId('is-favorite').textContent).toBe('true')
        expect(screen.getByTestId('hero-1').textContent).toBe('batman')

        const button = screen.getByTestId('toggle-favorite')

        fireEvent.click(button)

        expect(screen.getByTestId('favorite-count').textContent).toBe('0')
        expect(screen.getByTestId('is-favorite').textContent).toBe('false')
        expect(screen.queryByTestId('hero-1')).toBeNull()
        // expect(localStorage.getItem('favorites')).toBe('[{"id":"1","name":"batman"}]')
      })
})