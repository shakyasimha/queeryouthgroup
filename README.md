# Queer Youth Group Organization Website

Welcome to the official repository for the [Queer Youth Group Organization website](https://queeryouthgroup.org.np/)! This project is built to provide a safe, informative, and engaging digital space for queer youth and allies.

## 🌈 About

This website serves as the digital home for the Queer Youth Group Organization, offering resources, community information, and educational content. The platform is designed with accessibility and inclusivity at its core, supporting both English and Nepali languages.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) - React framework for production
- **Deployment:** [Vercel](https://vercel.com/) - Seamless deployment and hosting
- **Content Management:** Sanity Studio - Headless CMS for content and blog management
- **Styling:** Modern CSS with component-based architecture
- **Languages:** TypeScript/JavaScript, with i18n support for English and Nepali

## 📁 Project Structure

```
queeryouthgroup.org.np/
├── docs/              # Essential documentation and guides
├── public/            # Static assets (SVG, GIF, PNG, etc.)
├── src/               # Source code
│   ├── app/          # Next.js App Router pages and layouts
│   ├── components/   # Reusable React components
│   ├── db/           # SOGIESC dictionary database
│   ├── data/         # Static page data and content
│   ├── i18n/         # Translation files (English & Nepali)
│   ├── messages/     # Legacy translation files (deprecated)
│   ├── sanity/       # Sanity CMS schemas and configuration
│   ├── ui/           # UI components and custom fonts
│   └── utils/        # Utility scripts and helper functions
└── README.md         # You are here!
```

### 📂 Directory Details

#### `docs/`
Contains essential documentation about the website's architecture, features, and maintenance guides. Start here to understand the project's design decisions and best practices.

#### `public/`
Stores all static assets including images, icons, and graphics used throughout the website. These files are served directly and can be referenced in your code.

#### `src/app/`
The heart of the website's routing and pages. Built using Next.js App Router, this directory contains all page components, layouts, and route handlers.

#### `src/components/`
Reusable React components that make up the building blocks of the UI. Each component is designed to be modular and maintainable.

#### `src/db/`
Database structure for the SOGIESC (Sexual Orientation, Gender Identity and Expression, and Sex Characteristics) dictionary feature.

#### `src/data/`
Static data files that populate various sections of the website. This includes content that doesn't require CMS management.

#### `src/i18n/`
**Active translation system** - Contains translation files for English and Nepali language support. This is the current system used for language switching functionality.

#### `src/messages/`
⚠️ **Legacy code** - Contains older translation files that are no longer actively used. Maintained for reference but not part of the current translation system.

#### `src/sanity/`
Configuration and schema definitions for Sanity Studio, our headless CMS. This enables content editors to manage website content and create blog posts without touching code.

#### `src/ui/`
Additional UI components including custom fonts, design system elements, and shared styling utilities.

#### `src/utils/`
Utility functions and helper scripts that support various features across the application.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [pnpm](https://pnpm.io/) (preferred package manager for this project)

To install pnpm globally:
```bash
npm install -g pnpm
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-organization/queeryouthgroup.org.np.git
   cd queeryouthgroup.org.np
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add necessary environment variables. Check `.env.example` (if available) or contact the team for required keys.

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website running locally.

### Development Workflow

- **Development server:** `pnpm dev` - Starts the local development server
- **Build for production:** `pnpm build` - Creates an optimized production build
- **Start production server:** `pnpm start` - Runs the production build locally
- **Linting:** `pnpm lint` - Checks code quality and formatting

## 🌐 Internationalization (i18n)

The website supports both English and Nepali languages. Translation files are located in `src/i18n/`. To add or modify translations:

1. Navigate to `src/i18n/`
2. Update the appropriate language file
3. Ensure both English and Nepali translations are provided for new content

**Note:** The `src/messages/` directory contains legacy translation files and should not be modified for new features.

## 📝 Content Management

The website uses Sanity Studio as a headless CMS for managing dynamic content and blog posts. Content editors can update website content without needing to modify code.

To access Sanity Studio, refer to the documentation in the `docs/` directory or contact the team for access credentials.

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, improving documentation, or adding new features, your help is appreciated.

### How to Contribute

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate documentation.

## 📧 Support

If you encounter any issues or have questions:

- Check the documentation in the `docs/` folder
- Open an issue on GitHub
- Contact the development team

## 📄 License

This project's license information can be found in the LICENSE file. Please review it before contributing or using the code.

## 🙏 Acknowledgments

Thank you to all contributors, volunteers, and community members who have made this project possible. Your support helps create a safer and more inclusive digital space for queer youth.

---

**Built with ❤️ for the LGBTQIA+ community**

*For more information about the organization, visit [queeryouthgroup.org.np](https://queeryouthgroup.org.np/)*
