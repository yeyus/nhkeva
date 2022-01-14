export interface NHKEpisode {
    pgm_gr_id: string;
    pgm_id: string;
    pgm_no: string;
    image: string;
    image_l: string;
    image_promo: string;
    ignore_domestic: boolean;
    nod_url?: null;
    voice_lang: string;
    caption_langs?: (null)[] | null;
    voice_langs?: (string)[] | null;
    vod_id: string;
    onair: number;
    vod_to: number;
    movie_lengh: string;
    movie_duration: number;
    analytics: string;
    title: string;
    title_clean: string;
    sub_title: string;
    sub_title_clean: string;
    description: string;
    description_clean: string;
    url: string;
    category?: (number)[] | null;
    mostwatch_ranking: number;
    related_episodes?: (RelatedEpisodes)[] | null;
    tags?: (string)[] | null;
    chapter_list?: (null)[] | null;
    transcript_path?: null;
    life: number;
    life_category?: (null)[] | null;
    promotion?: (null)[] | null;
}

export interface RelatedEpisodes {
    lang: string;
    content_type: string;
    episode_key: string;
}
  