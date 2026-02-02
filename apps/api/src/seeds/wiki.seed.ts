
import { DataSource } from 'typeorm';
import { BreedEntity, Species } from '../wiki/breed.entity';

export const seedWiki = async (dataSource: DataSource) => {
    const breedRepo = dataSource.getRepository(BreedEntity);

    // Check if data exists
    const count = await breedRepo.count();
    if (count > 0) {
        console.log('Clearing existing Wiki data to apply new seed...');
        await breedRepo.clear();
    }

    const breeds = [
        // --- DOGS ---
        {
            name: '金毛寻回犬 (Golden Retriever)',
            species: Species.DOG,
            description: '金毛寻回犬是一种聪明、友善且忠诚的犬种。它们拥有金色的防水被毛，最初是为了找回猎物而培育的。如今，它们是极受欢迎的家庭伴侣犬，也常作为导盲犬和搜救犬。',
            example_image_url: 'https://cdn2.thedogapi.com/images/Hk14ziqE7.jpg', // Stock image if API fails, but we try to use a good one
            characteristics: {
                temperament: ['友善', '聪明', '忠诚', '自信'],
                size: '大型',
                exercise_needs: '高'
            }
        },
        {
            name: '拉布拉多寻回犬 (Labrador Retriever)',
            species: Species.DOG,
            description: '拉布拉多以由温和、聪明和极好的适应能力而闻名。它们是美国最受欢迎的犬种之一，性格开朗，对人友善，非常适合有孩子的家庭。',
            example_image_url: 'https://cdn2.thedogapi.com/images/B1uW7l5Vx.jpg',
            characteristics: {
                temperament: ['开朗', '温和', '聪明', '敏捷'],
                size: '大型',
                exercise_needs: '高'
            }
        },
        {
            name: '法国斗牛犬 (French Bulldog)',
            species: Species.DOG,
            description: '法斗是一种适应力极强的小型犬，拥有标志性的蝙蝠耳和紧凑的身材。它们性格活泼、聪明，虽然不需要大量运动，但喜欢与人互动，是理想的城市伴侣犬。',
            example_image_url: 'https://cdn2.thedogapi.com/images/HyWNfxc47.jpg',
            characteristics: {
                temperament: ['活泼', '聪明', '适应力强', '粘人'],
                size: '小型',
                exercise_needs: '低'
            }
        },
        {
            name: '德国牧羊犬 (German Shepherd)',
            species: Species.DOG,
            description: '德国牧羊犬以其聪明、忠诚和多才多艺著称。它们是优秀的工作犬，常用于警察和军队。作为家庭宠物，它们忠诚可靠，但需要适当的训练和运动。',
            example_image_url: 'https://cdn2.thedogapi.com/images/S1FflF1SV.jpg',
            characteristics: {
                temperament: ['自信', '勇敢', '聪明', '忠诚'],
                size: '大型',
                exercise_needs: '非常高'
            }
        },
        {
            name: '柴犬 (Shiba Inu)',
            species: Species.DOG,
            description: '柴犬是日本最古老的犬种之一，性格独立、忠诚，有时略显固执。它们拥有狐狸般的脸庞和卷曲的尾巴，性格机敏，对家人忠诚。',
            example_image_url: 'https://cdn2.thedogapi.com/images/Zn3IjPX3f.jpg',
            characteristics: {
                temperament: ['独立', '忠诚', '机敏', '固执'],
                size: '中型',
                exercise_needs: '中等'
            }
        },
        {
            name: '边境牧羊犬 (Border Collie)',
            species: Species.DOG,
            description: '边境牧羊犬被认为是世界上最聪明的犬种。它们精力极其旺盛，不仅需要大量的身体运动，还需要脑力刺激。是天生的牧羊高手。',
            example_image_url: 'https://cdn2.thedogapi.com/images/sGQvQUzpE.jpg',
            characteristics: {
                temperament: ['极度聪明', '精力旺盛', '专注', '敏锐'],
                size: '中型',
                exercise_needs: '非常高'
            }
        },
        {
            name: '哈士奇 (Siberian Husky)',
            species: Species.DOG,
            description: '西伯利亚雪橇犬（哈士奇）以其惊人的耐力和独特的狼样外观而闻名。它们性格友好、顽皮，有时有点“二”，需要大量的运动和防逃措施。',
            example_image_url: 'https://cdn2.thedogapi.com/images/S17Zly9Em.jpg',
            characteristics: {
                temperament: ['友好', '顽皮', '独立', '精力充沛'],
                size: '中型',
                exercise_needs: '非常高'
            }
        },
        {
            name: '柯基 (Pembroke Welsh Corgi)',
            species: Species.DOG,
            description: '柯基犬虽然腿短，但原本是作为牧牛犬培育的，因此精力充沛且大胆。它们性格开朗、聪明，圆润的屁股深受人们喜爱。',
            example_image_url: 'https://cdn2.thedogapi.com/images/rJ6iQvc4m.jpg',
            characteristics: {
                temperament: ['大胆', '友好', '聪明', '粘人'],
                size: '小型',
                exercise_needs: '中高'
            }
        },
        {
            name: '比格犬 (Beagle)',
            species: Species.DOG,
            description: '比格犬是快乐的小猎犬，拥有极佳的嗅觉。它们性格温和、好奇心强，喜欢探索，但从不具攻击性，是很好的家庭宠物。',
            example_image_url: 'https://cdn2.thedogapi.com/images/S1V3Qeq4X.jpg',
            characteristics: {
                temperament: ['温和', '好奇', '快乐', '友善'],
                size: '小型',
                exercise_needs: '中等'
            }
        },
        {
            name: '杜宾犬 (Doberman Pinscher)',
            species: Species.DOG,
            description: '杜宾犬是强壮、紧凑的工作犬，以其无畏和警惕而闻名。它们是忠诚的家庭守护者，聪明且易于训练。',
            example_image_url: 'https://cdn2.thedogapi.com/images/HyL3bl947.jpg',
            characteristics: {
                temperament: ['无畏', '忠诚', '警惕', '自信'],
                size: '大型',
                exercise_needs: '高'
            }
        },
        {
            name: '大丹犬 (Great Dane)',
            species: Species.DOG,
            description: '大丹犬被称为“犬中阿波罗”，体型巨大但性格温柔。它们虽然外表威严，但实际上非常友善、耐心，被称为“温柔的巨人”。',
            example_image_url: 'https://cdn2.thedogapi.com/images/B1uW7l5Vx.jpg',
            characteristics: {
                temperament: ['温柔', '友善', '自信', '耐心'],
                size: '超大型',
                exercise_needs: '中等'
            }
        },
        {
            name: '罗威纳犬 (Rottweiler)',
            species: Species.DOG,
            description: '罗威纳犬强壮、自信，是天生的护卫犬。它们对家人非常忠诚和富有爱心，但对陌生人可能保持冷漠。需要有经验的主人进行训练。',
            example_image_url: 'https://cdn2.thedogapi.com/images/r1xxEjmqQ.jpg',
            characteristics: {
                temperament: ['忠诚', '自信', '勇敢', '冷静'],
                size: '大型',
                exercise_needs: '高'
            }
        },
        {
            name: '萨摩耶 (Samoyed)',
            species: Species.DOG,
            description: '萨摩耶以其雪白的被毛和标志性的“萨摩耶微笑”而闻名。它们性格极其友好、温和，几乎没有攻击性，原本是极地的雪橇犬。',
            example_image_url: 'https://cdn2.thedogapi.com/images/S1T87l5Vx.jpg', // Placeholder ID style
            characteristics: {
                temperament: ['友好', '温和', '活泼', '警惕'],
                size: '中大型',
                exercise_needs: '高'
            }
        },
        {
            name: '伯恩山犬 (Bernese Mountain Dog)',
            species: Species.DOG,
            description: '伯恩山犬是来自瑞士的大型工作犬，拥有漂亮的三色长毛。它们性格极其温顺、沉稳，对孩子特别有耐心，是完美的家庭犬。',
            example_image_url: 'https://cdn2.thedogapi.com/images/S1fFlx5Vm.jpg',
            characteristics: {
                temperament: ['温顺', '沉稳', '忠诚', '聪明'],
                size: '大型',
                exercise_needs: '中等'
            }
        },
        {
            name: '吉娃娃 (Chihuahua)',
            species: Species.DOG,
            description: '吉娃娃是世界上最小的犬种之一，但它们有着大狗般的个性。它们忠诚、敏捷，喜欢被关注，非常适合公寓生活。',
            example_image_url: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg',
            characteristics: {
                temperament: ['忠诚', '敏捷', '勇敢', '机警'],
                size: '超小型',
                exercise_needs: '低'
            }
        },
        {
            name: '秋田犬 (Akita)',
            species: Species.DOG,
            description: '秋田犬是日本的大型犬种，以“忠犬八公”的故事闻名。它们性格沉稳、威严，对家人极其忠诚，但对其他狗可能具有攻击性。',
            example_image_url: 'https://cdn2.thedogapi.com/images/B12Bnxc47.jpg',
            characteristics: {
                temperament: ['忠诚', '威严', '独立', '勇敢'],
                size: '大型',
                exercise_needs: '中高'
            }
        },
        {
            name: '松狮犬 (Chow Chow)',
            species: Species.DOG,
            description: '松狮犬外表像狮子，舌头是独特的蓝黑色。它们性格独立、冷漠，像猫一样，对陌生人保持警惕，是非常古老的中国犬种。',
            example_image_url: 'https://cdn2.thedogapi.com/images/Ry8Kw5qVQ.jpg',
            characteristics: {
                temperament: ['独立', '冷漠', '忠诚', '安静'],
                size: '中型',
                exercise_needs: '低'
            }
        },
        {
            name: '达尔马提亚犬 (Dalmatian)',
            species: Species.DOG,
            description: '斑点狗（达尔马提亚犬）以其独特的黑白斑点被毛而闻名。它们精力充沛，曾是马车的伴跑犬，需要大量的运动和陪伴。',
            example_image_url: 'https://cdn2.thedogapi.com/images/SkRpsgc4m.jpg',
            characteristics: {
                temperament: ['精力充沛', '聪明', '敏感', '外向'],
                size: '大型',
                exercise_needs: '极高'
            }
        },
        {
            name: '纽芬兰犬 (Newfoundland)',
            species: Species.DOG,
            description: '纽芬兰犬是巨大的水上救援犬，也是性格最温和的犬种之一。它们拥有蹼状脚和防水被毛，对孩子极具耐心，被称为“保姆犬”。',
            example_image_url: 'https://cdn2.thedogapi.com/images/SkM9sec47.jpg',
            characteristics: {
                temperament: ['温和', '耐心', '忠诚', '勇敢'],
                size: '超大型',
                exercise_needs: '中等'
            }
        },

        // --- CATS ---
        {
            name: '美国短毛猫 (American Shorthair)',
            species: Species.CAT,
            description: '美短是强壮、健康的猫种，以其随和的性格和优秀的捕鼠能力著称。它们性格温和，能与孩子和狗和睦相处，是理想的家庭宠物。',
            example_image_url: 'https://cdn2.thecatapi.com/images/JFPROfGtQ.jpg',
            characteristics: {
                temperament: ['随和', '温和', '活跃', '好奇'],
                size: '中大型',
                coat: '短毛'
            }
        },
        {
            name: '英国短毛猫 (British Shorthair)',
            species: Species.CAT,
            description: '英短拥有圆润的身材和厚实的被毛，看起来像泰迪熊。它们性格沉稳、独立，不喜欢被频繁抱起，但喜欢静静地陪伴在主人身边。',
            example_image_url: 'https://cdn2.thecatapi.com/images/s4wQfYoEk.jpg',
            characteristics: {
                temperament: ['沉稳', '独立', '友善', '安静'],
                size: '中大型',
                coat: '短毛'
            }
        },
        {
            name: '布偶猫 (Ragdoll)',
            species: Species.CAT,
            description: '布偶猫因其被抱起时会像布偶一样完全放松而得名。它们体型较大，拥有一双迷人的蓝眼睛，性格极其温柔、粘人。',
            example_image_url: 'https://cdn2.thecatapi.com/images/oGefY4YoG.jpg',
            characteristics: {
                temperament: ['温柔', '粘人', '放松', '友好'],
                size: '大型',
                coat: '半长毛'
            }
        },
        {
            name: '暹罗猫 (Siamese)',
            species: Species.CAT,
            description: '暹罗猫是著名的“话痨”，它们聪明、活泼，喜欢与人交流。它们拥有独特的重点色被毛和深蓝色的眼睛，对主人非常忠诚。',
            example_image_url: 'https://cdn2.thecatapi.com/images/ai6Jps4sx.jpg',
            characteristics: {
                temperament: ['聪明', '活泼', '粘人', '多嘴'],
                size: '中型',
                coat: '短毛'
            }
        },
        {
            name: '缅因猫 (Maine Coon)',
            species: Species.CAT,
            description: '缅因猫是世界上最大的家养猫种之一，被称为“温柔的巨人”。它们拥有厚实的防水被毛及的大尾巴，性格像狗一样随和、友好。',
            example_image_url: 'https://cdn2.thecatapi.com/images/OOD3VXAQn.jpg',
            characteristics: {
                temperament: ['温和', '友好', '聪明', '体型巨大'],
                size: '超大型',
                coat: '长毛'
            }
        },
        {
            name: '波斯猫 (Persian)',
            species: Species.CAT,
            description: '波斯猫以其长而华丽的被毛和甜美的扁平脸庞著称。它们是猫中的贵族，性格安静、懒散，喜欢在室内过着养尊处优的生活。',
            example_image_url: 'https://cdn2.thecatapi.com/images/-Zfz5z2jK.jpg',
            characteristics: {
                temperament: ['安静', '温和', '懒散', '高贵'],
                size: '中型',
                coat: '长毛'
            }
        },
        {
            name: '孟加拉豹猫 (Bengal)',
            species: Species.CAT,
            description: '孟加拉猫拥有野生豹猫的血统，被毛具有独特的豹纹。它们精力极度充沛，喜欢攀爬、玩水，需要大量的活动空间。',
            example_image_url: 'https://cdn2.thecatapi.com/images/O3btzLlsO.jpg',
            characteristics: {
                temperament: ['精力充沛', '野性', '聪明', '好奇'],
                size: '中大型',
                coat: '短毛'
            }
        },
        {
            name: '斯芬克斯猫 (Sphynx)',
            species: Species.CAT,
            description: '斯芬克斯猫是著名的无毛猫（虽然有些微细绒毛）。它们摸起来像温暖的水蜜桃，性格极其粘人、活泼，为了取暖会一直像“狗皮膏药”一样贴着主人。',
            example_image_url: 'https://cdn2.thecatapi.com/images/BDb8ZXb1v.jpg',
            characteristics: {
                temperament: ['粘人', '活泼', '聪明', '无毛'],
                size: '中型',
                coat: '无毛'
            }
        },
        {
            name: '苏格兰折耳猫 (Scottish Fold)',
            species: Species.CAT,
            description: '苏格兰折耳猫因其向前折叠的耳朵而拥有独特的猫头鹰般的外观。它们性格甜美、安静，喜欢用像人一样的“大叔坐姿”坐着。注意：折耳基因可能伴随软骨骨骼遗传病。',
            example_image_url: 'https://cdn2.thecatapi.com/images/o9t0LDcsa.jpg',
            characteristics: {
                temperament: ['甜美', '安静', '友善', '适应力强'],
                size: '中型',
                coat: '短毛'
            }
        },
        {
            name: '俄罗斯蓝猫 (Russian Blue)',
            species: Species.CAT,
            description: '俄罗斯蓝猫拥有蓝灰色的短毛和迷人的绿色眼睛。它们性格羞涩、文静，对陌生人即使保持距离，但对主人非常深情。',
            example_image_url: 'https://cdn2.thecatapi.com/images/Rhj-JsTLP.jpg',
            characteristics: {
                temperament: ['文静', '羞涩', '聪明', '温和'],
                size: '中型',
                coat: '短毛'
            }
        },
        {
            name: '阿比西尼亚猫 (Abyssinian)',
            species: Species.CAT,
            description: '阿比西尼亚猫是最古老的猫种之一，外表像小美洲狮。它们极其活跃、好奇，一刻也坐不住，喜欢攀爬到高处俯瞰领地。',
            example_image_url: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg',
            characteristics: {
                temperament: ['活跃', '好奇', '独立', '聪明'],
                size: '中型',
                coat: '短毛'
            }
        },
        {
            name: '挪威森林猫 (Norwegian Forest Cat)',
            species: Species.CAT,
            description: '挪威森林猫是北欧神话中的猫，拥有厚实的双层被毛适应寒冷。它们体型大，善于攀爬，性格稳重而友好。',
            example_image_url: 'https://cdn2.thecatapi.com/images/06dgGmEOV.jpg',
            characteristics: {
                temperament: ['稳重', '独立', '友好', '善于攀爬'],
                size: '大型',
                coat: '长毛'
            }
        },
        {
            name: '异国短毛猫 (Exotic Shorthair)',
            species: Species.CAT,
            description: '异国短毛猫就是短毛版的波斯猫，著名的“加菲猫”原型。它们继承了波斯猫的甜美性格和扁平脸，但打理毛发更容易。性格慵懒、可爱。',
            example_image_url: 'https://cdn2.thecatapi.com/images/YnPrYEmfe.jpg',
            characteristics: {
                temperament: ['慵懒', '甜美', '温和', '安静'],
                size: '中型',
                coat: '短毛'
            }
        },
        {
            name: '伯曼猫 (Birman)',
            species: Species.CAT,
            description: '伯曼猫被称为“缅甸圣猫”，拥有白色的手套和蓝眼睛。它们性格温和，声音轻柔，喜欢与其人类伙伴互动。',
            example_image_url: 'https://cdn2.thecatapi.com/images/HOrX5gwLS.jpg',
            characteristics: {
                temperament: ['温和', '友好', '安静', '粘人'],
                size: '中大',
                coat: '长毛'
            }
        },
        {
            name: '孟买猫 (Bombay)',
            species: Species.CAT,
            description: '孟买猫全身乌黑油亮，像一只微型的黑豹。它们性格外向、聪明，非常喜欢玩耍，且非常依恋主人。',
            example_image_url: 'https://cdn2.thecatapi.com/images/5iYq9NmT1.jpg',
            characteristics: {
                temperament: ['外向', '聪明', '活跃', '粘人'],
                size: '中型',
                coat: '短毛'
            }
        },
        {
            name: '德文卷毛猫 (Devon Rex)',
            species: Species.CAT,
            description: '德文卷毛猫拥有大耳朵和卷曲的被毛，外表像个小精灵。它们性格调皮、像狗一样粘人，非常喜欢骑在主人的肩膀上。',
            example_image_url: 'https://cdn2.thecatapi.com/images/4RzEwvyzz.jpg',
            characteristics: {
                temperament: ['调皮', '粘人', '活跃', '像猴子'],
                size: '小型',
                coat: '卷毛'
            }
        },
        {
            name: '西伯利亚森林猫 (Siberian)',
            species: Species.CAT,
            description: '西伯利亚猫是俄罗斯的国猫，拥有极其丰厚的被毛。它们也是已知可能对猫毛过敏者产生的过敏原较少的猫种之一。性格像狗一样忠诚。',
            example_image_url: 'https://cdn2.thecatapi.com/images/3bkZAjRh1.jpg',
            characteristics: {
                temperament: ['忠诚', '聪明', '活跃', '低敏'],
                size: '大型',
                coat: '长毛'
            }
        },
        {
            name: '土耳其安哥拉猫 (Turkish Angora)',
            species: Species.CAT,
            description: '土耳其安哥拉猫是优雅的白色长毛猫（也有其他颜色），但不仅是花瓶。它们非常聪明、意志力强，有时甚至有点霸道，喜欢成为注意力的中心。',
            example_image_url: 'https://cdn2.thecatapi.com/images/7CGV6WVXq.jpg',
            characteristics: {
                temperament: ['聪明', '优雅', '活跃', '意志强'],
                size: '中型',
                coat: '长毛'
            }
        }
    ];

    for (const breedData of breeds) {
        const breed = breedRepo.create(breedData);
        await breedRepo.save(breed);
    }
    console.log(`Seeded ${breeds.length} breeds.`);
};
