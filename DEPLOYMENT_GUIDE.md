# DVN Website V2 - Deployment & Setup Guide

## Quick Start Instructions

This guide will walk you through deploying the DVN Staff Activity System to Supabase and GitHub Pages.

## Prerequisites

- [GitHub Account](https://github.com) - Repository is at https://github.com/jggaming25/DVN-Website-V2
- [Supabase Account](https://supabase.com) - For backend, auth, and database
- [Node.js 18+](https://nodejs.org/) - For local development
- Git installed locally

## Step 1: Supabase Setup

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Set project name: `dvn-website-v2`
5. Set a strong database password (save this!)
6. Select region closest to your users
7. Click "Create new project" (takes ~2 minutes)

### 1.2 Get API Credentials
1. Go to Project Settings > API
2. Copy `Project URL` - this is your `VITE_SUPABASE_URL`
3. Copy `anon public` key - this is your `VITE_SUPABASE_ANON_KEY`
4. Save these for later

### 1.3 Setup Authentication
1. Go to Authentication > Settings
2. Under "Auth Providers", ensure Email is enabled
3. Configure email templates if desired
4. Under "URL Configuration":
   - Site URL: `https://jggaming25.github.io/DVN-Website-V2/`
   - Redirect URLs: Add the same URL above

### 1.4 Setup Database

Go to SQL Editor and run these queries:

```sql
-- Create users table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'PERSONAL' CHECK (role IN ('PERSONAL', 'MANAGEMENT', 'ADMINISTRATOR', 'ADMIN', 'BOARD', 'CEO', 'VORSTAND')),
  unit_id UUID,
  unit_name TEXT,
  activity_eligible BOOLEAN DEFAULT true,
  is_shift_host BOOLEAN DEFAULT false,
  account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'disabled')),
  staff_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create units table
CREATE TABLE public.units (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shifts table
CREATE TABLE public.shifts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
  scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'open', 'running', 'completed', 'cancelled')),
  shift_type TEXT DEFAULT 'Public',
  unit_id UUID REFERENCES public.units(id),
  host_user_id UUID REFERENCES public.profiles(id),
  max_participants INTEGER,
  activity_eligible BOOLEAN DEFAULT true,
  remarks TEXT,
  performance_score DECIMAL(5,2),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create participations table
CREATE TABLE public.participations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shift_id UUID REFERENCES public.shifts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed')),
  actual_check_in TIMESTAMP WITH TIME ZONE,
  actual_check_out TIMESTAMP WITH TIME ZONE,
  actual_duration_minutes INTEGER,
  credited_duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(shift_id, user_id)
);

-- Create fines table
CREATE TABLE public.fines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  reason TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'paid', 'cancelled')),
  issued_by UUID REFERENCES public.profiles(id),
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE
);

-- Create duty assignments table
CREATE TABLE public.duties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  status TEXT DEFAULT 'standby' CHECK (status IN ('active', 'standby', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create duty_members table
CREATE TABLE public.duty_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  duty_id UUID REFERENCES public.duties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(duty_id, user_id)
);

-- Insert default units
INSERT INTO public.units (name) VALUES 
  ('Leitung'),
  ('Verwaltung'),
  ('Management'),
  ('Einsatz'),
  ('Ausbildung'),
  ('Support');

-- Insert default duties
INSERT INTO public.duties (name, description, location, status) VALUES 
  ('Streifen', 'Patrouillendienst', 'Stadtgebiet', 'active'),
  ('Zentrale', 'Leitstellenbetrieb', 'Leitstelle', 'active'),
  ('Sicherung', 'Objektsicherung', 'Eventbereich', 'standby'),
  ('Patrouille', 'Allgemeine Patrouille', 'Außengebiet', 'active');
```

### 1.5 Setup Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duty_members ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Shifts policies
CREATE POLICY "Anyone can view shifts" ON public.shifts FOR SELECT USING (true);
CREATE POLICY "Admins can manage shifts" ON public.shifts FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('CEO', 'VORSTAND', 'ADMINISTRATOR', 'ADMIN', 'BOARD', 'MANAGEMENT'))
);

-- Similar policies for other tables...
```

### 1.6 Create Vorstand User

1. Go to Authentication > Users
2. Click "Add user" > "Create new user"
3. Email: (use a placeholder or real email)
4. Password: Set a secure password
5. Auto Confirm User: Yes
6. Click "Create user"
7. Copy the User ID

Then in SQL Editor:
```sql
INSERT INTO public.profiles (id, username, display_name, role, activity_eligible, is_shift_host, account_status)
VALUES ('PASTE_USER_ID_HERE', 'jggaming2518', 'jggaming2518', 'VORSTAND', true, true, 'active');
```

## Step 2: GitHub Pages Setup

### 2.1 Configure Repository
The repo is already at https://github.com/jggaming25/DVN-Website-V2

### 2.2 Add Secrets (Optional but recommended)
Go to Settings > Secrets and variables > Actions and add:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 2.3 Enable GitHub Pages
1. Go to Settings > Pages
2. Source: GitHub Actions
3. The workflow will be created automatically or use the provided one

### 2.4 Deploy
Push any changes to the `main` branch and GitHub Actions will automatically build and deploy to GitHub Pages.

Your site will be available at: `https://jggaming25.github.io/DVN-Website-V2/`

## Step 3: Local Development

1. Clone and install:
```bash
git clone https://github.com/jggaming25/DVN-Website-V2.git
cd DVN-Website-V2
npm install
```

2. Create `.env` file:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

3. Run dev server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Step 4: Import Existing Data

The HTML files from your conversation contain shift calendars, staff data, fines, etc. To import them:

1. Open each HTML file and extract relevant data (users, shifts, fines)
2. Use the Supabase SQL Editor or Table Editor to import
3. Or use the admin interface once logged in as Vorstand

## Troubleshooting

### Login Issues
- Ensure the `jggaming2518` user is created in both auth.users and profiles with role 'VORSTAND'
- Check RLS policies aren't blocking access
- Verify Supabase URL and keys are correct

### GitHub Pages Not Loading
- Ensure `base: './'` is set in vite.config.ts (already done)
- Check if GitHub Pages is enabled
- Wait a few minutes after deployment
- Clear browser cache

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Features Overview

- **Dashboard**: Overview of shifts, activity, and notifications
- **Schichten (Shifts)**: View and manage shift schedules
- **Dienste (Duty)**: Duty assignments and areas
- **Mitarbeiter (Staff)**: User management with role assignment
- **Activity**: Monthly activity tracking and compliance
- **Strafen (Fines)**: Fine management system
- **Verlauf (History)**: Audit log of all activities

## Support & Contact

For technical support or questions, please reach out to the DVN development team.

---

**Last Updated:** October 27, 2026  
**Version:** 2.0.0
