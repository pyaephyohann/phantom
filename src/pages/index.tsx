import OrderAppProductCard from "@/components/OrderAppProductCard";
import OrderCardSkeleton from "@/components/OrderCardSkeleton";
import ProductSkeleton from "@/components/ProductSkeleton";
import { RootState } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { orderAppDatas } from "@/store/slices/orderAppSlice";
import { getProductsByCategoryId } from "@/utils/client";
import { Box, Skeleton, Tab, Tabs, useMediaQuery } from "@mui/material";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

const Home = () => {
  const { products, categories, productsCategories, isLoading } =
    useAppSelector(orderAppDatas);

  const {
    filteredProductsByColor,
    filteredProductsBySize,
    filteredProductsByGender,
    filteredProductsByText,
  } = useAppSelector((state: RootState) => state.filteredProducts);

  const [value, setValue] = useState(0);

  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const productsFilter = [] as Product[];
    if (filteredProductsBySize.length) {
      filteredProductsBySize.forEach((product) => {
        productsFilter.push(product);
      });
    }
    if (filteredProductsByColor.length) {
      filteredProductsByColor.forEach((product) => {
        productsFilter.push(product);
      });
    }
    if (filteredProductsByGender.length) {
      filteredProductsByGender.forEach((product) => {
        productsFilter.push(product);
      });
    }
    if (filteredProductsByText.length) {
      filteredProductsByText.forEach((product) => {
        productsFilter.push(product);
      });
    }
    setFilteredProducts(productsFilter);
  }, [
    filteredProductsBySize,
    filteredProductsByColor,
    filteredProductsByGender,
    filteredProductsByText,
  ]);

  const renderProducts = (categoryId: number) => {
    const validProducts = filteredProducts.length
      ? getProductsByCategoryId(
          categoryId,
          filteredProducts,
          productsCategories
        )
      : getProductsByCategoryId(categoryId, products, productsCategories);

    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: {
            xs: "center",
            sm: "center",
            md: "flex-start",
          },
          mt: "1rem",
        }}>
        {validProducts.map((product) => {
          return (
            <Box sx={{ m: "1rem" }} key={product.id}>
              <OrderAppProductCard
                product={product}
                href={`/order/productDetail/${product.id}`}
              />
            </Box>
          );
        })}
      </Box>
    );
  };

  if (isLoading)
    return (
      <Box sx={{ mt: "7rem" }}>
        <Skeleton
          animation="wave"
          variant="rounded"
          style={{
            width: "95%",
            margin: "0 auto",
            height: "3rem",
            marginBottom: "1.5rem",
          }}
        />
        <ProductSkeleton />
      </Box>
    );

  return (
    <Box sx={{ mt: "7rem" }}>
      <Box>
        <Tabs
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          value={value}
          onChange={(event, value) => {
            setValue(value);
          }}>
          {categories.map((category) => {
            return (
              <Tab
                sx={{ textTransform: "none", fontSize: "1.1rem" }}
                key={category.id}
                disabled={
                  getProductsByCategoryId(
                    category.id,
                    products,
                    productsCategories
                  ).length
                    ? false
                    : true
                }
                label={category.name}
                onClick={() => setSelectedCategoryId(category.id)}
              />
            );
          })}
        </Tabs>
      </Box>
      <Box>
        <Box>{renderProducts(selectedCategoryId)}</Box>
      </Box>
    </Box>
  );
};

export default Home;
