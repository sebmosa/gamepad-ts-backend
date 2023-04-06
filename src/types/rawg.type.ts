import { z } from 'zod'

export const PlatformSchema = z.object({
  count: z.number(),
  previous: z.string().nullable(),
  next: z.string().nullable(),
  results: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
    })
  ),
})

export const GenreSchema = PlatformSchema

export const CustomSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      slug: z.string(),
      name: z.string(),
      playtime: z.number(),
      platforms: z.array(
        z.object({
          platform: z.object({
            id: z.number(),
            name: z.string(),
            slug: z.string(),
          }),
        })
      ),
      stores: z
        .array(
          z.object({
            store: z
              .object({
                id: z.number(),
                name: z.string(),
                slug: z.string(),
              })
              .nullable(),
          })
        )
        .nullable(),
      released: z.string(),
      tba: z.boolean(),
      background_image: z.string().nullable(),
      rating: z.number(),
      rating_top: z.number(),
      ratings: z.array(
        z.object({
          id: z.number(),
          title: z.string(),
          count: z.number(),
          percent: z.number(),
        })
      ),
      ratings_count: z.number(),
      reviews_text_count: z.number(),
      added: z.number(),
      added_by_status: z
        .object({
          owned: z.number().optional(),
          toplay: z.number().optional(),
          dropped: z.number().optional(),
        })
        .optional()
        .nullable(),
      metacritic: z.number().nullable(),
      suggestions_count: z.number(),
      updated: z.string(),
      id: z.number(),
      score: z.string(),
      clip: z.null(),
      tags: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          slug: z.string(),
          language: z.string(),
          games_count: z.number(),
          image_background: z.string().nullable(),
        })
      ),
      esrb_rating: z
        .object({
          id: z.number(),
          name: z.string(),
          slug: z.string(),
          name_en: z.string(),
          name_ru: z.string(),
        })
        .nullable(),
      user_game: z.null(),
      reviews_count: z.number(),
      community_rating: z.number().optional(),
      saturated_color: z.string(),
      dominant_color: z.string(),
      short_screenshots: z.array(
        z.object({ id: z.number(), image: z.string() })
      ),
      parent_platforms: z.array(
        z.object({
          platform: z.object({
            id: z.number(),
            name: z.string(),
            slug: z.string(),
          }),
        })
      ),
      genres: z.array(
        z.object({ id: z.number(), name: z.string(), slug: z.string() })
      ),
    })
  ),
  user_platforms: z.boolean(),
})

export const AllSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      id: z.number(),
      slug: z.string(),
      name: z.string(),
      released: z.string(),
      tba: z.boolean(),
      background_image: z.string().nullable(),
      rating: z.number(),
      rating_top: z.number(),
      ratings: z.array(
        z.object({
          id: z.number(),
          title: z.string(),
          count: z.number(),
          percent: z.number(),
        })
      ),
      ratings_count: z.number(),
      reviews_text_count: z.number(),
      added: z.number(),
      added_by_status: z.object({
        yet: z.number().optional(),
        owned: z.number().optional(),
        beaten: z.number().optional(),
        toplay: z.number().optional(),
        dropped: z.number().optional(),
        playing: z.number().optional(),
      }),
      metacritic: z.number().nullable(),
      playtime: z.number(),
      suggestions_count: z.number(),
      updated: z.string(),
      user_game: z.null(),
      reviews_count: z.number(),
      saturated_color: z.string(),
      dominant_color: z.string(),
      platforms: z.array(
        z.object({
          platform: z.object({
            id: z.number(),
            name: z.string(),
            slug: z.string(),
            image: z.string().nullable(),
            year_end: z.number().nullable(),
            year_start: z.number().nullable(),
            games_count: z.number(),
            image_background: z.string().nullable(),
          }),
          released_at: z.string().nullable(),
          requirements_en: z.object({}).nullable(),
          requirements_ru: z.object({}).nullable(),
        })
      ),
      parent_platforms: z.array(
        z.object({
          platform: z.object({
            id: z.number(),
            name: z.string(),
            slug: z.string(),
          }),
        })
      ),
      genres: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          slug: z.string(),
          games_count: z.number(),
          image_background: z.string(),
        })
      ),
      stores: z.array(
        z.object({
          id: z.number(),
          store: z.object({
            id: z.number(),
            name: z.string(),
            slug: z.string(),
            domain: z.string(),
            games_count: z.number(),
            image_background: z.string(),
          }),
        })
      ),
      clip: z.null(),
      tags: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          slug: z.string(),
          language: z.string(),
          games_count: z.number(),
          image_background: z.string(),
        })
      ),
      esrb_rating: z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
      }).nullable(),
      short_screenshots: z.array(
        z.object({ id: z.number(), image: z.string() })
      ),
    })
  ),
  seo_title: z.string(),
  seo_description: z.string(),
  seo_keywords: z.string(),
  seo_h1: z.string(),
  noindex: z.boolean(),
  nofollow: z.boolean(),
  description: z.string(),
  filters: z.object({
    years: z.array(
      z.object({
        from: z.number(),
        to: z.number(),
        filter: z.string(),
        decade: z.number(),
        years: z.array(
          z.object({
            year: z.number(),
            count: z.number(),
            nofollow: z.boolean(),
          })
        ),
        nofollow: z.boolean(),
        count: z.number(),
      })
    ),
  }),
  nofollow_collections: z.array(z.string()),
})
