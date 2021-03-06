/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { should } from 'chai';
import { tokenize, Token } from './utils/tokenize';

describe("Grammar", () => {
    before(() => { should(); });

    describe("Structs", () => {
        it("simple struct", () => {

            const input = `struct S { }`;
            const tokens = tokenize(input);

            tokens.should.deep.equal([
                Token.Keywords.Struct,
                Token.Identifiers.StructName("S"),
                Token.Punctuation.OpenBrace,
                Token.Punctuation.CloseBrace]);
        });

        it("struct interface implementation", () => {

            const input = `
interface IFoo { }
struct S : IFoo { }
`;
            const tokens = tokenize(input);

            tokens.should.deep.equal([
                Token.Keywords.Interface,
                Token.Identifiers.InterfaceName("IFoo"),
                Token.Punctuation.OpenBrace,
                Token.Punctuation.CloseBrace,
                Token.Keywords.Struct,
                Token.Identifiers.StructName("S"),
                Token.Punctuation.Colon,
                Token.Type("IFoo"),
                Token.Punctuation.OpenBrace,
                Token.Punctuation.CloseBrace]);
        });

        it("nested struct", () => {

            const input = `
class Klass
{
    struct Nested
    {

    }
}`;
            const tokens = tokenize(input);

            tokens.should.deep.equal([
                Token.Keywords.Class,
                Token.Identifiers.ClassName("Klass"),
                Token.Punctuation.OpenBrace,

                Token.Keywords.Struct,
                Token.Identifiers.StructName("Nested"),
                Token.Punctuation.OpenBrace,
                Token.Punctuation.CloseBrace,

                Token.Punctuation.CloseBrace]);
        });

        it("nested struct with modifier", () => {

            const input = `
class Klass
{
    public struct Nested
    {

    }
}`;
            const tokens = tokenize(input);

            tokens.should.deep.equal([
                Token.Keywords.Class,
                Token.Identifiers.ClassName("Klass"),
                Token.Punctuation.OpenBrace,

                Token.Keywords.Modifiers.Public,
                Token.Keywords.Struct,
                Token.Identifiers.StructName("Nested"),
                Token.Punctuation.OpenBrace,
                Token.Punctuation.CloseBrace,

                Token.Punctuation.CloseBrace]);
        });

        it("generic struct", () => {

            const input = `
struct S<T1, T2> { }
`;
            const tokens = tokenize(input);

            tokens.should.deep.equal([
                Token.Keywords.Struct,
                Token.Identifiers.StructName("S"),
                Token.Punctuation.TypeParameters.Begin,
                Token.Identifiers.TypeParameterName("T1"),
                Token.Punctuation.Comma,
                Token.Identifiers.TypeParameterName("T2"),
                Token.Punctuation.TypeParameters.End,
                Token.Punctuation.OpenBrace,
                Token.Punctuation.CloseBrace]);
        });

        it("generic struct with constraints", () => {

            const input = `
struct S<T1, T2> where T1 : T2 { }
`;
            const tokens = tokenize(input);

            tokens.should.deep.equal([
                Token.Keywords.Struct,
                Token.Identifiers.StructName("S"),
                Token.Punctuation.TypeParameters.Begin,
                Token.Identifiers.TypeParameterName("T1"),
                Token.Punctuation.Comma,
                Token.Identifiers.TypeParameterName("T2"),
                Token.Punctuation.TypeParameters.End,
                Token.Keywords.Where,
                Token.Type("T1"),
                Token.Punctuation.Colon,
                Token.Type("T2"),
                Token.Punctuation.OpenBrace,
                Token.Punctuation.CloseBrace]);
        });

        it("ref struct", () => {
            const input = `ref struct S { }`;
            const tokens = tokenize(input);

            tokens.should.deep.equal([
                Token.Keywords.Modifiers.Ref,
                Token.Keywords.Struct,
                Token.Identifiers.StructName("S"),
                Token.Punctuation.OpenBrace,
                Token.Punctuation.CloseBrace]);
        });

        it("readonly ref struct", () => {
            const input = `readonly ref struct S { }`;
            const tokens = tokenize(input);

            tokens.should.deep.equal([
                Token.Keywords.Modifiers.ReadOnly,
                Token.Keywords.Modifiers.Ref,
                Token.Keywords.Struct,
                Token.Identifiers.StructName("S"),
                Token.Punctuation.OpenBrace,
                Token.Punctuation.CloseBrace]);
        });
    });
});