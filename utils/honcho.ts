import { Honcho } from 'honcho-ai';
import { unstable_cache } from 'next/cache';

export const honcho = new Honcho({
  baseURL: process.env.HONCHO_URL!,
});

// export const getHonchoApp = unstable_cache(
//   async () => {
//     return await honcho.apps.getOrCreate(process.env.HONCHO_APP_NAME!, {
//       timeout: 5 * 1000,
//       maxRetries: 5,
//     });
//   },
//   [],
//   {
//     revalidate: 300, // 5 minutes
//   }
// );

export const getHonchoApp = unstable_cache(
  async () => {
    try {
      console.log('🔄 Fetching Honcho app...');
      console.log("honcho", honcho);
      
      console.log('Honcho app name:', process.env.HONCHO_APP_NAME);
      return await honcho.apps.getOrCreate(process.env.HONCHO_APP_NAME!, {
        timeout: 5 * 1000,
        maxRetries: 5,
      });
    } catch (err) {
      console.error('❌ Error in getHonchoApp:', err);
      throw err;
    }
  },
  [],
  {
    revalidate: 300,
  }
);


export const getHonchoUser = unstable_cache(
  async (userId: string) => {
    console.log('🔄 Fetching Honcho user...');
    console.log('Honcho app name:', process.env.HONCHO_APP_NAME);
    console.log('userId:', userId);
    const app = await getHonchoApp();
    return await honcho.apps.users.getOrCreate(app.id, userId, {
      timeout: 5 * 1000,
      maxRetries: 5,
    });
  },
  [],
  {
    revalidate: 300,
  }
);
