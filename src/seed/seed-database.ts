import "dotenv/config";
import prisma from '../lib/prisma';
import { initialData } from './seed';
import { countries } from './seed-countries';



async function main() {

  // 1. Borrar registros previos
  // await Promise.all( [

  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();


  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  // ]);
  
  const { categories, products, users } = initialData;


  await prisma.user.createMany({
    data: users
  });

  await prisma.country.createMany({
    data: countries
  });



  const categoriesData = categories.map( (name) => ({ name }));
  
  await prisma.category.createMany({
    data: categoriesData
  });

  
  const categoriesDB = await prisma.category.findMany();
  
  const categoriesMap = categoriesDB.reduce( (map, category) => {
    map[ category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);
  
  

  // Productos
  for (const product of products) {
    const { linea, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[linea],
      },
    });

    await prisma.productImage.createMany({
      data: images.map((image) => ({
        url: image,
        productId: dbProduct.id,
      })),
    });
  }





}









( () => {

  if ( process.env.NODE_ENV === 'production' ) return;


  main();
} )();