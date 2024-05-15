import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
`

const ProductCard = styled.div`
  position: relative;
  border: 1px solid #ccc;
  padding: 20px;
`

const ProductImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
`

const ProductTitle = styled.h2`
  font-weight: 800;
  font-size: 20px;
  margin-bottom: 10px;
`

const ProductDescription = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  height: 100px;
  overflow: hidden;
`

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 50px;
`

const SearchInput = styled.input`
  margin-bottom: 20px;
  padding: 10px;
`

const IndexPage = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const { products } = data

  const filteredProducts = products.nodes.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <SearchInput
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ProductGrid>
        {filteredProducts.map(product => (
          <ProductCard key={product.name}>
            <Link to={`/${product.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <ProductImageContainer>
                <GatsbyImage
                  image={getImage(product.image)}
                  alt={product.name}
                  style={{ maxHeight: "200px", marginBottom: "10px" }}
                  loading="lazy"
                />
              </ProductImageContainer>
              <ProductTitle>{product.name}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductPrice>{product.price}&#8364;</ProductPrice>
            </Link>
          </ProductCard>
        ))}
      </ProductGrid>
    </div>
  )
}

export const query = graphql`
  query {
    products: allProductsJson {
      nodes {
        name
        description
        price
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
  }
`

export default IndexPage
