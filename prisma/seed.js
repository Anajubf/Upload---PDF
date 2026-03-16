import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Resetando tabela exemplo...');

    // Remove todos os registros
    // await prisma.aluno.deleteMany();

    console.log('📦 Inserindo novos registros...');

    await prisma.aluno.createMany({
        data: [
            { nome: 'Ana Júlia', escola: 'SENAI', turma: '2TDS2' },
            { nome: 'Maria Clara', escola: 'SENAI', turma: '2TDS2'},
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
