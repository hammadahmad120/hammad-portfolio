-- Phone lives only on auth.users (Option A)
ALTER TABLE public.users
  DROP COLUMN IF EXISTS phone;

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
    date_of_birth
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
    END
  );
  RETURN NEW;
END;
$$;
