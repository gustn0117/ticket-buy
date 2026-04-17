-- 커뮤니티 게시글
create table if not exists ticket_buy.community_posts (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('news','tip','qna')),
  title text not null,
  content text,
  author_id uuid references ticket_buy.users(id) on delete set null,
  author_name text,
  is_pinned boolean default false,
  views integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists community_posts_category_idx on ticket_buy.community_posts(category);
create index if not exists community_posts_created_idx on ticket_buy.community_posts(created_at desc);

-- 댓글
create table if not exists ticket_buy.community_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references ticket_buy.community_posts(id) on delete cascade,
  author_id uuid references ticket_buy.users(id) on delete set null,
  author_name text,
  content text not null,
  created_at timestamptz default now()
);

create index if not exists community_comments_post_idx on ticket_buy.community_comments(post_id);

-- RLS (간단히 서비스 키만 허용, 필요시 조정)
alter table ticket_buy.community_posts enable row level security;
alter table ticket_buy.community_comments enable row level security;

create policy if not exists "public read community_posts" on ticket_buy.community_posts for select using (true);
create policy if not exists "public read community_comments" on ticket_buy.community_comments for select using (true);

-- 조회수 증가 RPC
create or replace function ticket_buy.increment_community_views(post_id uuid)
returns void as $$
  update ticket_buy.community_posts set views = views + 1 where id = post_id;
$$ language sql;
