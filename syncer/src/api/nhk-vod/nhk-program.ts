export interface NHKProgram {
    pgm_id: string;
    ignore_domestic: boolean;
    image: string;
    image_l: string;
    total_episode: number;
    localize_langs?: (string)[] | null;
    title: string;
    title_clean: string;
    description: string;
    description_clean: string;
    url: string;
    origin_site_url: string;
    origin_site_label: string;
    category?: (number)[] | null;
    new_flag: boolean;
    sort_key: string;
    episode_order: string;
    localize_lang: string;
  }
  