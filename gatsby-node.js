exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
      query {
        allProductsJson {
          nodes {
            name
          }
        }
      }
    `)
  
    result.data.allProductsJson.nodes.forEach(node => {
      createPage({
        path: `/${node.name.toLowerCase().replace(/\s+/g, "-")}`,
        component: require.resolve("./src/templates/product-template.js"),
        context: {
          name: node.name,
        }
      })
    })
  }
  