import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, test, vi } from "vitest"
import { HomePage } from "./HomePage"
import { MemoryRouter } from "react-router"
import { usePaginatedHeroes } from "@/heroes/hooks/usePaginatedHeroes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext"

vi.mock('@/heroes/hooks/usePaginatedHeroes')

const mockUsePaginatedHero = vi.mocked(usePaginatedHeroes)

mockUsePaginatedHero.mockReturnValue({
    data:[],
    isLoading: false,
    isError:false,
    isSuccess: true
} as unknown as ReturnType<typeof usePaginatedHeroes>)

const queryClient = new QueryClient()


const renderHomePage = (initialEntries:string[] = ['/'])=>{
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryClient}>
                        <HomePage></HomePage>
                </QueryClientProvider>
            </FavoriteHeroProvider>
        </MemoryRouter>
    )
}

describe('HomePage', () => { 

    beforeEach(()=>{
        vi.clearAllMocks();
        queryClient.clear();
    })

    test('should render HomePage with default values', () => { 
        const {container} = renderHomePage()

        expect(container).toMatchSnapshot()
     })

     test('should call usePaginatedHero with default value', () => { 
        renderHomePage()
        expect(mockUsePaginatedHero).toHaveBeenCalledWith('1','6','all')
      })
     
      test('should call usePaginatedHero with custom query params', () => { 
        renderHomePage(['/?page=2&limit=15&category=villains'])
        expect(mockUsePaginatedHero).toHaveBeenCalledWith('2','15','villains')
      })
      
      test('should called usePaginatedHero with default page and same limit on tab clicked', () => { 
        renderHomePage(['/?tab=favorites&page=2&limit=10'])

        const [,,, villainsTab] = screen.getAllByRole('tab')
        fireEvent.click(villainsTab)

        expect(mockUsePaginatedHero).toHaveBeenCalledWith('1','6','villain')


      })
 })