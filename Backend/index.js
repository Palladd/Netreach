const express = require('express');
const http = require('http');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express();

async function main() {
  // // ... you will write your Prisma Client queries here
  const allUsers = await prisma.users.findMany()
  console.log(allUsers)
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

const port = 3005
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});