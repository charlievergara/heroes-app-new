import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { renderHook, waitFor } from "@testing-library/react"
import type { PropsWithChildren } from "react"
import { beforeEach, describe, expect, test, vi } from "vitest"
import { usePaginatedHeroes } from "./usePaginatedHeroes"
import { getHeroesByPageAction } from "../actions/get-heores-by-page.action"

vi.mock('../actions/get-heores-by-page.action', ()=>({
    getHeroesByPageAction: vi.fn()
}))

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction)

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            retry:false
        }
    }
})

const tanStackCustomProvider = ()=>{


    return  ({children}:PropsWithChildren)=>{
        return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        }
}


describe('usePaginatedHeroes', () => { 

    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
      });

    test('should return the initial state (isLoading)', () => { 
        const {result} = renderHook(()=>usePaginatedHeroes('1', '6'),{
            wrapper:tanStackCustomProvider()
        })

        expect(result.current.isLoading).toBe(true) 
        expect(result.current.isError).toBe(false)
        expect(result.current.data).toBe(undefined)
        expect(result.current.data).toBeUndefined()
    })

    test('should return the response when succeeds', async() => { 

        const mockHeroesResponse = {
            total:20,
            pages: 4,
            heroes:[]
        }

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesResponse)

        const {result} = renderHook(()=>usePaginatedHeroes('1', '6'),{
            wrapper:tanStackCustomProvider()
        })

        await waitFor(()=>{
            expect(result.current.isSuccess).toBe(true)
        })

        expect(result.current.status).toBe('success')
        expect(mockGetHeroesByPageAction).toHaveBeenCalled()
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1,6,'all')
     })
    
     test('should call getHeroesByPageAction with arguments', async() => { 

        const mockHeroesResponse = {
            total:20,
            pages: 4,
            heroes:[]
        }

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesResponse)

        const {result} = renderHook(()=>usePaginatedHeroes('1', '6', 'heroes'),{
            wrapper:tanStackCustomProvider()
        })

        await waitFor(()=>{
            expect(result.current.isSuccess).toBe(true)
        })

        expect(result.current.status).toBe('success')
        expect(mockGetHeroesByPageAction).toHaveBeenCalled()
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1,6,'heroes')
     })
})