import { DataView } from '@/utils/primeComponents';
import Empty from './Empty';

const ProductsView = ({ products, addToCart }) => {
  if (products.length == 0) return null;
  const listTemplate = (items) => {
    if (!items || items.length === 0) return <Empty />;

    let list = items.map((item) => {
      return itemTemplate(item);
    });

    return <div className="grid md:grid-cols-2 gap-4">{list}</div>;
  };

  const itemTemplate = (item) => (
    <div
      key={item._id}
      className="p-4 flex gap-4 justify-between align-middle border rounded-lg shadow border-gray-700 bg-transparent"
      onClick={() => addToCart(item)}
    >
      <div>
        <p className="font-bold">{item.name}</p>
        {item.description && <p>{item.description}</p>}
      </div>
      <div className="flex flex-row justify-between">
        {item.price && (
          <p className="font-bold text-2xl flex items-center">
            <span className="mr-1">S/.</span>
            {item.price}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="card mb-4">
      <DataView
        value={products}
        // dataKey={itemUrl}
        listTemplate={listTemplate}
        rows={6}
      />
    </div>
  );
};

export default ProductsView;
