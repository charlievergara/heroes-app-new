import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SearchControls } from "./SearchControls";
import { MemoryRouter } from "react-router";

if(typeof window.ResizeObserver === 'undefined'){
    class ResizeObserver {

        observe(){}

        unobserve(){}

        disconnect(){}
    }

    window.ResizeObserver = ResizeObserver
}


const renderComponent = (initialEntries:string[] = ['/search'])=>{
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <SearchControls></SearchControls>
        </MemoryRouter>
    )
}

describe('SearchControls', () => { 

    test('should render Search Controls with default values', () => { 
        const {container} = renderComponent()

        expect(container).toMatchSnapshot()
     })

     test('should set input value when search param name is set', () => { 
        renderComponent(['/?search=superman'])

        const input = screen.getByTestId('searchInput')

        expect(input.getAttribute('value')).toBe('superman')
      })
     
      test('should change params when input is changed and enter is pressed', () => { 
        renderComponent(['/?search=superman'])

        const input = screen.getByTestId('searchInput')

        expect(input.getAttribute('value')).toBe('superman')

        fireEvent.change(input, {target:{value:'batman'}})
        fireEvent.keyDown(input, {key:'Enter'})

        expect(input.getAttribute('value')).toBe('batman')

        
    })
    
    test('should change param strengh when Slider changed', () => { 
        renderComponent(['/?search=batman&toggle-filters=advanceFilters'])
        
        const slider = screen.getByRole('slider')
        
        expect(slider.getAttribute('aria-valuenow')).toBe('0')

        fireEvent.keyDown(slider,{key:'ArrowRight'})
        expect(slider.getAttribute('aria-valuenow')).toBe('1')

      })
    test('should accordion to be open when toggle-filters is set', () => { 
        renderComponent(['/?search=batman&toggle-filters=advanceFilters'])
        
        const accordion = screen.getByTestId('accordion')

        const accordionItem = accordion.querySelector('div')

        expect(accordionItem?.getAttribute('data-state')).toBe('open')
        screen.debug(accordion)
      })
    
      test('should accordion to be closed when no toggle-filters is present', () => { 
        renderComponent(['/?search=batman'])
        
        const accordion = screen.getByTestId('accordion')

        const accordionItem = accordion.querySelector('div')

        expect(accordionItem?.getAttribute('data-state')).toBe('closed')
      })
    
 })