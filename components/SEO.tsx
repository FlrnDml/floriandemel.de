import Head from "next/head";
import { useRouter } from "next/router";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Florian Demel | Platform Engineer",
  description = "Platform Engineer specializing in cloud computing, software architecture, and fullstack development.",
  image = "/static/profile.jpeg",
  type = "website",
}) => {
  const router = useRouter();
  const siteUrl = "https://floriandemel.de";
  const canonicalUrl = `${siteUrl}${router.asPath === "/" ? "" : router.asPath}`;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Florian Demel" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@FlrnDml" />
      <meta name="twitter:creator" content="@FlrnDml" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default SEO;
