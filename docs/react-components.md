# Queer Youth Group - Components Documentation

## Project Structure

```
src/
└── components/
    ├── AccessibilityWidget/
    │   ├── index.tsx
    │   ├── AccessibilityProvider.tsx
    │   └── AccessibilityStyles.css
    ├── BlogComponent/
    │   └── index.tsx
    ├── Card/
    │   └── index.tsx
    ├── Donations/
    │   └── index.tsx
    ├── Footer/
    │   └── index.tsx
    ├── Header/
    │   └── index.tsx
    ├── LanguageSwitcher/
    │   └── index.tsx
    ├── Navbar/
    │   ├── index.tsx
    │   └── nav-links.tsx
    ├── NavigationCards/
    │   └── index.tsx
    ├── Notice/
    │   └── index.tsx
    ├── PortableTextComponent/
    │   └── index.tsx
    ├── Report/
    │   └── index.tsx
    ├── Reveal/
    │   └── index.tsx
    ├── Slideshow/
    │   ├── index.tsx
    │   └── slideshow.css
    ├── VisionTab/
    │   └── index.tsx
    └── Welcome/
        └── index.tsx
```

---

## Components Overview

### 1. AccessibilityWidget

**Purpose**: Provides comprehensive accessibility features for users with various needs.

**Key Features**:
- **13 Accessibility Options**:
  - Contrast modes (normal, invert, dark, light)
  - Text size scaling (1x to 4x)
  - Text spacing (normal, light, moderate, heavy)
  - Line height adjustment (1, 1.5, 1.75, 2)
  - Text alignment (left, center, right, justified)
  - Font types (normal, dyslexia-friendly, legible)
  - Cursor options (normal, big, reading guide, reading mask)
  - Saturation controls (normal, low, heavy, desaturate)
  - Link highlighting toggle
  - Animation pause toggle
  - Image hiding toggle
  - Enhanced tooltips toggle

**Components**:
- `AccessibilityProvider.tsx`: Context provider managing state, localStorage persistence, and DOM manipulation
- `index.tsx`: Floating widget UI with slide-in panel
- `AccessibilityStyles.css`: Comprehensive CSS for all accessibility features

**State Management**:
- Uses React Context + useReducer
- Persists settings to localStorage
- Tracks mouse position for reading guide/mask features

**Special Protections**:
- Excludes navbar, header, footer, VisionTab, PublicationsCarousel, and timeline components from certain transformations
- Ensures widget itself is never affected by accessibility settings

**Bilingual Support**: English and Nepali translations

---

### 2. BlogComponent

**Purpose**: Displays individual blog post previews in a card format.

**Props**:
- `title`: Blog post title
- `excerpt`: Short description/preview
- `publishedAt`: Publication date
- `slug`: URL slug for the post
- `author`: Optional author name
- `category`: Optional category tag
- `locale`: Current language locale

**Features**:
- Formatted date display
- Metadata display (author, category)
- Link to full blog post
- Responsive width (mobile-first design)
- Hover effects for better UX

**Styling**: Tailwind CSS with shadow effects and transitions

---

### 3. Card

**Purpose**: Displays team member information cards.

**Props**:
- `image`: Optional profile image URL
- `name`: Person's name
- `role`: Optional role/position
- `pronoun`: Optional pronouns
- `email`: Optional contact email

**Features**:
- Fallback icon (User icon from lucide-react) if no image
- Error handling for broken images
- Fixed dimensions (300x500px)
- Image section (350px height) + content section
- Text truncation for long content

