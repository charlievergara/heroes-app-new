import {
  Heart,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Jumbotron } from "@/components/custom/Jumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { Pagination } from "@/components/custom/Pagination"
import { MainBreadCrumb } from "@/components/custom/MainBreadCrumb"
import { useSearchParams } from "react-router"
import { useContext, useMemo } from "react"
import { useHeroesSummary } from "@/heroes/hooks/useHeroesSummary"
import { usePaginatedHeroes } from "@/heroes/hooks/usePaginatedHeroes"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"

const validTabs = ['all','favorites','heroes','villains']

export const HomePage= () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const {favoriteCount, favorites} = useContext(FavoriteHeroContext)

  const activeTab = (searchParams.get('tab') ? searchParams.get('tab') : 'all') as string
  const page = (searchParams.get('page') ? searchParams.get('page') : '1') as string
  const limit = (searchParams.get('limit') ? searchParams.get('limit') : '6') as string
  const category = (searchParams.get('category') ? searchParams.get('category') : 'all') as string

  const selectedTab = useMemo(() => {
    return validTabs.includes(activeTab) ? activeTab : 'all'
  }, [activeTab])

  const { data:heroesResponse } = usePaginatedHeroes(page, limit, category)

  const { data:summary } = useHeroesSummary()

  return (
      <>
        <Jumbotron title="Universo de superheroes" description="Descubre, explora y administra Superheroes y villanos"></Jumbotron>

        <MainBreadCrumb currentPage="Super Heroes"></MainBreadCrumb>

        {/* Stats Dashboard */}
        <HeroStats></HeroStats>

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger onClick={()=> setSearchParams({ tab: 'all', category:'all' })} value="all">All Characters ({summary?.totalHeroes})</TabsTrigger>
            <TabsTrigger onClick={()=> setSearchParams({ tab: 'favorites', category:'favorites' })} value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={()=> setSearchParams({ tab: 'heroes',category:'hero' })}>Heroes ({summary?.heroCount})</TabsTrigger>
            <TabsTrigger value="villains" onClick={()=> setSearchParams({ tab: 'villains', category:'villain' })}>Villains ({summary?.villainCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <HeroGrid heroList={heroesResponse?.heroes?? []}  ></HeroGrid>
          </TabsContent>
          <TabsContent value="favorites">
            <h1>Favoritos</h1>
            <HeroGrid heroList={favorites}></HeroGrid>
          </TabsContent>
          <TabsContent value="heroes">
            <h1>Heroes</h1>
            <HeroGrid heroList={heroesResponse?.heroes?? []}  ></HeroGrid>
          </TabsContent>
          <TabsContent value="villains">
            <h1>Villains</h1>
            <HeroGrid heroList={heroesResponse?.heroes?? []}  ></HeroGrid>
          </TabsContent>
        </Tabs>

        {selectedTab !== 'favorites' && <Pagination totalPages={heroesResponse?.pages ?? 1} ></Pagination>}
        
      </>
  )
}
