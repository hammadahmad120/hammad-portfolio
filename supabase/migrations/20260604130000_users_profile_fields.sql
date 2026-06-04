-- Profile fields on public.users (source of truth for app queries)
ALTER TABLE public.users
  ADD COLUMN first_name text,
  ADD COLUMN last_name text,
  ADD COLUMN date_of_birth date,
  ADD COLUMN phone text;

-- Keep public.users in sync when auth.users is created
CREATE OR REPLACE FUNCTION public.handle_new_auth_user ()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  meta jsonb := COALESCE(NEW.raw_user_meta_data, '{}'::jsonb);
  dob_text text := meta ->> 'date_of_birth';
BEGIN
  INSERT INTO public.users (
    id,
    email,
    is_admin,
    first_name,
    last_name,
    date_of_birth,
    phone
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    false,
    meta ->> 'first_name',
    meta ->> 'last_name',
    CASE
      WHEN dob_text IS NULL OR dob_text = '' THEN NULL
      ELSE dob_text::date
    END,
    NEW.phone
  );
  RETURN NEW;
END;
$$;

-- Backfill existing auth users into public.users
INSERT INTO public.users (
  id,
  email,
  is_admin,
  first_name,
  last_name,
  date_of_birth,
  phone
)
SELECT
  u.id,
  COALESCE(u.email, ''),
  COALESCE(p.is_admin, false),
  COALESCE(u.raw_user_meta_data ->> 'first_name', p.first_name),
  COALESCE(u.raw_user_meta_data ->> 'last_name', p.last_name),
  CASE
    WHEN (u.raw_user_meta_data ->> 'date_of_birth') IS NOT NULL
      AND (u.raw_user_meta_data ->> 'date_of_birth') <> '' THEN (u.raw_user_meta_data ->> 'date_of_birth')::date
    ELSE p.date_of_birth
  END,
  COALESCE(u.phone, p.phone)
FROM auth.users u
LEFT JOIN public.users p ON p.id = u.id
ON CONFLICT (id) DO UPDATE
SET
  email = EXCLUDED.email,
  first_name = COALESCE(EXCLUDED.first_name, public.users.first_name),
  last_name = COALESCE(EXCLUDED.last_name, public.users.last_name),
  date_of_birth = COALESCE(EXCLUDED.date_of_birth, public.users.date_of_birth),
  phone = COALESCE(EXCLUDED.phone, public.users.phone);
