import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setProducts } from "../redux/features/productsSlice";
import {
    Container,
    ProductCard,
    ProductGrid,
    ProductImage,
    ProductInfo,
    ProductTitle,
    ProductDescription,
    ProductPrice,
    SearchInput,
    PaginationContainer,
    PageButton,
    PageInfo,
    NoResultsContainer,
    NoResultsText,
    NoResultsSubText
} from "./ProductStyled";
import useDebounce from "../hooks/useDebounce";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const API_URL = 'https://fakestoreapi.com/products';
const ITEMS_PER_PAGE = 6;

const Products = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.items);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(API_URL);
                dispatch(setProducts(response.data));
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [dispatch]);

    useEffect(() => {
        // Reset to first page when search term changes
        setCurrentPage(1);
    }, [debouncedSearchTerm]);

    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return <Container>Loading...</Container>;
    }

    if (error) {
        return <Container>Error: {error}</Container>;
    }

    return (
        <Container>
            <SearchInput 
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
            {filteredProducts.length === 0 ? (
                <NoResultsContainer>
                    <NoResultsText>No products found</NoResultsText>
                    <NoResultsSubText>
                        Try adjusting your search item or browse our full collection
                    </NoResultsSubText>
                </NoResultsContainer>
            ) : (
                <ProductGrid>
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id}>
                            <ProductImage src={product.image} alt={product.title} />
                            <ProductInfo>
                                <ProductTitle>{product.title}</ProductTitle>
                                <ProductDescription>{product.description}</ProductDescription>
                                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                            </ProductInfo>
                        </ProductCard>
                    ))}
                </ProductGrid>
            )}
            
            {filteredProducts.length > ITEMS_PER_PAGE && (
                <PaginationContainer>
                    <PageButton
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <MdArrowBack size={20} />
                    </PageButton>
                    
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                        <PageButton
                            key={page}
                            onClick={() => handlePageChange(page)}
                            isActive={currentPage === page}
                        >
                            {page}
                        </PageButton>
                    ))}
                    
                    <PageButton
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <MdArrowForward size={20} />
                    </PageButton>
                    
                    <PageInfo>
                        Page {currentPage} of {totalPages}
                    </PageInfo>
                </PaginationContainer>
            )}
        </Container>
    );
};

export default Products;