import { useQuery } from "@tanstack/react-query"
import { getHeroesByPageAction } from "../actions/get-heores-by-page.action"

export const usePaginatedHeroes = (page:string, limit:string, category:string = 'all') => {
    return useQuery({
        queryKey:['heroes', {page, limit,category}],
        queryFn:()=> getHeroesByPageAction(+page, +limit, category),
        staleTime:1000*60*5,
      })
}
