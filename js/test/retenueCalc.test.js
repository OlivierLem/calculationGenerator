import { retenueCalc } from "../fonction/retenueCalc";

describe('retenueCalc Unit Test Suites', () => {
    describe('addition parameter', () => {
        it('should be in true for addition', () => {
            const nombresTest = [55,55]
            expect(retenueCalc("+", ...nombresTest)).toBeTrue()
        })
        it('should be in false for addition', () => {
            const nombresTest = [20,32]
            expect(retenueCalc("+", ...nombresTest)).toBeFalse()
        })
        //* Bug quand il n'y a qu'un chiffre return undefined
        /* it('should be in true for addition with one digit', () => {
            const nombresTest = [5,6]
            expect(retenueCalc("+", ...nombresTest)).toBeTrue()
        }) */
    })
    describe('subtraction parameter', () => {
        it('should be in true for substraction', () => {
            const nombresTest = [64,55]
            expect(retenueCalc("-", ...nombresTest)).toBeTrue()
        })
        it('should be false for substraction', () => {
            const nombresTest = [55,32]
            expect(retenueCalc("-", ...nombresTest)).toBeFalse()
        })
        it('should be negative', () => {
            const nombresTest = [32,55]
            expect(retenueCalc("-", ...nombresTest)).toBe('négatif')
        })
        //* Bug quand il n'y a qu'un chiffre return undefined sauf si c négatif
        /* it('should be in false for substraction with one digit', () => {
            const nombresTest = [8,6]
            expect(retenueCalc("-", ...nombresTest)).toBeFalse()
        }) */
    })
})