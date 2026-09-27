import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { formatDate, getPosts, type PostSummary } from "../lib/posts";

interface HomeProps {
  posts: PostSummary[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <>
      <section className="profile">
        <h1>Florian Demel</h1>
        <p>
          Tech Lead at STIHL in Waiblingen, building full-stack software
          systems on Azure. Here I write about my experience with software,
          architecture and Azure.
        </p>
        <div className="links">
          <a href="mailto:kontakt@floriandemel.de">Email</a>
          <a
            href="https://www.linkedin.com/in/florian-demel-b11254236/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/FlrnDml"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </section>

      <h2 className="section-title">Writing</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="post-title">{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {
    posts: getPosts().map(({ slug, title, date, description }) => ({
      slug,
      title,
      date,
      description,
    })),
  },
});

export default Home;
