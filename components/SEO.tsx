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
      <meta key="description" name="description" content={description} />
      <link key="canonical" rel="canonical" href={canonicalUrl} />
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta key="og:url" property="og:url" content={canonicalUrl} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:image" property="og:image" content={imageUrl} />
      <meta key="og:type" property="og:type" content={type} />
      <meta key="og:site_name" property="og:site_name" content="Florian Demel" />

      {/* Twitter */}
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:site" name="twitter:site" content="@FlrnDml" />
      <meta key="twitter:creator" name="twitter:creator" content="@FlrnDml" />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="twitter:description" name="twitter:description" content={description} />
      <meta key="twitter:image" name="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default SEO;
