import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SearchPage from "./SearchPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";
import { MemoryRouter } from "react-router";
import { useSearchResuls } from "@/heroes/hooks/useSearchResuls";
import type { Hero } from '../../types/hero.interface';

vi.mock('@/heroes/hooks/useSearchResuls')

const mockedUseSearchResuls = vi.mocked(useSearchResuls)

mockedUseSearchResuls.mockReturnValue({
    data:{heroes:[{id:'1', name:'Carlos Kent'}]},
    isLoading: false,
    isError:false,
    isSuccess: true
} as unknown as ReturnType<typeof useSearchResuls>)

vi.mock('@/components/custom/Jumbotron', ()=>({
    Jumbotron:()=><div data-testid="custom-jumbotron"></div>
}))

vi.mock('@/heroes/components/HeroGrid', ()=>({
    HeroGrid:({heroList}:{heroList:Hero[]})=>(<div data-testid="hero-grid">
        {heroList.map((hero)=>(<div key={hero.id}>{hero.name}</div>))}
    </div>)
}))


const queryClient = new QueryClient()

const renderPage = (initialEntries:string[] = ['/search'])=>{
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryClient}>
                        <SearchPage></SearchPage>
                </QueryClientProvider>
            </FavoriteHeroProvider>
        </MemoryRouter>
    )
}


describe('SearchPage', () => { 

    beforeEach(()=>{
        vi.clearAllMocks();
        queryClient.clear();
    })

    test('should render search page with default values', () => { 
        const {container} = renderPage()
        expect(mockedUseSearchResuls).toHaveBeenCalledWith({name:'', strength:undefined})

        expect(container).toMatchSnapshot()
     })

     test('should query hook with name parameter', () => { 
        const {container} = renderPage(['/search?search=superman'])
        expect(mockedUseSearchResuls).toHaveBeenCalledWith({name:'superman', strength:undefined})
        
    })
     test('should query hook with strength parameter', () => { 
        const {container} = renderPage(['/search?strength=6'])
        expect(mockedUseSearchResuls).toHaveBeenCalledWith({name:'', strength:"6"})  
    })

    test('should render heroGrid with search Results', () => { 
        const {container} = renderPage()
            
        const heroGrid = screen.getByTestId('hero-grid')
        expect(screen.getByText('Carlos Kent')).toBeDefined()
     })
 })