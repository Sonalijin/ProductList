import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-width: 700px;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
  min-height: 400px;
  margin: auto;
  `;

export const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  background: #f8f8f8;
  padding: 1rem;
`;

export const ProductInfo = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ProductTitle = styled.h2`
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  color: #333;
  line-height: 1.4;
  min-height: fit-content;
  word-wrap: break-word;
`;

export const ProductDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  height: 4.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  flex: 1;
`;

export const ProductPrice = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c5282;
  margin: 0;
  margin-top: auto;
`;

export const SearchInput = styled.input`
  width: 90%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f8f8f8;
  outline: none;
  transition: border-color 0.2s ease;
  color: #000;
  &:focus {
    border-color: #2c5282;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0 1rem;
`;

export const PageButton = styled.button<{ isActive?: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.isActive ? '#2c5282' : '#e2e8f0'};
  background: ${props => props.isActive ? '#2c5282' : 'white'};
  color: ${props => props.isActive ? 'white' : '#333'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: ${props => props.isActive ? '#2c5282' : '#f0f0f0'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const PageInfo = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

export const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 400px;
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin: 0 auto;
  grid-column: 1/-1;
  max-width: calc(100% - 5rem); /* Account for the padding */
`;

export const NoResultsText = styled.h3`
  color: #666;
  font-size: 1.5rem;
  text-align: center;
  margin: 0;
  font-weight: 500;
`;

export const NoResultsSubText = styled.p`
  color: #888;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 1rem;
`;