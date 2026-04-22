import { useParams } from 'react-router-dom';

export default function ProductDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h2>Product Detail</h2>
      <p>Placeholder for product ID: {id}</p>
    </div>
  );
}
