import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heart, Eye, Zap, Brain, Gauge, Shield } from "lucide-react"
import type { Hero } from "../types/hero.interface"
import { cn } from '@/lib/utils'
import { useNavigate } from "react-router"
import { useContext } from "react"
import { FavoriteHeroContext } from "../context/FavoriteHeroContext"

interface Props {
  hero:Hero
}

const calculateHability = (value:number)=> value*100/10

export const HeroGridCard = ({hero}:Props) => {

  const {slug, status,image,universe,alias,name,team,description,strength,intelligence,speed,durability, powers,firstAppearance,category} = hero

  const navigate = useNavigate()

  const { isFavorite, toggleFavorite  } = useContext(FavoriteHeroContext)

  const handleClick = ()=> {
    navigate(`/heroes/${slug}`)
  }

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 py-0" >
      <div className="relative h-64">
        <img
        onClick={handleClick}
          src={image}
          alt={name}
          className="object-cover transition-all duration-500 group-hover:scale-110 absolute w-full top-[-30px] h-[410px]"
        />

        {/* Status indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
        {/* " bg-green-500" */}
          <div className={cn({"bg-green-500":status==='Active',"bg-red-500":status!=='Active'},"w-3 h-3 rounded-full")} />
          <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
            {status}
          </Badge>
        </div>

        {/* Universe badge */}
        <Badge className={cn({'bg-blue-600':universe === 'DC','bg-red-600':universe === 'Marvel'},'absolute top-3 right-3 text-xs text-white')}>{universe}</Badge>

        {/* Favorite button */}
        <Button size="sm" variant="ghost" className="absolute bottom-3 right-3 bg-white/90 hover:bg-white" onClick={()=> toggleFavorite(hero)}>
          <Heart className={`h-4 w-4  ${isFavorite(hero)? 'fill-red-500 text-red-500':'text-grey-500'}`} />
        </Button>

        {/* View details button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute bottom-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye className="h-4 w-4 text-gray-600" />
        </Button>
      </div>

      <CardHeader className="py-3 z-10 bg-gray-100/50 backdrop-blur-sm relative top-1 group-hover:top-[-10px] transition-all duration-300">

        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-bold text-lg leading-tight">{alias}</h3>
            <p className="text-sm text-gray-600">{name}</p>
          </div>
          <Badge className="text-xs bg-green-100 text-green-800 border-green-200">{category}</Badge>
        </div>
        <Badge variant="outline" className="w-fit text-xs">
          {team}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">
          {description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-orange-500" />
              <span className="text-xs font-medium">Strength</span>
            </div>
            <Progress value={calculateHability(strength)} className="h-2" activeColor="bg-orange-500" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Brain className="h-3 w-3 text-blue-500" />
              <span className="text-xs font-medium">Intelligence</span>
            </div>
            <Progress value={calculateHability(intelligence)} className="h-2" activeColor="bg-blue-500" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Gauge className="h-3 w-3 text-green-500" />
              <span className="text-xs font-medium">Speed</span>
            </div>
            <Progress value={calculateHability(speed)} className="h-2" activeColor="bg-green-500" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-purple-500" />
              <span className="text-xs font-medium">Durability</span>
            </div>
            <Progress value={calculateHability(durability)} className="h-2" activeColor="bg-purple-500" />
          </div>
        </div>

        {/* Powers */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Powers:</h4>
          <div className="flex flex-wrap gap-1">

            {
              powers.slice(0,3).map(power=>(<Badge key={power} variant="outline" className="text-xs">
              {power}
            </Badge>))
            }

            {
            powers.length > 3 &&
            <Badge variant="outline" className="text-xs bg-gray-100">
              +{powers.length - 3} more
            </Badge>
            }
            
          </div>
        </div>

        <div className="text-xs text-gray-500 pt-2 border-t">First appeared: {firstAppearance}</div>
      </CardContent>
    </Card>
  )
}
