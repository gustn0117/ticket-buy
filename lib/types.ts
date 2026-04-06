export interface DBPost {
  id: string;
  author_id: string;
  type: 'sell' | 'buy';
  category: string;
  title: string;
  face_value: number;
  price: number;
  discount: number; // generated column
  delivery: string | null;
  delivery_method: string;
  region: string | null;
  description: string | null;
  tags: string[];
  views: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // joined
  author?: DBUser;
}

export interface DBUser {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  type: 'normal' | 'business';
  password_hash?: string;
  created_at: string;
  updated_at: string;
}

export interface DBChat {
  id: string;
  post_id: string | null;
  buyer_id: string | null;
  seller_id: string | null;
  status: string;
  current_step: number;
  created_at: string;
  updated_at: string;
  // joined
  post?: DBPost;
  buyer?: DBUser;
  seller?: DBUser;
}

export interface DBMessage {
  id: string;
  chat_id: string;
  sender_id: string | null;
  type: string;
  content: string;
  data: Record<string, unknown> | null;
  created_at: string;
}

export interface DBNotice {
  id: string;
  title: string;
  content: string | null;
  is_pinned: boolean;
  created_at: string;
}
