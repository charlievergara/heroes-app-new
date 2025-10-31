import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.router";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider, useParams } from "react-router";


vi.mock('@/heroes/pages/home/HomePage', ()=>({
    HomePage:()=><div data-testid="home-page">
        
    </div>
}))

vi.mock('@/heroes/pages/hero/HeroPage', ()=>({
    HeroPage:()=>{
        const {slug =''} = useParams()
        return (
            <div data-testid="hero-page"> Hero page - {slug}</div>
        )
    }
}))

vi.mock('@/heroes/pages/search/SearchPage', ()=>({
    default:()=><div data-testid="search-page"></div>
}))

vi.mock('@/heroes/layouts/HeroesLayout', ()=>({
    HeroesLayout:()=><div data-testid="heroes-layout"><Outlet></Outlet></div>
}))



describe('AppRouter', ()=>{

    test('should be configured as expected', ()=>{
        expect(appRouter.routes).toMatchSnapshot()
    })

    test('should render HomePage at root patch', () => { 

        const router = createMemoryRouter(appRouter.routes,{
            initialEntries:['/']
        })

        render(<RouterProvider router={router}></RouterProvider>)

        expect(screen.getByTestId('home-page')).toBeDefined()
     })
    test('should render HeroPage at /heroes/:slug path', () => { 

        const router = createMemoryRouter(appRouter.routes,{
            initialEntries:['/heroes/superman']
        })

        render(<RouterProvider router={router}></RouterProvider>)
        expect(screen.getByTestId('hero-page').innerHTML).toContain('superman')
     })

    


     test('should render search page at /search', async() => { 
        const router = createMemoryRouter(appRouter.routes,{
            initialEntries:['/search']
        })

        render(<RouterProvider router={router}></RouterProvider>)

        const searchPage = await screen.findByTestId('search-page')

        expect(searchPage).toBeDefined()
      })
     
      test('should redirect from unknown routes', () => { 
        const router = createMemoryRouter(appRouter.routes,{
            initialEntries:['/unknown']
        })

        render(<RouterProvider router={router}></RouterProvider>)

        expect(screen.getByTestId('home-page')).toBeDefined()

        // const searchPage = await screen.findByTestId('search-page')

        // expect(searchPage).toBeDefined()
      })
})