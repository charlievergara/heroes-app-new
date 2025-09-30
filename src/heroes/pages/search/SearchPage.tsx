import { Jumbotron } from "@/components/custom/Jumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControls } from "./ui/SearchControls"
import { MainBreadCrumb } from "@/components/custom/MainBreadCrumb"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useSearchParams } from "react-router"
import { useSearchResuls } from "@/heroes/hooks/useSearchResuls"

export const SearchPage = () => {

  const breadcrumbs = [
    {label:'Home', to:'/'},
    {label:'Search Heroes', to:'/search'},
  ]

  const [searchParams, _] = useSearchParams()

  const search = searchParams.get('search') || ''
  const strength = searchParams.get('strength') ?? undefined

  const { data:heroesList } = useSearchResuls( {name:search, strength} );

  return (
    <>
    <Jumbotron title="Buscar superheroes" description="Descubre, explora y administra Superheroes y villanos"></Jumbotron>

    <MainBreadCrumb currentPage="Search heores" breadcrumbs={breadcrumbs}></MainBreadCrumb>

    {/* Stats Dashboard */}
    <HeroStats></HeroStats>

    {/* Filter and search controls */}
    <SearchControls></SearchControls>

    <HeroGrid heroList={heroesList?.heroes ?? []} ></HeroGrid>
    </>

  )
}

export default SearchPage