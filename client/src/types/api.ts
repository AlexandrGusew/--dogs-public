export interface CatApiResponse {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface DogApiResponse {
  message: string;
  status: string;
}

export interface FoxApiResponse {
  image: string;
  link: string;
}

export interface FavoriteItem {
  id: number;
  imageUrl: string;
  comment: string;
}
