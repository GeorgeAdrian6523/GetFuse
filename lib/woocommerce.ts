export async function getProducts() {
  const url = `${process.env.WC_API_URL}/products?per_page=20`;

  const res = await fetch(url, {
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
        ).toString("base64"),
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  return res.json();
}

// Get a single product by slug
export async function getProductBySlug(slug: string) {
  try {
    const url = `${process.env.WC_API_URL}/products?slug=${slug}`;
    
    const res = await fetch(url, {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
          ).toString("base64"),
      },
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }

    const products = await res.json();
    return products[0] || null; // Return first product or null if not found
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
}

// Get products by category
export async function getProductsByCategory(categoryId: number) {
  const url = `${process.env.WC_API_URL}/products?category=${categoryId}`;

  const res = await fetch(url, {
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
        ).toString("base64"),
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch category products: ${res.statusText}`);
  }

  return res.json();
}

