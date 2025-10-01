import { describe, expect, test, vi } from "vitest"
import { HeroStats } from "./HeroStats"
import { render, screen } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useHeroesSummary } from "../hooks/useHeroesSummary"
import type { SummaryInformationResponse } from "../types/summary-information.response"
import { FavoriteHeroProvider } from "../context/FavoriteHeroContext"
import type { Hero } from "../types/hero.interface"





vi.mock('../hooks/useHeroesSummary')
const mockUseHeroSummary = vi.mocked(useHeroesSummary)

const mockData:SummaryInformationResponse = {
    "totalHeroes": 25,
    "strongestHero": {
        "id": "1",
        "name": "Clark Kent",
        "slug": "clark-kent",
        "alias": "Superman",
        "powers": [
            "Súper fuerza",
            "Vuelo",
            "Visión de calor",
            "Visión de rayos X",
            "Invulnerabilidad",
            "Súper velocidad"
        ],
        "description": "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
        "strength": 10,
        "intelligence": 8,
        "speed": 9,
        "durability": 10,
        "team": "Liga de la Justicia",
        "image": "1.jpeg",
        "firstAppearance": "1938",
        "status": "Active",
        "category": "Hero",
        "universe": "DC"
    },
    "smartestHero": {
        "id": "2",
        "name": "Bruce Wayne",
        "slug": "bruce-wayne",
        "alias": "Batman",
        "powers": [
            "Artes marciales",
            "Habilidades de detective",
            "Tecnología avanzada",
            "Sigilo",
            "Genio táctico"
        ],
        "description": "El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
        "strength": 6,
        "intelligence": 10,
        "speed": 6,
        "durability": 7,
        "team": "Liga de la Justicia",
        "image": "2.jpeg",
        "firstAppearance": "1939",
        "status": "Active",
        "category": "Hero",
        "universe": "DC"
    },
    "heroCount": 18,
    "villainCount": 7
}

const mockHero:Hero = {
    "id": "1",
    "name": "Clark Kent",
    "slug": "clark-kent",
    "alias": "Superman",
    "powers": [
        "Súper fuerza",
        "Vuelo",
        "Visión de calor",
        "Visión de rayos X",
        "Invulnerabilidad",
        "Súper velocidad"
    ],
    "description": "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
    "strength": 10,
    "intelligence": 8,
    "speed": 9,
    "durability": 10,
    "team": "Liga de la Justicia",
    "image": "1.jpeg",
    "firstAppearance": "1938",
    "status": "Active",
    "category": "Hero",
    "universe": "DC"
}

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            retry:false
        }
    }
})

const renderHeroStats = (mockData?: Partial<SummaryInformationResponse>)=>{

    mockUseHeroSummary.mockReturnValue({
        data:mockData ?? undefined
    }  as unknown as ReturnType<typeof useHeroesSummary> )
    return render(
        <QueryClientProvider client={queryClient}>
            <FavoriteHeroProvider>
                <HeroStats></HeroStats>
            </FavoriteHeroProvider>
        </QueryClientProvider>
    )
}

describe('HeroStats', () => { 
        
    test('should render HeroStats with mock info',()=>{
        renderHeroStats(mockData)

        
        expect(screen.getByText('Total Characters')).toBeDefined()
        expect(screen.getByText('Favoritos')).toBeDefined()
        expect(screen.getByText('Strongest')).toBeDefined()
    })
    
    test('should change the % when hero is added to favorites', ()=>{
        localStorage.setItem('favorites', JSON.stringify([mockHero]))
        
        renderHeroStats(mockData)

        const favoriteContent = screen.getByTestId('favorite-content')
        const favoriteCount = screen.getByTestId('favoriteCount')

        expect(favoriteContent.innerHTML).toContain('4')
        expect(favoriteCount.innerHTML).toBe('1')
        
        screen.debug(favoriteCount)
    })
 })