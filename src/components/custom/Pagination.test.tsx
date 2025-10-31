import { describe, expect, test, vi } from "vitest"
import { Pagination } from "./Pagination"
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import type { PropsWithChildren } from "react"


vi.mock('../ui/button', ()=>({
    Button: ({children, ...props}:PropsWithChildren)=>(<button {...props}>{children}</button>)
}))

const renderWithRouter =(children:React.ReactElement, initialEntries?:string[])=>{
    return render(
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    )
}

describe('Pagination', () => { 
    
    test('should render component with default values', async () => { 
        renderWithRouter(<Pagination totalPages={5}></Pagination>)

        expect(screen.getByText('Previous')).toBeDefined()
        expect(screen.getByText('Next')).toBeDefined()
     })

     test('should disabled previous button when page is 1', () => { 
        renderWithRouter(<Pagination totalPages={5}></Pagination>)

        const previousButton = screen.getByTestId('previous-button');

        expect(previousButton.getAttributeNames()).toContain('disabled')

      })
     test('should disabled next button when page is tha last one', () => { 
        renderWithRouter(<Pagination totalPages={5}></Pagination>, ['/?page=5'])

        const button = screen.getByTestId('next-button');

        expect(button.getAttributeNames()).toContain('disabled')

      })
     
      test('should disabled page button 3 when page is 3', () => { 
        renderWithRouter(<Pagination totalPages={5}></Pagination>, ['/?page=3'])

        const button3 = screen.getByText('3');

        // screen.debug(button);

        expect(button3.getAttribute('variant')).toContain('default')

      })

      test('should change page when click on number button', () => { 
        renderWithRouter(<Pagination totalPages={5}></Pagination>, ['/?page=3'])

        const button3 = screen.getByText('3');
        expect(button3.getAttribute('variant')).toContain('default')

        const button2 = screen.getByText('2');

        fireEvent.click(button2)

        expect(button3.getAttribute('variant')).toContain('outline')
        expect(button2.getAttribute('variant')).toContain('default')


       })
 })