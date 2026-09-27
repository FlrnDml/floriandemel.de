import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import SEO from "../../components/SEO";
import { formatDate, getPost, getPosts, type Post } from "../../lib/posts";

interface PostPageProps {
  post: Post;
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  return (
    <article>
      <SEO
        title={`${post.title} | Florian Demel`}
        description={post.description}
        type="article"
      />

      <Link href="/" className="back">
        ← Florian Demel
      </Link>

      <header className="post-header">
        <h1>{post.title}</h1>
        <p className="post-meta">
          <time dateTime={post.date}>{formatDate(post.date, "long")}</time>
          {" · "}
          {post.metadata.readingTime} min read
          {post.draft && " · Draft"}
        </p>
      </header>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getPosts().map((post) => ({ params: { slug: post.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const post = getPost(params?.slug as string);
  return post ? { props: { post } } : { notFound: true };
};

export default PostPage;
