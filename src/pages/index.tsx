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

  return (
    <Box sx={{ mt: "7rem" }}>
      {isLoading ? (
        <Box>
          <Box
            sx={{
              px: "1rem",
              display: { xs: "none", sm: "none", md: "block" },
            }}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={1000}
              height={50}
            />
          </Box>
          <Box
            sx={{
              px: "2rem",
              display: { xs: "block", sm: "block", md: "none" },
            }}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={300}
              height={50}
            />
          </Box>
        </Box>
      ) : (
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
      )}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            mt: "1rem",
            justifyContent: {
              xs: "center",
              sm: "center",
              md: "flex-start",
            },
          }}>
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((index) => {
            return (
              <Box sx={{ m: "1rem" }} key={index}>
                <ProductSkeleton />
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box>
          <Box>{renderProducts(selectedCategoryId)}</Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
