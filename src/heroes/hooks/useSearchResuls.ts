import { useQuery } from '@tanstack/react-query'
import { getResultsSearchAction, type Options } from '../actions/get-results-search.action'

export const useSearchResuls = (options:Options) => {
 return useQuery({
    queryKey:['heroes','search', {...options}],
    queryFn:()=> getResultsSearchAction(options),
    staleTime: 1000*60*5
 }) 
}
