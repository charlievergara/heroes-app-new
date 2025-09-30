import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react'
import { useHeroesSummary } from "./useHeroesSummary"
import type { PropsWithChildren } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getSummaryAction } from '../actions/get-summary.action';
import type { SummaryInformationResponse } from '../types/summary-information.response';
// import { getSummaryAction } from '../actions/get-summary.action';

vi.mock('../actions/get-summary.action', ()=>({
    getSummaryAction:vi.fn()
}))

const mockGetSummaryAction = vi.mocked(getSummaryAction);


const tanStackCustomProvider = ()=>{

    const queryClient = new QueryClient({
        defaultOptions:{
            queries:{
                retry:false
            }
        }
    })

    return  ({children}:PropsWithChildren)=>{
        return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        }
}

describe('useHeroesSummary', () => { 

    beforeEach(()=>{
        mockGetSummaryAction.mockClear()
    })
    test('should return the initial state (isLoading)', () => { 
        const {result} = renderHook(()=>useHeroesSummary(),{
            wrapper:tanStackCustomProvider()
        })

        expect(result.current.isLoading).toBe(true)
        expect(result.current.isError).toBe(false)
        expect(result.current.data).toBe(undefined)
        expect(result.current.data).toBeUndefined()
     })

     test('should return success state with data when API call succeeds', async () => {
        const mockGetSummarydata = {
            totalHeroes: 10,
            strongestHero:{
                id:'1',
                name: 'Superman'
            },
            smartestHero:{
                id:'2',
                name:'Batman'
            },
            heroCount:7,
            villainCount:3
        } as SummaryInformationResponse

        mockGetSummaryAction.mockResolvedValue(mockGetSummarydata)

        const {result} = renderHook(()=>useHeroesSummary(),{
            wrapper:tanStackCustomProvider()
        })



        await waitFor(()=>{
            expect(result.current.isSuccess).toBe(true)
        })

        expect(result.current.isError).toBe(false)
        expect(mockGetSummaryAction).toHaveBeenCalled()
     })

     
     test('should return error state when API call ails', async() => { 
         const mockError = new Error('failed to fetch summary')
         mockGetSummaryAction.mockRejectedValue(mockError)

        const {result} = renderHook(()=>useHeroesSummary(),{
            wrapper:tanStackCustomProvider()
        })

        await waitFor(()=>{
            expect(result.current.isError).toBe(true)
        })

        expect(mockGetSummaryAction).toHaveBeenCalledTimes(1)
        expect(result.current.error?.message).toBe('failed to fetch summary')
        expect(result.current.error).toBeDefined()
        expect(result.current.isLoading).toBe(false)
        expect(mockGetSummaryAction).toHaveBeenCalled()
     })
 })