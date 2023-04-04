import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// 만약 DB가 최대 5개의 동시 연결을 지원하는 경우 이 PrismaClient는 이러한 5개의 연결을 모두 처리한다.
// 이 PrismaClient의 인스턴스는 하나만 사용하고 여러개 만들지 않는 것이 정말 중요하다.
// 그렇지 않을 경우 너무 많은 연결로 인해 DB가 정체될 수 있다.

async function main() {
    await prisma.user.deleteMany()
    const user = await prisma.user.create({
        data: {
            name: "moon",
            email: "moon@test.com",
            age: 29,
            userPreference: {
                create: {
                    emailUpdates: true,
                },
            },
        },
        include: {
            userPreference: true,
        }
    })

    console.log(user)
}

main()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async ()=> {
        await prisma.$disconnect();
    })
