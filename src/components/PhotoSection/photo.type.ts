import { z } from 'zod';

export const photoAPIType = z.object({
  id: z.string(),
  urls: z.object({
    regular: z.string().url(),
    full: z.string().url(),
  }),
  alt_description: z.string(),
  likes: z.number(),
  user: z.object({
    name: z.string(),
    portfolio_url: z.string().url(),
    profile_image: z.object({ medium: z.string().url() }),
  }),
});

const creatorPhotoType = z.object({
  isTouch: z.boolean(),
  imgFull: z.string().url(),
  imgRegular: z.string().url(),
  profileImageMedium: z.string().url(),
  portFolioUrl: z.string().url(),
  name: z.string(),
  altDesc: z.string(),
  likes: z.number(),
});

export type PhotoAPIType = z.infer<typeof photoAPIType>;
export type CreatorPhotoType = z.infer<typeof creatorPhotoType>;
