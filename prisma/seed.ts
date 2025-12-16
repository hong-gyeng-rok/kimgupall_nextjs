import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

config({ path: '.env' })
config({ path: '.env.local' })

const connection = new Pool({ connectionString: process.env.POSTGRES_URL })
const adapter = new PrismaPg(connection)
const prisma = new PrismaClient({ adapter })

const imageData = {
  "25fw": [
    {
      "id": 72,
      "title": "2025 추석",
      "url": "25fw/2025 추석.webp",
      "description": "2025 추석 일러스트",
      "group": "개인작품"
    },
    {
      "id": 71,
      "title": "ON THE WAVE 1",
      "url": "25fw/ON THE WAVE 1.webp",
      "description": "ON THE WAVE 1 일러스트",
      "group": "개인작품"
    },
    {
      "id": 70,
      "title": "ON THE WAVE 2",
      "url": "25fw/ON THE WAVE 2.webp",
      "description": "ON THE WAVE 2 일러스트",
      "group": "개인작품"
    },
    {
      "id": 69,
      "title": "ON THE WAVE 3",
      "url": "25fw/ON THE WAVE 3.webp",
      "description": "ON THE WAVE 3 일러스트",
      "group": "개인작품"
    },
    {
      "id": 68,
      "title": "WATER1",
      "url": "25fw/WATER1.webp",
      "description": "WATER1 일러스트",
      "group": "개인작품"
    },
    {
      "id": 67,
      "title": "blurry",
      "url": "25fw/blurry.webp",
      "description": "blurry 일러스트",
      "group": "개인작품"
    },
    {
      "id": 66,
      "title": "september",
      "url": "25fw/september.webp",
      "description": "september 일러스트",
      "group": "개인작품"
    },
    {
      "id": 65,
      "title": "나락도 락이다",
      "url": "25fw/나락도 락이다.webp",
      "description": "나락도 락이다 일러스트",
      "group": "개인작품"
    },
    {
      "id": 64,
      "title": "바람아 불어라2",
      "url": "25fw/바람아 불어라2.webp",
      "description": "바람아 불어라2 일러스트",
      "group": "개인작품"
    },
    {
      "id": 63,
      "title": "야차폭력_최최종본",
      "url": "25fw/야차폭력_최최종본.webp",
      "description": "야차폭력_최최종본 일러스트",
      "group": "개인작품"
    },
    {
      "id": 62,
      "title": "에겐녀 테토녀 복사본",
      "url": "25fw/에겐녀 테토녀 복사본.webp",
      "description": "에겐녀 테토녀 복사본 일러스트",
      "group": "개인작품"
    },
    {
      "id": 61,
      "title": "유니버스",
      "url": "25fw/유니버스.webp",
      "description": "유니버스 일러스트",
      "group": "개인작품"
    }
  ],
  "25ss": [
    {
      "id": 60,
      "title": "2025 새해 기념 포스터",
      "url": "25ss/webp/2025 2.webp",
      "description": "2025년 새해를 기념하는 포스터",
      "group": "개인작품"
    },
    {
      "id": 59,
      "title": "개화",
      "url": "25ss/webp/개화1.webp",
      "description": "봄의 개화를 주제로 한 일러스트",
      "group": "개인작품"
    },
    {
      "id": 58,
      "title": "경희대와 벚꽃",
      "url": "25ss/webp/경희대_일러스트png.webp",
      "description": "경희대학교에서 의뢰를 받아 제작한 벚꽃 일러스트",
      "group": "의뢰작품"
    },
    {
      "id": 57,
      "title": "급행열차",
      "url": "25ss/webp/급행열차.webp",
      "description": "급행열차를 주제로 한 일러스트",
      "group": "개인작품"
    },
    {
      "id": 56,
      "title": "러너",
      "url": "25ss/webp/달려1.webp",
      "description": "2025 빈칸 전시회 전시 작품",
      "group": "빈칸"
    },
    {
      "id": 55,
      "title": "아웃사이더 히터",
      "url": "25ss/webp/달려2_02.webp",
      "description": "2025 빈칸 전시회 전시 작품",
      "group": "빈칸"
    },
    {
      "id": 54,
      "title": "Idol",
      "url": "25ss/webp/달려3_02.webp",
      "description": "2025 빈칸 전시회 전시 작품",
      "group": "빈칸"
    },
    {
      "id": 53,
      "title": "Idol 2",
      "url": "25ss/webp/달려3_그림_티셔츠_뒷면_02.webp",
      "description": "2025 빈칸 전시회 전시 작품",
      "group": "빈칸"
    },
    {
      "id": 52,
      "title": "메가 하이볼",
      "url": "25ss/webp/메가png.webp",
      "description": "토리키주쿠 메가 하이볼을 주제로 한 일러스트",
      "group": "개인작품"
    },
    {
      "id": 51,
      "title": "바보상자스타",
      "url": "25ss/webp/바보상자스타.webp",
      "description": "바보상자스타 일러스트",
      "group": "개인작품"
    },
    {
      "id": 50,
      "title": "사브리나_카펜터",
      "url": "25ss/webp/사브리나_카펜터2.webp",
      "description": "사브리나 카펜터 팬아트 일러스트",
      "group": "팬아트"
    },
    {
      "id": 49,
      "title": "2025 설날",
      "url": "25ss/webp/설날 2025.webp",
      "description": "2025년 설날을 기념하는 일러스트",
      "group": "개인작품"
    },
    {
      "id": 48,
      "title": "심장",
      "url": "25ss/webp/심장.webp",
      "description": "심장 일러스트",
      "group": "개인작품"
    },
    {
      "id": 47,
      "title": "어항소녀",
      "url": "25ss/webp/어항소녀.webp",
      "description": "어항소녀 일러스트",
      "group": "개인작품"
    },
    {
      "id": 46,
      "title": "옛날거",
      "url": "25ss/webp/옛날거2.webp",
      "description": "옛날거 일러스트",
      "group": "개인작품"
    },
    {
      "id": 45,
      "title": "옛날거 Left",
      "url": "25ss/webp/옛날거3.webp",
      "description": "옛날거 분활 Left 버전 일러스트",
      "group": "개인작품"
    },
    {
      "id": 44,
      "title": "옛날거 Right",
      "url": "25ss/webp/옛날거4.webp",
      "description": "옛날거 분활 Right 버전 일러스트",
      "group": "개인작품"
    },
    {
      "id": 43,
      "title": "칠가이",
      "url": "25ss/webp/칠가이.webp",
      "description": "칠가이 일러스트",
      "group": "개인작품"
    },
    {
      "id": 42,
      "title": "포수",
      "url": "25ss/webp/BASEBALL_04.webp",
      "description": "야구 포수 일러스트",
      "group": "개인작품"
    },
    {
      "id": 41,
      "title": "투수",
      "url": "25ss/webp/BASEBALL_05.webp",
      "description": "야구 투수 일러스트",
      "group": "개인작품"
    },
    {
      "id": 40,
      "title": "타자",
      "url": "25ss/webp/BASEBALL_06.webp",
      "description": "야구 타자 일러스트",
      "group": "개인작품"
    },
    {
      "id": 39,
      "title": "유령신부",
      "url": "25ss/webp/ghost.webp",
      "description": "유령신부 일러스트",
      "group": "개인작품"
    },
    {
      "id": 38,
      "title": "IAMROCKXTAR",
      "url": "25ss/webp/IAMROCKXTAR2.webp",
      "description": "IAMROCKXTAR 일러스트",
      "group": "개인작품"
    }
  ],
  "24ss": [
    {
      "id": 37,
      "title": "겨울 맞이 토끼",
      "url": "24ss/webp/1703222375920.webp",
      "description": "겨울을 맞이하는 귀여운 토끼 일러스트",
      "group": "개인작품"
    },
    {
      "id": 36,
      "title": "어린왕자와 여우",
      "url": "24ss/webp/1703254518389.webp",
      "description": "어린왕자와 여우 일러스트",
      "group": "개인작품"
    },
    {
      "id": 35,
      "title": "상어와 악마",
      "url": "24ss/webp/1703595466263.webp",
      "description": "상어의 악마와 악마 일러스트",
      "group": "개인작품"
    },
    {
      "id": 34,
      "title": "늑대와 고양이",
      "url": "24ss/webp/1703763339265.webp",
      "description": "늑대와 고양이의 일러스트",
      "group": "개인작품"
    },
    {
      "id": 33,
      "title": "3.1절 기념 포스터",
      "url": "24ss/webp/1704453799843.webp",
      "description": "3.1절 기념 일러스트",
      "group": "개인작품"
    },
    {
      "id": 32,
      "title": "새로운 시작",
      "url": "24ss/webp/1704786551105.webp",
      "description": "새로운 시작을 알리는 일러스트",
      "group": "개인작품"
    },
    {
      "id": 31,
      "title": "손흥민 팬아트",
      "url": "24ss/webp/1705224852786.webp",
      "description": "손흥민 선수 팬아트 일러스트",
      "group": "팬아트"
    },
    {
      "id": 30,
      "title": "그래 내가 개다.",
      "url": "24ss/webp/1705306614864.webp",
      "description": "개가된 사람을 표현한 일러스트",
      "group": "개인작품"
    },
    {
      "id": 29,
      "title": "우주인",
      "url": "24ss/webp/1707032190406.webp",
      "description": "현재의 나와 미래의 나를 표현한 우주인 일러스트",
      "group": "개인작품"
    },
    {
      "id": 28,
      "title": "피식대학 팬아트",
      "url": "24ss/webp/1707203069849.webp",
      "description": "피식대학 팬아트 일러스트",
      "group": "팬아트"
    },
    {
      "id": 27,
      "title": "화투 컨샙아트",
      "url": "24ss/webp/1707203084765.webp",
      "description": "화투 컨샙 아트",
      "group": "컨샙아트"
    },
    {
      "id": 26,
      "title": "기계같은 사람들 속 나",
      "url": "24ss/webp/1708256721565.webp",
      "description": "기계같은 사람들 속 기계가 되기 싫은 나를 표현한 일러스트",
      "group": "개인작품"
    },
    {
      "id": 25,
      "title": "SNS 중독",
      "url": "24ss/webp/1708334901584.webp",
      "description": "SNS 중독을 표현한 일러스트",
      "group": "개인작품"
    },
    {
      "id": 24,
      "title": "무제",
      "url": "24ss/webp/1709196876417.webp",
      "description": "무제",
      "group": "개인작품"
    },
    {
      "id": 23,
      "title": "1710232574663",
      "url": "24ss/webp/1710232574663.webp",
      "group": "개인작품"
    },
    {
      "id": 22,
      "title": "벚꽃과 그녀",
      "url": "24ss/webp/1710841746545.webp",
      "description": "벚꽃과 그녀",
      "group": "개인작품"
    },
    {
      "id": 21,
      "title": "십이지신",
      "url": "24ss/webp/1711009703496.webp",
      "description": "십이지신을 캐릭터로 재해석한 일러스트",
      "group": "컨샙아트"
    },
    {
      "id": 20,
      "title": "운수 좋은 날",
      "url": "24ss/webp/1711784100772.webp",
      "description": "운수 좋은 날에서 영감을 받은 일러스트",
      "group": "컨샙아트"
    },
    {
      "id": 19,
      "title": "밴드부",
      "url": "24ss/webp/2d애니_캐릭터_디자인.webp",
      "description": "밴드부 캐릭터 디자인 일러스트",
      "group": "컨샙아트"
    },
    {
      "id": 18,
      "title": "바캉스",
      "url": "24ss/webp/KakaoTalk_20240627_183749790.webp",
      "description": "바캉스를 즐기는 캐릭터 일러스트",
      "group": "개인작품"
    },
    {
      "id": 17,
      "title": "부처님 오신 날",
      "url": "24ss/webp/KakaoTalk_20240627_185914243.webp",
      "description": "부처님 오신 날을 기념하는 일러스트",
      "group": "개인작품"
    },
    {
      "id": 16,
      "title": "마감 지옥",
      "url": "24ss/webp/KakaoTalk_20240627_190006611_02.webp",
      "description": "마감 지옥에 빠진 나를 표현한 일러스트",
      "group": "개인작품"
    },
    {
      "id": 15,
      "title": "2024 월드컵",
      "url": "24ss/webp/KakaoTalk_20240627_190006611_04.webp",
      "description": "2024 월드컵을 기념하는 일러스트",
      "group": "개인작품"
    },
  ],
  "24fw": [
    {
      "id": 14,
      "title": "결혼기념일2",
      "url": "24fw/webp/결혼기념일2.webp",
      "description": "결혼기념일 축하 일러스트",
      "group": "개인작품"
    },
    {
      "id": 13,
      "title": "레서판다",
      "url": "24fw/webp/레서판다.webp",
      "description": "레서판다, 코스프레 일러스트",
      "group": "개인작품"
    },
    {
      "id": 12,
      "title": "레서판다2",
      "url": "24fw/webp/레서판다2.webp",
      "description": "레서판다 코스프레 일러스트",
      "group": "개인작품"
    },
    {
      "id": 11,
      "title": "레서판다3",
      "url": "24fw/webp/레서판다3.webp",
      "description": "레서판다  판다 일러스트",
      "group": "개인작품"
    },
    {
      "id": 10,
      "title": "서일페 포스터",
      "url": "24fw/webp/서일페_엽서1.webp",
      "description": "서일페 사람 엽서 일러스트",
      "group": "서일페"
    },
    {
      "id": 9,
      "title": "서일페 Series 1",
      "url": "24fw/webp/서일페_키링_토끼.webp",
      "description": "서일페 토끼 일러스트",
      "group": "서일페"
    },
    {
      "id": 8,
      "title": "서일페 Series 2",
      "url": "24fw/webp/서일페_키링비니.webp",
      "description": "서일페 비니 일러스트",
      "group": "서일페"
    },
    {
      "id": 7,
      "title": "서일페 Series 3",
      "url": "24fw/webp/서일페_키링양갈래.webp",
      "description": "서일페 양갈래 일러스트",
      "group": "서일페"
    },
    {
      "id": 6,
      "title": "서일페 y2k 포스터",
      "url": "24fw/webp/서일페_y2k.webp",
      "description": "서일페 y2k 엽서 일러스트",
      "group": "서일페"
    },
    {
      "id": 5,
      "title": "GD 팬아트",
      "url": "24fw/webp/gd.webp",
      "description": "GD 팬아트 일러스트",
      "group": "팬아트"
    }
  ],
  "banner": [
    {
      "id": 4,
      "title": "Banner 포수",
      "url": "banner/baseball_banner_img_2.webp",
      "description": "배너 이미지 포수",
      "group": "배너"
    },
    {
      "id": 3,
      "title": "Banner 투수",
      "url": "banner/baseball_banner_img_3.webp",
      "description": "배너 이미지 투수",
      "group": "배너"
    },
    {
      "id": 2,
      "title": "Banner 타자",
      "url": "banner/baseball_banner_img_4.webp",
      "description": "배너 이미지 타자",
      "group": "배너"
    }
  ]
}

async function main() {
  const seasons = Object.keys(imageData) as Array<keyof typeof imageData>;

  for (const season of seasons) {
    const images = imageData[season];
    
    console.log(`Seeding images for season: ${season}...`);

    for (const image of images) {
      await prisma.image.upsert({
        where: { id: image.id.toString() },
        update: {
          publicUrl: image.url,
          title: image.title,
          description: image.description || null,
          group: image.group,
          season: season,
          storagePath: image.url,
        },
        create: {
          id: image.id.toString(),
          publicUrl: image.url,
          title: image.title,
          description: image.description || null,
          group: image.group,
          season: season,
          storagePath: image.url,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })