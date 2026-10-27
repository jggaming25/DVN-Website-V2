# DVN Website V2

Modern, animated Staff Activity System for DVN (Department of Virtual Network).

## Features

- 🔐 **Authentication System** - Login modeled after dvnrbx.de with role-based access
- 👑 **Role Hierarchy** - CEO, Vorstand, Administrator, Management (Admin level) | Personal (below)
- ⭐ **Special Access** - `jggaming2518` is set as Vorstand
- 📊 **Shift Management** - Calendar, shift plans, duty scheduling
- 📈 **Activity Tracking** - Monthly activity monitoring and compliance
- 💰 **Fine System** - Digital penalty management
- 📜 **History & Logs** - Complete audit trail
- 🎨 **Modern UI** - Animated interface with glassmorphism and gradients
- 🚀 **Hosted on Supabase & GitHub Pages**

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Backend**: Supabase (Auth, Database, Storage)
- **Hosting**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- GitHub account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jggaming25/DVN-Website-V2.git
cd DVN-Website-V2
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## Deployment

### GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Push to GitHub and enable GitHub Pages in repository settings
3. Set source to "GitHub Actions" or "Deploy from branch" (gh-pages)

### Supabase Setup

1. Create a new Supabase project
2. Set up authentication (Email/Password)
3. Create database tables for users, shifts, duties, fines, etc.
4. Configure Row Level Security (RLS)
5. Add your Supabase credentials to environment variables

## User Roles

| Role | Access Level | Description |
|------|-------------|-------------|
| CEO/Vorstand/Board | Admin | Full system access |
| Administrator/Management | Admin | Administrative functions |
| Personal | User | Standard member access |

**Special:** `jggaming2518` is automatically assigned as Vorstand

## Data Migration

The system is designed to digitize all shift/duty/fine data from the provided HTML exports. Data can be imported through the admin interface or via Supabase SQL imports.

## Support

For questions or issues, please contact the DVN administration team.

---

Built with ❤️ for DVN
