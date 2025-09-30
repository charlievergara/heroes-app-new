import { describe, expect, test } from "vitest";
import { getHeroBySlug } from "./get-hero-by-slug.action";
import axios from "axios";


describe('Get Hero By Slug', () => { 
    test('should fetch hero data and return complete img URL', async() => {  
        const result = await getHeroBySlug('clark-kent')

        expect(result.image).toContain('http')

        expect(result).toStrictEqual({
            id: '1',
            name: 'Clark Kent',
            slug: 'clark-kent',
            alias: 'Superman',
            powers: [
              'Súper fuerza',
              'Vuelo',
              'Visión de calor',
              'Visión de rayos X',
              'Invulnerabilidad',
              'Súper velocidad'
            ],
            description: 'El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.',
            strength: 10,
            intelligence: 8,
            speed: 9,
            durability: 10,
            team: 'Liga de la Justicia',
            image: 'http://localhost:3001/images/1.jpeg',
            firstAppearance: '1938',
            status: 'Active',
            category: 'Hero',
            universe: 'DC'
          })
    })

    test('should throw an error if hero not found', async() => { 

        try {
            await getHeroBySlug('clark-kent2')
        } catch (error) {
            if(axios.isAxiosError(error)){
                expect(error.status).toBe(404)
            }
        }

     })
 })