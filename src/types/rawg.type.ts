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
      released: z.string().nullable(),
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
      score: z.string().nullable().optional(),
      clip: z.null(),
      tags: z
        .array(
          z.object({
            id: z.number(),
            name: z.string(),
            slug: z.string(),
            language: z.string(),
            games_count: z.number(),
            image_background: z.string().nullable(),
          })
        )
        .nullable(),
      esrb_rating: z
        .object({
          id: z.number(),
          name: z.string(),
          slug: z.string(),
          name_en: z.string().optional(),
          name_ru: z.string().optional(),
        })
        .nullable(),
      user_game: z.null(),
      reviews_count: z.number(),
      community_rating: z.number().optional(),
      saturated_color: z.string(),
      dominant_color: z.string(),
      short_screenshots: z
        .array(z.object({ id: z.number(), image: z.string() }))
        .nullable(),
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
  user_platforms: z.boolean().optional(),
})

export const GameSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  name_original: z.string(),
  description: z.string(),
  metacritic: z.number().nullable(),
  metacritic_platforms: z.array(
    z.object({
      metascore: z.number(),
      url: z.string(),
      platform: z.object({
        platform: z.number(),
        name: z.string(),
        slug: z.string(),
      }),
    })
  ),
  released: z.string().nullable(),
  tba: z.boolean(),
  updated: z.string(),
  background_image: z.string().nullable(),
  background_image_additional: z.string().nullable(),
  website: z.string(),
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
  reactions: z.object({}).nullable(),
  added: z.number(),
  added_by_status: z
    .object({
      yet: z.number().optional(),
      owned: z.number().optional(),
      beaten: z.number().optional(),
      toplay: z.number().optional(),
      dropped: z.number().optional(),
      playing: z.number().optional(),
    })
    .nullable(),
  playtime: z.number(),
  screenshots_count: z.number(),
  movies_count: z.number(),
  creators_count: z.number(),
  achievements_count: z.number(),
  parent_achievements_count: z.number(),
  reddit_url: z.string(),
  reddit_name: z.string(),
  reddit_description: z.string(),
  reddit_logo: z.string(),
  reddit_count: z.number(),
  twitch_count: z.number(),
  youtube_count: z.number(),
  reviews_text_count: z.number(),
  ratings_count: z.number(),
  suggestions_count: z.number(),
  alternative_names: z.array(z.string()),
  metacritic_url: z.string(),
  parents_count: z.number(),
  additions_count: z.number(),
  game_series_count: z.number(),
  user_game: z.null(),
  reviews_count: z.number(),
  saturated_color: z.string(),
  dominant_color: z.string(),
  parent_platforms: z.array(
    z.object({
      platform: z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
      }),
    })
  ),
  platforms: z.array(
    z.object({
      platform: z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
        image: z.null(),
        year_end: z.null(),
        year_start: z.number().nullable(),
        games_count: z.number(),
        image_background: z.string(),
      }),
      released_at: z.string().nullable(),
      requirements: z.object({}),
    })
  ),
  stores: z.array(
    z.object({
      id: z.number(),
      url: z.string(),
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
  developers: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
      games_count: z.number(),
      image_background: z.string(),
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
  publishers: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
      games_count: z.number(),
      image_background: z.string(),
    })
  ),
  esrb_rating: z
    .object({ id: z.number(), name: z.string(), slug: z.string() })
    .nullable(),
  clip: z.null(),
  description_raw: z.string(),
})
