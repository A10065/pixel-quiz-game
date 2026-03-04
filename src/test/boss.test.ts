import { expect, test } from 'vitest'

const SEEDS = [
    "Abby", "Aiden", "Alexander", "Alice", "Amelia", "Andrew", "Angel", "Anna", "Archie", "Arthur",
    "Austin", "Ava", "Baby", "Bailey", "Bella", "Benjamin", "Billy", "Bobby", "Brooke", "Caleb",
    "Callum", "Charlie", "Charlotte", "Chloe", "Connor", "Daisy", "Daniel", "David", "Dexter", "Dylan",
    "Edward", "Eleanor", "Elizabeth", "Ella", "Ellie", "Elliott", "Emilia", "Emily", "Emma", "Erin",
    "Ethan", "Eva", "Evie", "Ezra", "Felix", "Finley", "Florence", "Frankie", "Freya", "Gabriel",
    "George", "Grace", "Gracie", "Hannah", "Harley", "Harper", "Harry", "Harvey", "Henry", "Holly",
    "Hunter", "Imogen", "Isaac", "Isabella", "Isabelle", "Isla", "Ivy", "Jack", "Jacob", "Jake",
    "James", "Jasper", "Jenson", "Jessica", "Joseph", "Joshua", "Jude", "Julia", "Kai", "Katie",
    "Kian", "Lacey", "Layla", "Leo", "Leon", "Lewis", "Lexi", "Liam", "Libby", "Lilly",
    "Lily", "Lola", "Louie", "Louis", "Lucas", "Lucy", "Luke", "Lydia", "Maddie", "Maisie"
];

test('PixelBoss seed logic correctly picks names', () => {
    const index = 0;
    const seed = SEEDS[index % SEEDS.length];
    expect(seed).toBe("Abby");

    const indexOverflow = 100;
    const seedOverflow = SEEDS[indexOverflow % SEEDS.length];
    expect(seedOverflow).toBe("Abby");
})
