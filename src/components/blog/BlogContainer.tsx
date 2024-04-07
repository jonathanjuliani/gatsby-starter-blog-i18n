import React from "react";
import { Link } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image";
import { INode } from "@/definitions";

interface BlogContainerProps {
  posts: INode[];
}

interface ListItemProps {
  post: INode;
  index: number;
  image?: IGatsbyImageData;
}

const ArticleImage: React.FC<{ post: INode; image: IGatsbyImageData }> = ({ post, image }) => (
  <GatsbyImage
    image={image}
    alt={`image that refers to ${post.frontmatter.title}`}
    className="mb-8 md:mb-0 mr-0 md:mr-8 max-h-[250px] w-full"
  />
);

const ArticleHeader: React.FC<{ post: INode }> = ({ post }) => (
  <header>
    <small className="font-yrsa text-skin-fg-muted text-lg">{post.frontmatter.date}</small>
    <h2 className="text-2xl font-exo font-black text-skin-fg mt-3">
      <span itemProp="headline">{post.frontmatter.title}</span>
    </h2>
  </header>
);

const ArticleBody: React.FC<{ post: INode }> = ({ post }) => (
  <p
    dangerouslySetInnerHTML={{
      __html: post.excerpt || post.frontmatter.description,
    }}
    itemProp="description"
    className="text-justify text-lg mt-3"
  />
);

const ArticleTags: React.FC<{ post: INode }> = ({ post }) => (
  <section className="font-bold uppercase md:text-sm space-x-2 mt-3">
    {(post.frontmatter.tags || "")
      .split(",")
      .map((s: string) => s.trim())
      .map((s: string, index: number) => (
        <span key={`${s}-${index}`}>{`#${s}`}</span>
      ))}
  </section>
);

const ListItem: React.FC<ListItemProps> = ({ post, index, image }) => (
  <Link to={post.fields.path}>
    <li
      key={`${post.fields.path}-${index}`}
      className={`flex flex-col md:flex-row items-center py-8`}
    >
      {image && <ArticleImage post={post} image={image} />}
      <article itemScope itemType="http://schema.org/Article">
        <ArticleHeader post={post} />
        <ArticleBody post={post} />
        <ArticleTags post={post} />
      </article>
    </li>
  </Link>
);

const BlogContainer: React.FC<BlogContainerProps> = ({ posts }) => {
  const { t } = useTranslation();

  return (
    <ol className="mt-8 divide-y divide-skin-fg-muted">
      <h2 className="text-2xl font-black text-skin-fg mt-3 pb-12 text-right">
        {t("home.latestPosts")}
      </h2>
      {posts.map((post, index: number) => {
        const image = post.frontmatter.image ? getImage(post.frontmatter.image) : undefined;

        return (
          <div key={index}>
            <ListItem post={post} index={index} image={image} />
          </div>
        );
      })}
    </ol>
  );
};

export default BlogContainer;
