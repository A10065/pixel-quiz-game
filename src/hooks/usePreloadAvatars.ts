import { useEffect } from 'react';

/**
 * Preload 100 Pixel Art Seeds
 * 透過 Image 對象背景載入，加速遊戲進行中的渲染
 */

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

export const usePreloadAvatars = () => {
    useEffect(() => {
        SEEDS.forEach(seed => {
            const img = new Image();
            img.src = `https://api.dicebear.com/8.x/pixel-art/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
        });
    }, []);
};
