
import { DataSource } from 'typeorm';
import { BreedEntity, Species } from '../wiki/breed.entity';

export const seedWiki = async (dataSource: DataSource) => {
    const breedRepo = dataSource.getRepository(BreedEntity);

    // Check if data exists
    const count = await breedRepo.count();
    if (count > 0) {
        console.log('Wiki data already seeded. Skipping.');
        // Optional: clear table if you want to force re-seed, but for now we skip
        // await breedRepo.clear(); 
        return;
    }

    const breeds = [
        {
            name: '金毛寻回犬 (Golden Retriever)',
            species: Species.DOG,
            description: '金毛寻回犬以其友善、聪慧和忠诚而闻名。它们是极受欢迎的家庭伴侣犬，拥有金色的被毛和温柔的性格。',
            example_image_url: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=600&auto=format&fit=crop',
            characteristics: {
                temperament: ['友善', '聪明', '忠诚'],
                size: '大型',
                exercise_needs: '高'
            }
        },
        {
            name: '拉布拉多 (Labrador Retriever)',
            species: Species.DOG,
            description: '拉布拉多性格开朗、温和，对人和其他动物都非常友善。它们聪明易训，常被用作导盲犬或搜救犬。',
            example_image_url: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?q=80&w=600&auto=format&fit=crop',
            characteristics: {
                temperament: ['开朗', '温和', '友善'],
                size: '大型',
                exercise_needs: '高'
            }
        },
        {
            name: '法国斗牛犬 (French Bulldog)',
            species: Species.DOG,
            description: '法斗适应力强，活泼聪明。它们体型小巧，不需要太大的运动量，非常适合城市公寓饲养。',
            example_image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop',
            characteristics: {
                temperament: ['活泼', '聪明', '适应力强'],
                size: '小型',
                exercise_needs: '中等'
            }
        },
        {
            name: '英国短毛猫 (British Shorthair)',
            species: Species.CAT,
            description: '英短以其圆润的身材、密实的被毛和可爱的“包子脸”著称。它们性格沉稳、友善，是理想的家庭伴侣。',
            example_image_url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=600&auto=format&fit=crop',
            characteristics: {
                temperament: ['沉稳', '友善', '独立'],
                coat: '短毛，密实',
                size: '中大型'
            }
        },
        {
            name: '布偶猫 (Ragdoll)',
            species: Species.CAT,
            description: '布偶猫体型较大，性格极其温柔，像布偶一样任人抱起。它们拥有蓝色的眼睛和丝滑的长毛。',
            example_image_url: 'https://images.unsplash.com/photo-1627221239928-867375db6a13?q=80&w=600&auto=format&fit=crop',
            characteristics: {
                temperament: ['温柔', '粘人', '安静'],
                coat: '半长毛',
                size: '大型'
            }
        },
        {
            name: '暹罗猫 (Siamese)',
            species: Species.CAT,
            description: '暹罗猫聪明、活泼、爱叫，被称为“像狗一样的猫”。它们拥有独特的重点色和蓝宝石般的眼睛。',
            example_image_url: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=600&auto=format&fit=crop',
            characteristics: {
                temperament: ['聪明', '活泼', '话痨'],
                coat: '短毛',
                size: '中型'
            }
        },
        {
            name: '柴犬 (Shiba Inu)',
            species: Species.DOG,
            description: '柴犬是日本最古老的犬种之一，性格独立、忠诚，有时有点固执。它们拥有治愈的笑容和螺旋状的尾巴。',
            example_image_url: 'https://images.unsplash.com/photo-1563640245224-e578c7885b24?q=80&w=600&auto=format&fit=crop',
            characteristics: {
                temperament: ['独立', '忠诚', '固执'],
                size: '中型',
                exercise_needs: '中高'
            }
        },
        {
            name: '柯基 (Corgi)',
            species: Species.DOG,
            description: '柯基以其短腿和圆润的臀部闻名。它们精力充沛，性格开朗，曾经是英国女王的爱宠。',
            example_image_url: 'https://images.unsplash.com/photo-1612536053381-696179b53600?q=80&w=600&auto=format&fit=crop',
            characteristics: {
                temperament: ['精力充沛', '开朗', '聪明'],
                size: '中小型',
                exercise_needs: '高'
            }
        }
    ];

    for (const breedData of breeds) {
        const breed = breedRepo.create(breedData);
        await breedRepo.save(breed);
    }
    console.log(`Seeded ${breeds.length} breeds.`);
};
