
import { DataSource } from 'typeorm';
import { BreedEntity, Species } from '../wiki/breed.entity';

export const seedWiki = async (dataSource: DataSource) => {
    const breedRepo = dataSource.getRepository(BreedEntity);

    // Check if data exists
    const count = await breedRepo.count();
    if (count > 0) {
        console.log('Wiki data already seeded.');
        return;
    }

    const breeds = [
        {
            name: 'Golden Retriever',
            species: Species.DOG,
            description: 'Friendly, intelligent, and devoted. Golden Retrievers are popular family pets known for their gentle nature and shiny golden coats.',
            example_image_url: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=600&auto=format&fit=crop',
            characteristics: {
                temperament: ['Friendly', 'Intelligent', 'Devoted'],
                size: 'Large',
                exercise_needs: 'High'
            }
        },
        {
            name: 'Labrador Retriever',
            species: Species.DOG,
            description: 'The Labrador Retriever is an outgoing, even-tempered breed. They are friendly with people and other animals.',
            example_image_url: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?q=80&w=600&auto=format&fit=crop',
            characteristics: {
                temperament: ['Outgoing', 'Even-tempered', 'Gentle'],
                size: 'Large',
                exercise_needs: 'High'
            }
        },
        {
            name: 'French Bulldog',
            species: Species.DOG,
            description: 'Adaptable, playful, and smart. The Frenchie is a small breed of domestic dog.',
            example_image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop',
            characteristics: {
                temperament: ['Playful', 'Smart', 'Adaptable'],
                size: 'Small',
                exercise_needs: 'Moderate'
            }
        },
        {
            name: 'British Shorthair',
            species: Species.CAT,
            description: 'The British Shorthair is a dignified, intelligent, and affectionate companion. Known for their chubby cheeks and dense coat.',
            example_image_url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=600&auto=format&fit=crop',
            characteristics: {
                temperament: ['Calm', 'Affectionate', 'Dignified'],
                coat: 'Dense, plush',
                size: 'Medium-Large'
            }
        },
        {
            name: 'Ragdoll',
            species: Species.CAT,
            description: 'Ragdolls are large, gentle cats with striking blue eyes and a semi-longhair coat. They are known for their docile and placid temperament.',
            example_image_url: 'https://images.unsplash.com/photo-1627221239928-867375db6a13?q=80&w=600&auto=format&fit=crop',
            characteristics: {
                temperament: ['Docile', 'Placid', 'Affectionate'],
                coat: 'Semi-longhair',
                size: 'Large'
            }
        },
        {
            name: 'Siamese',
            species: Species.CAT,
            description: 'Siamese cats are social, intelligent, and vocal. They are known for their striking point coloration and blue almond-shaped eyes.',
            example_image_url: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=600&auto=format&fit=crop',
            characteristics: {
                temperament: ['Social', 'Intelligent', 'Vocal'],
                coat: 'Short',
                size: 'Medium'
            }
        }
    ];

    for (const breedData of breeds) {
        const breed = breedRepo.create(breedData);
        await breedRepo.save(breed);
    }
    console.log(`Seeded ${breeds.length} breeds.`);
};
