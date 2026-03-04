do $$ begin
    create type spot_tag as enum (
        'Free Wifi',
        'Outlets',
        'Quiet',
        'Coffee',
        'Food',
        'Outdoor',
        'Parking',
        'Open Late',
        'Wheelchair Accessible'
    );
exception
    when duplicate_object then null;
end $$;

create table if not exists spots (
    id            bigserial     primary key,
    name          text          not null,
    description   text          not null,
    address       text          not null,
    hours         jsonb,        -- this is always null for now. i don't want to pay for api rn and i dont want users to have to manually enter it so i'll add it later if we get more users.
    phone         text,
    rating        numeric(4, 3),-- cached avg of all ratings for respective spot id - updated on each new review. nullable because review is optional on first upload
    tags          spot_tag[]    not null,
    pictures      text[]        not null,
    created_at    timestamptz   not null DEFAULT now(),
    search_vector tsvector
);

update spots set search_vector = to_tsvector('english',
    name        || ' ' ||
    description || ' ' ||
    address     || ' ' ||
    tags::text 
);

create function spots_search_vector_update() returns trigger as $$
begin
    new.search_vector := to_tsvector('english',
        new.name        || ' ' ||
        new.description || ' ' ||
        new.address     || ' ' ||
        new.tags::text
    );
    return new;
end;
$$ language plpgsql;

create trigger spots_search_vector_trigger
before insert or update on spots
for each row execute function spots_search_vector_update();

create table if not exists users (
    id          bigserial   primary key,
    given_name  text        not null,
    family_name text        not null,
    email       text        not null unique,
    google_id   text        not null unique,
    created_at  timestamptz not null DEFAULT now(),
    recent_searches bigint[]
);

create table if not exists reviews (
    id         bigserial      primary key,
    user_id    bigint         not null references users(id),
    spot_id    bigint         not null references spots(id),
    rating     smallint       not null,
    review     varchar(250),
    created_at timestamptz    not null default now()
);