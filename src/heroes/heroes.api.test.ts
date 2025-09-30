import { describe, expect, test } from "vitest";
import { heroAPI } from "./heroes.api";

describe('HeroApi', () => { 

    const BASE_URL = import.meta.env.VITE_API_URL

    test('should be configure pointing to testing server', ()=>{

        expect(heroAPI).toBeDefined()
        expect(heroAPI.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`)
        expect(BASE_URL).toContain('3001')
    })
})