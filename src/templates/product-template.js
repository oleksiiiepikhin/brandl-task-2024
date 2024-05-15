// src/templates/product-template.js

import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const ProductTemplate = ({ data }) => {
  const product = data.productsJson
  const image = getImage(product.image)
  
  return (
    <ProductContainer>
      <h1>{product.name}</h1>
      <GatsbyImage image={image} alt={product.name}  style={{ width: "100%", maxWidth: "300px", height: "auto", marginBottom: "10px" }} loading="lazy" />
      <p>{product.description}</p>
      <p>Price: {product.price}&#8364;</p>
    </ProductContainer>
  )
}

export const query = graphql`
  query($name: String!) {
    productsJson(name: { eq: $name }) {
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
`

export default ProductTemplate
