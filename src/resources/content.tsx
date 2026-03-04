import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Tag, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Paulo",
  lastName: "Otavio",
  name: `Paulo Otavio`,
  role: "Web Designer",
  avatar: "/portifolio2/images/avatar 2.jpg",
  email: "otaviopaulo040205@gmail.com",
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Paulo-if",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/paulootavi0/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/otaviopaul0/",
    essential: false,
  },

];

const home: Home = {
  path: "/",
  image: "/portifolio2/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building bridges between design and code</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      I'm Selene, a design engineer at <Text as="span" size="xl" weight="strong">ONCE UI</Text>, where I craft intuitive <br /> user experiences. After hours, I build my own projects.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Web Designer e estudante de Ciência da Computação focado na criação de interfaces visualmente impactantes, websites modernos e conteúdos visuais de alto nível, sempre equilibrando estética e funcionalidade.
        Autodidata, combinando ferramentas como Figma e Photoshop com tecnologias como React, React Native e Supabase, conectando design e desenvolvimento de forma natural.

      </>
    ),
  },

  work: {
    display: true, // set to false to hide this section
    title: "Experiências",
    experiences: [
      {
        company: "CyberBee",
        timeframe: "2024-Atual",
        role: "Web Designer",
        images: [
          {
            src: "./images/gallery/imagem-byber-mobile.png",
            alt: "CyberBee Project",
            width: 16,
            height: 9,
          },
        ],
        achievements: [
          <>
            Melhorei a responsividade e a acessibilidade de aplicações web
            por meio do desenvolvimento front-end com Angular.
            Criando interfaces mais intuitivas seguindo boas práticas de usabilidade,
            desenvolvendo protótipos de designs de páginas no Figma e implementando-os diretamente no código.
          </>,
          <>
            Skills usadas:
            <Row gap="8" paddingTop="8" wrap>
              <Tag size="s" prefixIcon="angular">Angular</Tag>
              <Tag size="s" prefixIcon="html">HTML</Tag>
              <Tag size="s" prefixIcon="css">CSS</Tag>
              <Tag size="s" prefixIcon="typescript">TypeScript</Tag>
              <Tag size="s" prefixIcon="figma">Figma</Tag>
            </Row>
          </>,
        ],
      },
      {
        company: "LinkPage",
        timeframe: "2026",
        role: "Web Designer",
        achievements: [
          <>
            Projeto de página de links no estilo Linktree, desenvolvida do zero com
            HTML, CSS e JavaScript puro, sem uso de frameworks ou bibliotecas externas.
            O layout apresenta identidade visual própria com tema escuro e claro,
            elementos decorativos em pixel art, grade perspectivada e animações CSS. <p>Visualize o projeto 👉 <a href="https://paulo-if.github.io/LinkPage/">LinkPage</a></p>
          </>,
          <>
            Skills usadas:
            <Row gap="8" paddingTop="8" wrap>
              <Tag size="s" prefixIcon="html">HTML</Tag>
              <Tag size="s" prefixIcon="css">CSS</Tag>
              <Tag size="s" prefixIcon="javascript">JavaScript</Tag>
              <Tag size="s" prefixIcon="figma">Figma</Tag>
            </Row>
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/portifolio2/images/projects/project-01/Teste-linkpage.png",
            alt: "LinkPage",
            width: 9,
            height: 16,
          },
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Formação",
    institutions: [
      {
        name: "Universidade Federal de Jataí",
        description: <>Ciência da Computação</>,
        image: "/portifolio2/images/projects/project-01/imagem-faculdade.jpg",
      },

    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Skills",
    skills: [
      {
        title: "Figma",
        description: (
          <>Criação de protótipos de: sites | aplicativos | designs de posts no Figma.</>
        ),
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/portifolio2/images/projects/project-01/imagem-figma.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },

      {
        title: "React",
        description: (
          <>Criando aplicativos com React </>
        ),
        grid: 2,
        tags: [
          {
            name: "React",
            icon: "react",
          }
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Designs",
  title: `Designs`,
  description: `Designs`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [

    {
      src: "/portifolio2/images/gallery/10.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/portifolio2/images/gallery/11.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/portifolio2/images/gallery/12.png",
      alt: "image",
      orientation: "horizontal",
    },

    {
      src: "/portifolio2/images/gallery/01.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/portifolio2/images/gallery/02.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/portifolio2/images/gallery/03.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/portifolio2/images/gallery/04.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/portifolio2/images/gallery/05.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/portifolio2/images/gallery/06.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/portifolio2/images/gallery/07.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/portifolio2/images/gallery/08.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/portifolio2/images/gallery/09.png",
      alt: "image",
      orientation: "horizontal",
    },

  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
