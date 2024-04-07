const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const blogPost = path.resolve(`./src/components/blog/BlogPostTemplate.tsx`);

  const localesResult = await graphql(`
    {
      allLocale {
        nodes {
          language
        }
      }
    }
  `);

  const allLocales = localesResult.data.allLocale.nodes.map((locale) => locale.language);

  console.log({ allLocales });

  const postsByLocaleResult = await Promise.all(
    allLocales.map(async (locale) => {
      return graphql(`
      {
        allMarkdownRemark(filter: { frontmatter: { language: { eq: "${locale}" } } }, sort: { frontmatter: { date: ASC } }, limit:1000) {
          nodes {
            id
            fields {
              slug
              path
            }
            frontmatter {
              language
            }
          }
        }
      }
    `);
    })
  );

  // console.log({ postsByLocaleResult });

  const postsByLocale = postsByLocaleResult.map((result) => result.data.allMarkdownRemark.nodes);

  postsByLocale.forEach((element) => {
    console.log({ element });

    if (element.length > 0) {
      element.forEach((post, index) => {
        const previousPostId = index === 0 ? null : element[index - 1].id;
        const previousPostSlug = index === 0 ? null : element[index - 1].fields.slug;

        const nextPostId = index === element.length - 1 ? null : element[index + 1].id;
        const nextPostSlug = index === element.length - 1 ? null : element[index + 1].fields.slug;

        const language = post.frontmatter.language;
        const { slug, path } = post.fields;

        console.log("createPages", { path, language, slug, previousPostId, nextPostId });

        createPage({
          path,
          component: blogPost,
          context: {
            id: post.id,
            slug,
            previousPostId,
            previousPostSlug,
            nextPostId,
            nextPostSlug,
            language: post.frontmatter.language,
          },
        });
      });
    }
  });

  // Get all markdown blog posts sorted by date
  // const result = await graphql(
  //   `
  //     {
  //       allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
  //         nodes {
  //           id
  //           fields {
  //             slug
  //             path
  //           }
  //           frontmatter {
  //             language
  //           }
  //         }
  //       }
  //     }
  //   `
  // );

  // if (result.errors) {
  //   reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors);
  //   return;
  // }

  // const posts = result.data.allMarkdownRemark.nodes;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  // if (posts.length > 0) {
  //   posts.forEach((post, index) => {
  //     const previousPostId = index === 0 ? null : posts[index - 1].id;
  //     const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id;
  //     const language = post.frontmatter.language;
  //     const { slug, path } = post.fields;

  //     console.log("createPages", { path, language, slug });

  //     createPage({
  //       path,
  //       component: blogPost,
  //       context: {
  //         id: post.id,
  //         slug,
  //         previousPostId,
  //         nextPostId,
  //         language: post.frontmatter.language,
  //       },
  //     });
  //   });
  // }
};

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode, basePath: "blog" });
    // const path = value.substring(3); // remove the leading "/en" or "/fr" from the path
    const slug = node.frontmatter.slug;

    // const path =
    //   node.frontmatter.language === "pt" ? `/blog/${slug}` : `${node.frontmatter.language}/blog/${slug}`;

    // console.log("onCreateNode", { value, slug, path });
    console.log("onCreateNode", { value, slug });

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    });

    createNodeField({
      name: `path`,
      node,
      value: `/blog/${slug}`,
    });
  }
};

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "Mdx" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
      linkedin: String
      github: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
      excerpt(pruneLength: Int = 160): String
      body: String
      html: String
      rawMarkdownBody: String
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      image: File @fileByRelativePath
      language: String
    }

    type Fields {
      slug: String
      path: String
    }
  `);
};