**Styling**: Uses Alegreya Sans font, beige background (#f5efe0)

---

### 4. Donations

**Purpose**: Displays QR code for donations with bilingual header.

**Features**:
- Responsive sizing (max 400px mobile, 800px desktop)
- Locale-aware header text
- QR code image display
- Centered layout with padding and rounded corners

**Locale Support**: 
- English: "Support Our Cause"
- Nepali: "हाम्रो अभियानलाई समर्थन गर्नुहोस्"

---

### 5. Footer

**Purpose**: Site-wide footer with contact information and navigation.

**Props**:
- `lang`: Language selection (en/ne)

**Sections**:
1. **Contact Info**: Address, email, phone
2. **Resources**: Links to various resources
3. **Links**: Important site links
4. **Social Media**: Facebook, Instagram, X (Twitter), TikTok, LinkedIn

**Features**:
- Responsive grid layout (stacks on mobile)
- Social media icons from react-icons
- Bilingual content support
- Creator credit with link
- Copyright notice

**Styling**: Purple-blue background (#cccffe), rounded top corners

---

### 6. Header

**Purpose**: Top header displaying organization name in multiple languages/scripts.

**Props**:
- `lang`: Current locale (en/ne)

**Features**:
- Organization logo (80x80px)
- **Mobile**: Shows only current language
- **Desktop**: Shows all 8 language variations:
  1. Queer Youth Group (English - Latin)
  2. क्वेयर युथ ग्रुप (Nepali - Devanagari)
  3. 𑐎𑑂𑐰𑐾𑐫𑐬 𑐫𑐸𑐠 𑐐𑑂𑐬𑐸𑐥 (Newa - Prachalit)
  4. کْوَییرَ یُتھَ گْرُپ (Urdu - Nastaliq)
  5. 𑂍𑂹𑂫𑂨𑂵𑂩 𑂨𑂳𑂟 𑂏𑂹𑂩𑂳𑂣 (Maithili - Tirhuta)
  6. ᤁᤫᤕᤣᤷ ᤕᤢᤌ᤻ ᤃᤪᤢᤵ (Limbu)
  7. 𑒏𑓂𑒫𑒨𑒹𑒩 𑒨𑒳𑒟 𑒑𑓂𑒩𑒳𑒣 (Bhujimol)
  8. ཀྭཡེར་ཡུཐ་གྲུཔ (Tibetan - Uchen)

- Social media links (desktop only)
- Responsive layout with proper font loading

**Styling**: Beige background (#F5EFE0), cranberry text (#d41367)

---

### 7. LanguageSwitcher

**Purpose**: Toggles between English and Nepali languages.

**Features**:
- Detects current locale from URL
- Updates path segments to include target locale
- Handles paths with or without locale prefix
- Button text changes based on current language (EN ↔ नेपा)
- Smooth transitions with hover effects

**Styling**: Cranberry button (#d13467) with white text

---

### 8. Navbar

**Purpose**: Main site navigation with mobile menu support.

**Props**:
- `lang`: Language selection (en/ne)

**Features**:
- **Desktop**: Centered nav links with language switcher on right
- **Mobile**: Hamburger menu with slide-in drawer
  - 3/4 width sliding menu from right
  - Close button and backdrop
  - Social media icons at bottom
- Nested dropdown support (2 levels)
- Active link highlighting
- Smooth transitions

**Data Source**: Uses `navbarLinks` from data file

**Styling**: Beige background (#F5EFE0), cranberry accents

---

### 9. NavLinks (Navbar/nav-links.tsx)

**Purpose**: Renders navigation links with dropdown support.

**Props**:
- `className`: Optional additional classes
- `links`: Array of navigation items
- `lang`: Current language

**Features**:
- **Desktop**: Hover-based dropdowns
  - Sub-dropdowns appear to the right
  - Automatic positioning
- **Mobile**: Click-based accordion dropdowns
  - Expandable sub-menus
  - Animated indicators (▼ → ▶)
- Locale-aware routing (prefixes paths with /en or /ne)
- Active state detection and highlighting
- Support for nested navigation (3 levels total)

**Link Structure**:
```typescript
interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}
```

---

### 10. NavigationCards

**Purpose**: Flexible, reusable card grid system for navigation.

**Main Component Props**:
- `title`: Section title
- `subtitle`: Optional description
- `links`: Array of navigation links
- `gridCols`: Responsive column configuration
- `variant`: Theme variant (primary, secondary, tertiary, neutral, accent)
- `colorScheme`: Custom color overrides
- `layout`: Cards style (cards, compact, minimal)
- `showIcons`: Toggle icon display
- `showArrow`: Toggle arrow indicators
- `centerContent`: Center vs left-align
- `maxWidth`: Container max width
- `padding`: Vertical padding

**Exports**:
1. `NavigationCards`: Bulk card grid component
2. `NavigationCard`: Individual card component
3. `NavigationCardContainer`: Grid wrapper for manual card arrangement

**Theme Variants**:
- Primary: Blue gradient
- Secondary: Emerald/teal gradient
- Tertiary: Purple/pink gradient
- Neutral: Gray gradient
- Accent: Orange/red gradient

**Layout Options**:
- **Cards**: Full gradient backgrounds, larger padding
- **Compact**: White background, tighter spacing
- **Minimal**: No background, hover effect only

**Individual Card Layouts**:
- **Vertical**: Icon on top, stacked content
- **Horizontal**: Icon left, content middle, arrow right

**Features**:
- Custom icons or first letter fallback
- Badge support
- External link handling (opens in new tab)
- Responsive grid (1-5 columns)
- Gradient backgrounds and hover effects
- Empty state handling

---

### 11. Notice

**Purpose**: Displays notice/announcement images from Sanity CMS.

**Features**:
- Fetches images from Sanity post with slug "notice"
- Swiper carousel with auto-play
- Chevron navigation (visible on hover)
- Responsive sizing (400px mobile, 800px desktop)
- Image lazy loading
- Loop enabled for continuous scrolling

**CMS Integration**:
- Uses `getLocalizedPostWithFallback` helper
- Filters only image blocks from Portable Text
- Generates optimized image URLs (1200px width)

**User Interaction**:
- 5-second auto-play delay
- Manual navigation with arrows
- Hover to reveal controls

---

### 12. PortableTextComponent

**Purpose**: Renders Sanity Portable Text content with custom styling.

**Features**:
- Automatic font selection based on content:
  - Detects Devanagari (Nepali) characters
  - English: Alegreya Sans (headers), Roboto (body)
  - Nepali: Noto Sans Devanagari (all text)
- Custom rendering for all block types:
  - Headings (h1-h4)
  - Paragraphs (justified text)
  - Blockquotes (blue accent)
  - Lists (bullet and numbered)
  - Images (with captions)
  - Code blocks
  - Links (with external link detection)

**Exports**:
- `portableTextComponents`: Default spacing
- `compactPortableTextComponents`: Tighter spacing variant

**Styling**:
- Responsive text sizes
- Proper text alignment and spacing
- Syntax-highlighted code blocks
- Accessible link colors and focus states

**Image Handling**:
- Next.js Image optimization
- Responsive sizing (600x400 base)
- Lazy loading
- Optional captions

---

### 13. Report (PublicationsCarousel)

**Purpose**: Displays publications in a carousel format.

**Features**:
- **Swiper Carousel**:
  - Responsive slides (1.1 to 3 visible)
  - Auto-play with pause on hover
  - Loop enabled
  - Navigation arrows
  - Pagination dots
- **Publication Cards**:
  - Cover image (200-240px height)
  - Title with Nepali font support
  - Description
  - Year badge
  - "Read More" link to PDF
- Hardcoded publications data (4 items)
- Error handling for missing images
- Responsive sizing with breakpoints

**Data Structure**:
```typescript
interface Publication {
  id: number;
  title: string;
  description: string;
  year: number;
  imagePath: string;
  imageAlt: string;
  isNepali: boolean;
  link: string;
}
```

**Styling**: Pink background (#f8e6ed), white cards

---

### 14. Reveal

**Purpose**: Scroll-triggered animation component using Framer Motion.

**Props**:
- `children`: Content to animate
- `delay`: Optional animation delay (default: 0)

**Animation**:
- Initial state: Opacity 0, Y offset +50px
- Triggered when 20% visible in viewport
- Smooth easing (0.6s duration)
- Fade in + slide up effect

**Use Case**: Wrap any content to add scroll-reveal animations

---

### 15. Slideshow

**Purpose**: Auto-playing image slideshow for hero/featured images.

**Features**:
- Swiper-based carousel
- 4 hardcoded images:
  1. ILGA 2025
  2. NSL Round 1
  3. Nepal Pride Parade 2019
  4. Event photo
- Auto-play (4-second intervals)
- Navigation arrows
- Pagination dots
- Loop enabled
- Responsive height (300px to 550px)

**Styling**: 
- Custom CSS file for arrow and pagination styling
- Rounded corners
- Hover effects on navigation
- Cranberry accent color (#d41367)

---

### 16. VisionTab

**Purpose**: Tabbed interface for Vision, Mission, and Goals.

**Features**:
- **3 Tabs**:
  1. Vision
  2. Mission
  3. Goals (grid of multiple items)
- Bilingual content via next-intl
- Responsive layout:
  - Mobile: Horizontal tabs on top
  - Desktop: Vertical tabs on left
- Active tab highlighting
- Smooth transitions

**Data Structure** (from translations):
```json
{
  "vision": { "title": "...", "content": "..." },
  "mission": { "title": "...", "content": "..." },
  "goal": {
    "title": "...",
    "items": [
      { "title": "...", "content": "..." }
    ]
  }
}
```

**Styling**:
- Beige background (#F5EFE0)
- Cranberry active state (#d41367)
- Responsive heights based on content
- Card-style goal items

---

### 17. Welcome

**Purpose**: Animated welcome message with language rotation.

**Features**:
- **Rotating Messages**:
  1. English (Namaste → Welcome message)
  2. Nepali (नमस्ते → Nepali welcome)
- 4-second display interval
- Fade transition (500ms)
- Automatic cycling between languages
- Font changes per language

**Animation**:
- Crossfade effect between messages
- Smooth opacity transitions
- Key-based re-rendering

**Styling**: Centered text, max-width container, dark gray text

---

## Common Patterns

### Font Usage
- **English Headers**: Alegreya Sans
- **English Body**: Roboto
- **Nepali Text**: Noto Sans Devanagari
- **Special Scripts**: Noto Sans Newa, Gulzar, Jomolhari (Header only)

### Color Scheme
- **Primary**: #d41367 (Cranberry)
- **Secondary**: #b8115a (Darker cranberry)
- **Background**: #F5EFE0 (Beige)
- **Accent**: #cccffe (Light purple-blue)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Bilingual Support
- Uses next-intl for translations
- Locale detection from useLocale()
- Conditional font rendering
- Path localization (/en or /ne prefix)

### Third-Party Libraries
- **Swiper**: Carousels (Notice, Report, Slideshow)
- **Framer Motion**: Animations (Reveal)
- **Lucide React**: Icons (Card, Report navigation)
- **React Icons**: Social media icons (Footer, Header, Navbar)
- **Next.js**: Image optimization, routing
- **Sanity**: CMS integration (Notice, PortableTextComponent)

---

## Accessibility Features

The AccessibilityWidget component provides industry-leading accessibility compliance:

1. **Visual Accessibility**:
   - Multiple contrast modes for different visual needs
   - Text scaling without breaking layout
   - Adjustable spacing and line height
   - Specialized fonts for dyslexia

2. **Motor Accessibility**:
   - Large cursor option
   - Reading guide/mask for focus
   - Reduced animations option

3. **Cognitive Accessibility**:
   - Enhanced tooltips
   - Link highlighting
   - Image hiding option
   - Text alignment options

4. **Persistence**:
   - Settings saved to localStorage
   - Survives page reloads and sessions

5. **Component Protection**:
   - Critical UI elements (navbar, footer) maintain usability
   - Special components (VisionTab, carousels) preserve design integrity

---

## Development Notes

### Component Organization
Each component lives in its own folder with an `index.tsx` file for clean imports:
```typescript
import Navbar from '@/components/Navbar';
// Not: import Navbar from '@/components/Navbar/index';
```

### State Management
- Local state with useState for UI interactions
- Context API for global state (AccessibilityWidget)
- No external state management library needed

### Styling Approach
- Utility-first with Tailwind CSS
- Custom CSS files only when needed (Slideshow, AccessibilityWidget)
- Responsive design with mobile-first approach

### Data Sources
- **Hardcoded**: Slideshow images, Publication data
- **CMS (Sanity)**: Notice images, Blog content
- **Translation Files**: All text content via next-intl
- **External Files**: Navbar links, Footer content

### Performance Considerations
- Next.js Image component for optimization
- Lazy loading for images
- Code splitting by component
- CSS-in-JS avoided for better performance

---

## Future Improvements

### Potential Enhancements
1. Move hardcoded data (publications, slideshow) to CMS
2. Add TypeScript interfaces to data files
3. Create shared theme configuration
4. Implement component testing
5. Add error boundaries
6. Create Storybook documentation
7. Optimize bundle size with dynamic imports

### Known Limitations
1. Publications data is hardcoded
2. Some translations may be missing fallbacks
3. No offline support
4. Limited error handling in some components
5. Slideshow images are not CMS-managed

---

## Quick Reference

**Most Used Components**:
- `Navbar` - Every page
- `Footer` - Every page
- `Header` - Every page
- `AccessibilityWidget` - Global
- `PortableTextComponent` - Blog/content pages

**Utility Components**:
- `Reveal` - Add scroll animations
- `LanguageSwitcher` - Language toggle
- `NavigationCards` - Landing page navigation

**Content Components**:
- `BlogComponent` - Blog listings
- `Card` - Team pages
- `VisionTab` - About page
- `Notice` - Homepage announcements
- `Report` - Publications showcase

**Media Components**:
- `Slideshow` - Image galleries
- `Donations` - QR code display

---

*Last Updated: January 2026*
*Project: Queer Youth Group Website*
*Framework: Next.js 14+ with App Router*